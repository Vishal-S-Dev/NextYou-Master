import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { fetchRecipes } from '@/api/recipes';
import { type HealthRecipe } from '@/api/recipes/types';
import { createSelectors } from '@/lib';
import { Logger } from '@/lib/logger';
import { zustandMMKVStorage } from '@/lib/storage';

type RecipeStoreState = {
  recipes: HealthRecipe[];
  loading: boolean;
  error: string | null;
  lastFetched: number | null;
  fetchRecipes: (force?: boolean) => Promise<void>;
};

const _useRecipeStore = create<RecipeStoreState>()(
  persist(
    (set, get) => ({
      recipes: [],
      loading: false,
      error: null,
      lastFetched: null,

      fetchRecipes: async (force = false) => {
        const { lastFetched } = get();
        const now = Date.now();

        if (!force && lastFetched && now - lastFetched < 1000 * 60 * 10) {
          // Skip fetch if cached < 10 min ago
          return;
        }

        set({ loading: true, error: null });

        try {
          const res = await fetchRecipes();
          const json = JSON.stringify(res, null, 2);
          Logger.log('fetchRecipes ::', json);
          set({
            recipes: res.results,
            loading: false,
            lastFetched: now,
          });
        } catch (error: any) {
          set({
            error: error.message ?? 'Failed to fetch challenges',
            loading: false,
          });
        }
      },
    }),
    {
      name: 'recipes-storage',
      storage: createJSONStorage(() => zustandMMKVStorage),
    }
  )
);

export const useRecipeStore = createSelectors(_useRecipeStore);
