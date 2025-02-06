import { useState } from 'react';
import { AxiosError, AxiosRequestConfig } from 'axios';
import axiosInstance from '../axios';

interface IUseRequestResult<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  makeRequest: (config?: AxiosRequestConfig) => Promise<T>;
  reset: () => void;
}

export const useRequest = <T>(): IUseRequestResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const reset = () => {
    setData(null);
    setLoading(false);
    setError(null);
  };

  const makeRequest = async (config?: AxiosRequestConfig): Promise<T> => {
    try {
      setLoading(true);
      setError(null);

      const response = await axiosInstance(config || {});
      setData(response.data as T);
      return response.data as T;
    } catch (err) {
      const error = err as AxiosError<{ message: string }>;
      const errorMessage = error.response?.data?.message || error.message;
      setError(errorMessage);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, makeRequest, reset };
};
