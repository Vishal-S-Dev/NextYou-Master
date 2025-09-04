import { type User } from '@/types/user';

import { type ApiResponse } from '../api-config';

export type UserAllergyProfileVariable = {
  allergies?: (
    | {
        id: string;
        item: string;
      }
    | undefined
  )[];
  healthDetails: string;
  preference: string;
  sleepHours: number;
  workHours: number;
};

export type UserAllergyProfileResponse = User;
export type UserAllergyProfileApiResponse =
  ApiResponse<UserAllergyProfileResponse>;

export type UserMeResponse = {
  user: User;
};
export type UserMeApiResponse = ApiResponse<UserMeResponse>;
