import { axiosInstance } from '../api-config';
import { type RecipeApiResponse } from './types';

// /recipe
export const fetchRecipes = async () => {
  const res = await axiosInstance.get<RecipeApiResponse>('/recipe');
  return res.data;
};
