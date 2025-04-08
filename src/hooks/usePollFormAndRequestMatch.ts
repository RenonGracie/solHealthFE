import * as React from 'react';
import { AxiosError } from 'axios';

import {
  useClientsSignupFormsService,
  useTherapistsService,
} from '../api/services';
import { TApiError } from '../api/types/errors';
import { formatApiError } from '../lib/errorUtils';

export const usePollFormAndRequestMatch = () => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const {
    form: { makeRequest: getForm },
  } = useClientsSignupFormsService();

  const {
    match: { data: matchData, makeRequest: getMatch },
  } = useTherapistsService();

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

        if (attempts > maxAttempts) {
          throw new Error();
        }

        try {
          const response = await getForm({
            params: {
              response_id: responseId,
            },
          });

          if (response) {
            await getMatch({
              params: { limit: 10, response_id: responseId },
            });
            setLoading(false);
          }

          return;
        } catch (err) {
          if (attempts >= maxAttempts) {
            const error = err as AxiosError<TApiError>;

            const errorMessage = error.response?.data
              ? formatApiError(error.response.data)
              : error.message;

            setError(errorMessage);
            setLoading(false);
            throw err;
          }

          await new Promise((resolve) => setTimeout(resolve, delay));

          return pollStatus();
        }
      };

      return pollStatus();
    },
    [getForm, getMatch],
  );

  return {
    matchData,
    error,
    loading,
    pollFormAndRequestMatch,
  };
};
