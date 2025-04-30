import * as React from 'react';
import { AxiosError } from 'axios';

import {
  useClientsSignupFormsService,
  useTherapistsService,
} from '../api/services';
import { TApiError } from '../api/types/errors';
import { formatApiError } from '../lib/errorUtils';

const I_DO_NOT_SEE_MY_STATE = "I don't see my state";

export const usePollFormAndRequestMatch = () => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [navigateToWaitList, setNavigateToWaitList] = React.useState(false);

  const {
    form: { makeRequest: getForm },
  } = useClientsSignupFormsService();

  const {
    match: { data: matchData, makeRequest: getMatch },
  } = useTherapistsService();

  const handleError = (error: AxiosError<TApiError>) => {
    const errorMessage = error.response?.data
      ? formatApiError(error.response.data)
      : error.message;

    setError(errorMessage);
  };

  const pollFormAndRequestMatch = React.useCallback(
    async (
      responseId: string,
      delay = 3000,
      maxAttempts = 20,
    ): Promise<void> => {
      setLoading(true);

      let attempts = 0;

      const pollStatus = async (): Promise<void> => {
        attempts++;

        let formResponse;

        try {
          formResponse = await getForm({
            params: {
              response_id: responseId,
            },
          });
        } catch (error) {
          if (attempts >= maxAttempts) {
            handleError(error as AxiosError<TApiError>);
            throw error;
          }

          await new Promise((resolve) => setTimeout(resolve, delay));

          return pollStatus();
        }

        if (formResponse) {
          if (formResponse.state === I_DO_NOT_SEE_MY_STATE) {
            setNavigateToWaitList(true);
            setLoading(false);
            return;
          }

          try {
            await getMatch({
              params: { limit: 10, response_id: responseId },
            });
          } catch (error) {
            handleError(error as AxiosError<TApiError>);
            throw error;
          }
        }

        setLoading(false);
        return;
      };

      return pollStatus();
    },
    [getForm, getMatch],
  );

  return {
    matchData,
    error,
    loading,
    navigateToWaitList,
    pollFormAndRequestMatch,
  };
};
