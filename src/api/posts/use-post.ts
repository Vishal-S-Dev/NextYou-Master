import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';

import { axiosClient } from '../api-config';
// import { axiosClient } from '../api-config';
import type { Post } from './types';

type Variables = { id: string };
type Response = Post;

export const usePost = createQuery<Response, Variables, AxiosError>({
  queryKey: ['posts'],
  fetcher: (variables) => {
    return axiosClient
      .get(`posts/${variables.id}`)
      .then((response) => response.data);
  },
});
