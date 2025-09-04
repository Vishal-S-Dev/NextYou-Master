import { useQuery } from '@tanstack/react-query';

import { axiosInstance } from '../api-config';
import { type HealthAudioApiResponse } from './types';

// /meditation
export const fetchMeditation = async () => {
  const res = await axiosInstance.get<HealthAudioApiResponse>('/meditation');
  return res.data;
};

export function useMeditationList() {
  return useQuery({
    queryKey: ['meditationList'],
    queryFn: fetchMeditation,
  });
}
