import { type ApiResponse } from '../api-config';

export interface MealPlan {
  _id: string;
  bannerImage: string;
  title: string;
  description: string;
  ingredian: string;
  mealType?: string;
  mealImage?: string;
  //isActive: boolean;
  //isDeleted: boolean;
  //createdBy: string;
  //updatedBy: string;
  //createdAt: string; // ISO date string
  //updatedAt: string; // ISO date string
  //__v: number;
}

export type MealPlanResponse = MealPlan[];

export type MealPlanApiResponse = ApiResponse<MealPlanResponse>;
