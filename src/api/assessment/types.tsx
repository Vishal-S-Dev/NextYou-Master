// import { ApiResponse } from "../api-config";

import { type BaseQuestion, type QuestionAnswer } from '@/types';

import { type ApiResponse } from '../api-config';

// Final union type for question list
export type QuestionResponse = BaseQuestion[];

// Combine with base type
export type QuestionApiResponse = ApiResponse<QuestionResponse>;

// Full response array
export type AnswerSubmissionVariables = {
  questionResponses: QuestionAnswer[];
};

export type AnswerSubmissionResponse = {
  userId: string;
};
// Combine with base type
export type AnswerSubmissionApiResponse = ApiResponse<AnswerSubmissionResponse>;
