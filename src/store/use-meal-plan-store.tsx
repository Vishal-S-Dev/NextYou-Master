import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { fetchMealPlans } from '@/api/nutrition';
import { type MealPlan } from '@/api/nutrition/type';
import { createSelectors } from '@/lib';
import { zustandMMKVStorage } from '@/lib/storage';

type MealPlanStoreState = {
  mealPlans: MealPlan[];
  loading: boolean;
  error: string | null;
  lastFetched: number | null;
  fetchMealPlans: (force?: boolean) => Promise<void>;
};

const _useMealPlanStore = create<MealPlanStoreState>()(
  persist(
    (set, get) => ({
      mealPlans: [],
      loading: false,
      error: null,
      lastFetched: null,

      fetchMealPlans: async (force = false) => {
        const { lastFetched } = get();
        const now = Date.now();

        if (!force && lastFetched && now - lastFetched < 1000 * 60 * 10) {
          // Skip fetch if cached < 10 min ago
          return;
        }

        set({ loading: true, error: null });

        try {
          const res = await fetchMealPlans();
          const json = JSON.stringify(res, null, 2);
          console.log('fetchMealPlans ::', json);
          set({
            mealPlans: res.results,
            loading: false,
            lastFetched: now,
          });
        } catch (error: any) {
          set({
            error: error.message ?? 'Failed to fetch meal plans',
            loading: false,
          });
        }
      },
    }),
    {
      name: 'mealPlans-storage',
      storage: createJSONStorage(() => zustandMMKVStorage),
    }
  )
);

export const useMealPlanStore = createSelectors(_useMealPlanStore);
