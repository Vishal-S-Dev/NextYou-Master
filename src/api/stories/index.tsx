import { useQuery } from '@tanstack/react-query';

import { axiosInstance } from '../api-config';
import { type StoriesApiResponse } from './types';

// /api/inspirational-stories
export const fetchInspirationalStories = async () => {
  const res = await axiosInstance.get<StoriesApiResponse>('/inspired-stories');
  return res.data;
};

export function useInspirationalStories() {
  return useQuery({
    queryKey: ['InspirationalStoriesList'],
    queryFn: fetchInspirationalStories,
  });
}
