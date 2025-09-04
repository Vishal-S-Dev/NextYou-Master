import { type AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';

import { Logger } from '@/lib/logger';

import { axiosInstance } from '../api-config';
import {
  type UserAllergyProfileApiResponse,
  type UserAllergyProfileVariable,
  type UserMeApiResponse,
} from './types';

export * from './types';

//user/me
export const fetchUserMe = async () => {
  const res = await axiosInstance.get<UserMeApiResponse>('/user/me');
  const json = JSON.stringify(res.data, null, 2);
  Logger.log('fetchUserMe ::', json);
  return res.data;
};

/// api/user/update-allergy-profile
export const useUpdateAllergyProfile = createMutation<
  UserAllergyProfileApiResponse,
  UserAllergyProfileVariable,
  AxiosError<UserAllergyProfileApiResponse>
>({
  mutationFn: async (variables) => {
    return axiosInstance({
      url: '/user/update-allergy-profile',
      method: 'POST',
      data: variables,
    }).then((res) => res.data);
  },
});
