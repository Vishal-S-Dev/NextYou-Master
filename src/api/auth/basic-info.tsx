import { type AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';

import { useAuth } from '@/store';

import { axiosClient } from '../api-config';
import { type BasicInfoApiResponse, type BasicInfoVariables } from './types';

export const useCreateBasicProfile = createMutation<
  BasicInfoApiResponse,
  BasicInfoVariables,
  AxiosError<BasicInfoApiResponse>
>({
  mutationFn: async (variables) => {
    const token = useAuth.getState().token;
    return axiosClient({
      url: '/user/create-basic-profile',
      method: 'POST',
      data: variables,
      headers: {
        Authorization: `Bearer ${token?.access ?? ''}`,
      },
    }).then((res) => res.data);
  },
});
