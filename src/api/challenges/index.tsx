import { useQuery } from '@tanstack/react-query';
import { type AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';

import { Logger } from '@/lib/logger';

import { axiosInstance } from '../api-config';
import {
  type ChallengeApiResponse,
  type ChallengeDetailApiResponse,
  type SubscribeApiResponse,
  type SubscribeVariables,
  type TaskByDayResponse,
  type UpdateTaskStatusApiResponse,
  type UpdateTaskStatusVariables,
} from './types';

// /api/challenge
export const fetchChallenges = async () => {
  const res = await axiosInstance.get<ChallengeApiResponse>('/challenge');
  return res.data;
};

export const useChallengesList = () => {
  return useQuery({
    queryKey: ['challengesList'],
    queryFn: fetchChallenges,
  });
};

// /api/challenge/{challengeID}
export const fetchChallengeDetails = async (challengeID: string) => {
  const res = await axiosInstance.get<ChallengeDetailApiResponse>(
    `/challenge/${challengeID}`
  );
  return res.data;
};

export const useChallengeDetails = (challengeID: string) => {
  return useQuery({
    queryKey: ['challengeDetails', challengeID],
    queryFn: () => fetchChallengeDetails(challengeID),
  });
};

// /api/challenge/start-trial/{challengeId}
export const challengeStartTrial = async (variables: SubscribeVariables) => {
  Logger.log('challengeStartTrial Params ::', variables);
  const res = await axiosInstance({
    url: `/challenge/start-trial/${variables.challengeId}`,
    method: 'POST',
  });
  return res.data;
};

export const useChallengeStartTrial = () => {
  return createMutation<
    SubscribeApiResponse,
    SubscribeVariables,
    AxiosError<SubscribeApiResponse>
  >({
    mutationFn: async (variables) => challengeStartTrial(variables),
  });
};

// /api/challenge/subscribe/{challengeId}
export const challengeSubscribe = async (variables: SubscribeVariables) => {
  const res = await axiosInstance({
    url: `/challenge/subscribe/${variables.challengeId}`,
    method: 'POST',
  });
  return res.data;
};

export const useChallengeSubscribe = () => {
  return createMutation<
    SubscribeApiResponse,
    SubscribeVariables,
    AxiosError<SubscribeApiResponse>
  >({
    mutationFn: async (variables) => challengeSubscribe(variables),
  });
};

// /api/challenge/{id}/tasks-by-day
export const fetchChallengeTasksByDay = async (challengeID: string) => {
  const res = await axiosInstance.get<TaskByDayResponse>(
    `/challenge/${challengeID}/tasks-by-day`
  );
  return res.data;
};

export const useChallengeTasksByDay = (challengeID: string) => {
  return useQuery({
    queryKey: ['challengeTasksByDay', challengeID],
    queryFn: () => fetchChallengeTasksByDay(challengeID),
  });
};

export const fetchTasksByDay = async (taskID: string) => {
  const res = await axiosInstance.get<TaskByDayResponse>(
    `/challenge/${taskID}`
  );
  return res.data;
};

//  /api/challenge/{taskId}/status
export const updateTaskStatus = async (
  variables: UpdateTaskStatusVariables
) => {
  Logger.log('updateTaskStatus Params ::', variables);
  const res = await axiosInstance({
    url: `/challenge/${variables.taskId}/status`,
    method: 'PATCH',
    data: {
      day: variables.day,
      status: variables.status,
      userNotes: variables.userNotes,
      answers: variables.answers,
    },
  });
  return res.data;
};

export const useTaskUpdateStatus = () => {
  return createMutation<
    UpdateTaskStatusApiResponse,
    UpdateTaskStatusVariables,
    AxiosError<UpdateTaskStatusApiResponse>
  >({
    mutationFn: async (variables) => updateTaskStatus(variables),
  });
};
