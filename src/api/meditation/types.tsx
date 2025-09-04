import { type ApiResponse } from '../api-config';

export interface HealthAudio {
  _id: string;
  bannerImage: string;
  audio: string;
  title: string;
  subTitle: string;
  sortOrder: number;
  isHealthOfTheDay: boolean;
  //isActive: boolean;
  //isDeleted: boolean;
  //createdBy: string;
  //updatedBy: string;
  //createdAt: string; // ISO date string
  //updatedAt: string; // ISO date string
  //__v: number;
}

export type HealthAudioResponse = HealthAudio[];

export type HealthAudioApiResponse = ApiResponse<HealthAudioResponse>;
