// types/api.ts

export type PaginateQuery<T> = {
  results: T[];
  count: number;
  next: string | null;
  previous: string | null;
};

export type ApiResponse<T> = {
  success: boolean;
  message: string;
  results: T;
};
