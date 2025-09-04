// types.ts

import { type User } from '@/types/user';

import { type ApiResponse } from '../api-config';

//Send OTP
export type SendOtpVariables = {
  countryCode: string;
  mobileNumber: string;
};

// types/auth.ts
export type OtpResponse = {
  mobileNumber: string;
  otp: string;
};

// Combine with base type
export type SendOtpApiResponse = ApiResponse<OtpResponse>;

//Verify OTP
export type VerifyOtpVariables = {
  countryCode: string;
  otp: string;
  mobileNumber: string;
};

export type VerifyOtpResponse = {
  user: User;
  token: string;
};
// Combine with base type
export type VerifyOtpApiResponse = ApiResponse<VerifyOtpResponse>;

//Basic Info
export type BasicInfoVariables = {
  name: string;
  DOB: string;
  gender: string;
};

export type BasicInfoResponse = {
  name: string;
  DOB: string;
  gender: string;
  isBasicProfileCompleted: boolean;
  isAssessmentCompleted: boolean;
  token: string;
};
// Combine with base type
export type BasicInfoApiResponse = ApiResponse<BasicInfoResponse>;
