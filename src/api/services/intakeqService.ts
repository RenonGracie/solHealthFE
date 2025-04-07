import { ApiResponse, ApiRequestBody } from '../types/helpers';
import { ENDPOINTS } from '../endpoints';
import { useRequest } from '../hooks/useRequest';

type SendMandatoryFormData = ApiRequestBody<'intakeq_formsmandatory_form_post'>;
export type SendMandatoryFormResponse =
  ApiResponse<'intakeq_formsmandatory_form_post'>;

export const useIntakeqService = () => {
  return {
    sendMandatoryForm: useRequest<
      never,
      SendMandatoryFormData,
      SendMandatoryFormResponse
    >(ENDPOINTS.INTAKEQ_FORMS.SEND_MANDATORY_FORM, 'POST'),
  };
};
