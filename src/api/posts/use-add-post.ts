import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';

import { axiosClient } from '../api-config';
// import { axiosClient } from '../api-config';
import type { Post } from './types';

type Variables = { title: string; body: string; userId: number };
type Response = Post;

export const useAddPost = createMutation<Response, Variables, AxiosError>({
  mutationFn: async (variables) =>
    axiosClient({
      url: 'auth/send-otp',
      method: 'POST',
      data: variables,
    }).then((response) => response.data),
});
