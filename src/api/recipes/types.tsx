import { type ApiResponse } from '../api-config';

export interface HealthRecipe {
  _id: string;
  bannerImage: string;
  title: string;
  description: string;
  minute: number;
  calories: number;
  sortOrder: number;
  isHealthOfTheDay: boolean;
  type?: string; //'Breakfast' | 'Lunch' | 'Dinner' | 'Snack';
  // isActive: boolean;
  // isDeleted: boolean;
  // createdBy: string;
  // updatedBy: string;
  //createdAt: string; // ISO date string
  //updatedAt: string; // ISO date string
  //__v: number;
}

export type HealthRecipeResponse = HealthRecipe[];

export type RecipeApiResponse = ApiResponse<HealthRecipeResponse>;
