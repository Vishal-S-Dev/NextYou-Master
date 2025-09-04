import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';

import { axiosClient } from '../api-config';
import {
  type SendOtpApiResponse,
  type SendOtpVariables,
  type VerifyOtpApiResponse,
  type VerifyOtpVariables,
} from './types';

// /api/auth/send-otp;
export const useSendOtp = createMutation<
  SendOtpApiResponse,
  SendOtpVariables,
  AxiosError
>({
  mutationFn: async (variables) =>
    axiosClient({
      url: '/auth/send-otp',
      method: 'POST',
      data: variables,
    }).then((res) => {
      return res.data;
    }),
});

// /api/auth/verify-otp;
export const useVerifyOtp = createMutation<
  VerifyOtpApiResponse,
  VerifyOtpVariables,
  AxiosError<VerifyOtpApiResponse>
>({
  mutationFn: async (variables) =>
    axiosClient({
      url: '/auth/verify-otp',
      method: 'POST',
      data: variables,
    }).then((res) => {
      return res.data;
    }),
});
