import {
  type Challenge,
  type ChallengeReview,
  type TasksByDay,
  type TaskStatus,
} from '@/types';

import { type ApiResponse } from '../api-config';

//
//Challenge
//
export type ChallengeResponse = Challenge[];

export type ChallengeApiResponse = ApiResponse<ChallengeResponse>;

//
// Challenge Detail
//
export type ChallengeDetail = {
  challenge: Challenge;
  reviews?: ChallengeReview[];
};
export type ChallengeDetailApiResponse = ApiResponse<ChallengeDetail>;

//
//Subscribe
//
export type SubscribeVariables = {
  challengeId: string;
};
export type SubscribeApiResponse = ApiResponse<Challenge>;

//
//TaskByDay
//
export type TaskByDayResponse = ApiResponse<TasksByDay[]>;

//
//Task Status Update
//
export type UpdateTaskStatusVariables = {
  taskId: string;
  day: string;
  status: TaskStatus;
  userNotes?: string;
  answers: any;
  answerImage?: File;
};
export type UpdateTaskStatusApiResponse = ApiResponse<Challenge>;
