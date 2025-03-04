import * as React from 'react';

import {
  useClientsSignupFormsService,
  useTherapistsService,
} from '../api/services';

export const usePollFormAndRequestMatch = () => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<Error | string | null>(null);

  const {
    form: { makeRequest: getForm },
  } = useClientsSignupFormsService();

  const {
    match: { data: matchData, makeRequest: getMatch },
  } = useTherapistsService();

  const pollFormAndRequestMatch = React.useCallback(
    async (
      responseId: string,
      delay = 2000,
      maxAttempts = 3,
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
        } catch (error) {
          if (attempts >= maxAttempts) {
            setError(error as Error);
            setLoading(false);
            throw error;
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
