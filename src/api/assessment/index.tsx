import { type AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';

import { useAuth } from '@/store/auth';

import { axiosClient } from '../api-config';
import {
  type AnswerSubmissionApiResponse,
  type AnswerSubmissionVariables,
  type QuestionApiResponse,
} from './types';

export * from './types';

export const fetchAssessmentQuestion = async () => {
  const token = useAuth.getState().token;
  const res = await axiosClient.get<QuestionApiResponse>('/question', {
    headers: {
      Authorization: `Bearer ${token?.access ?? ''}`,
    },
  });
  return res.data;
};

// /api/question;
export const useQuestionAnswerSubmission = createMutation<
  AnswerSubmissionApiResponse,
  AnswerSubmissionVariables,
  AxiosError<AnswerSubmissionVariables>
>({
  mutationFn: async (variables) => {
    const token = useAuth.getState().token;
    return axiosClient({
      url: '/question',
      method: 'POST',
      data: variables,
      headers: {
        Authorization: `Bearer ${token?.access ?? ''}`,
      },
    }).then((res) => res.data);
  },
});
