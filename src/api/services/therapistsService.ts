import { ApiResponse, ApiParams } from '../types/helpers';
import { ENDPOINTS } from '../endpoints';
import { useRequest } from '../hooks/useRequest';

type MatchParams = ApiParams<'therapists_match_get'>;
export type MatchResponse = ApiResponse<'therapists_match_get'>;

export const useTherapistsService = () => {
  const request = useRequest<MatchResponse>();

  return {
    ...request,

    getMatch: async (params: MatchParams) => {
      return request.makeRequest({
        url: ENDPOINTS.THERAPISTS.GET_MATCH,
        params,
      });
    },
  };
};
