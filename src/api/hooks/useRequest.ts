import * as React from 'react';
import { AxiosError, AxiosRequestConfig, Method } from 'axios';
import axiosInstance from '../axios';

type RequestConfig<TParams, TData> = Omit<
  AxiosRequestConfig,
  'params' | 'data'
> & {
  params?: TParams;
  data?: TData;
};

interface RequestStateBase<R> {
  data: R | null;
  loading: boolean;
  error: string | Error | null;
  reset: () => void;
}

interface RequestState<TParams, TData, R> extends RequestStateBase<R> {
  makeRequest: (config: RequestConfig<TParams, TData>) => Promise<R>;
}

export const useRequest = <TParams, TData, R>(
  endpoint: string,
  method?: Method,
) => {
  const [data, setData] = React.useState<R | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | Error | null>(null);

  const reset = React.useCallback(() => {
    setData(null);
    setLoading(false);
    setError(null);
  }, []);

  const makeRequest = React.useCallback(
    async (config: RequestConfig<TParams, TData>) => {
      try {
        setLoading(true);
        setError(null);
        const response = await axiosInstance<R>({
          method,
          url: endpoint,
          ...config,
        });
        setData(response.data);
        return response.data;
      } catch (err) {
        const error = err as AxiosError<{ message: string }>;
        const errorMessage = error.response?.data?.message || error.message;
        setError(errorMessage);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [endpoint, method],
  );

  return {
    data,
    loading,
    error,
    makeRequest,
    reset,
  } as RequestState<TParams, TData, R>;
};
