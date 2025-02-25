import { ApiResponse, ApiRequestBody } from '../types/helpers';
import { ENDPOINTS } from '../endpoints';
import { useRequest } from '../hooks/useRequest';

type BookAppointmentData = ApiRequestBody<'appointments_post'>;
export type BookAppointmentResponse = ApiResponse<'appointments_post'>;

export const useAppointmentsService = () => {
  return {
    bookAppointment: useRequest<
      never,
      BookAppointmentData,
      BookAppointmentResponse
    >(ENDPOINTS.APPOINTMENTS.BOOK_APPOINTMENT, {
      method: 'POST',
    }),
  };
};
