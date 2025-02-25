import { ApiResponse, ApiParams } from '../types/helpers';
import { ENDPOINTS } from '../endpoints';
import { useRequest } from '../hooks/useRequest';

type GetFormParams = ApiParams<'clients_signup_get'>;
export type GetFormResponse = ApiResponse<'clients_signup_get'>;

export const useClientsSignupFormsService = () => {
  return {
    form: useRequest<GetFormParams, never, GetFormResponse>(
      ENDPOINTS.CLIENTS_SIGNUP_FORMS.GET_FORM,
    ),
  };
};
