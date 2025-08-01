import { ApiResponse, ApiParams } from '../types/helpers';
import { ENDPOINTS } from '../endpoints';
import { useRequest } from '../hooks/useRequest';

type MatchParams = ApiParams<'therapists_match_get'>;
export type MatchResponse = ApiResponse<'therapists_match_get'>;

type SlotsParams = ApiParams<'therapistsslots_get'>;
export type SlotsResponse = ApiResponse<'therapistsslots_get'>;

export const useTherapistsService = () => {
  return {
    match: useRequest<MatchParams, never, MatchResponse>(
      ENDPOINTS.THERAPISTS.GET_MATCH,
    ),
    slots: useRequest<SlotsParams, never, SlotsResponse>(
      ENDPOINTS.THERAPISTS.GET_SLOTS,
    ),
  };
};
