import { type ChallengeReview } from '@/types';

import { type ApiResponse } from '../api-config';

export type StoriesResponse = ChallengeReview[];

export type StoriesApiResponse = ApiResponse<StoriesResponse>;
