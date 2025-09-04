import { axiosInstance } from '../api-config';
import { type MealPlanApiResponse } from './type';

// /meal-plans

export const fetchMealPlans = async () => {
  const res = await axiosInstance.get<MealPlanApiResponse>('/meal-plan');
  return res.data;
};
