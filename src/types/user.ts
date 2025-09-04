import { type Challenge } from './work-out-task';

export type ChallengeDetails = {
  challenge: Challenge;
  trialStartDate: string;
  subscriptionStartDate: string;
  endDate: string;
  isActive: boolean;
};

export type User = {
  _id: string;
  mobileNumber: string;
  mVerified: boolean;
  eVerified: boolean;
  isBasicProfileCompleted: boolean;
  isAssessmentCompleted: boolean;
  isHealthDetailsCompleted: boolean;
  isActive: boolean;
  isDeleted: boolean;
  otp: string | null;
  otpExpiresAt: string | null;
  roleId: string;
  //createdBy: string;
  //updatedBy: string;
  //createdAt: string; // ISO string, you can convert to Date if needed
  //updatedAt: string; // ISO string
  //__v: number;
  DOB: string; // ISO string, you can use `Date` if parsing to a real date
  gender: 'Male' | 'Female' | 'Other' | string;
  name: string;
  challenges: ChallengeDetails[];
  coins: number;
};
