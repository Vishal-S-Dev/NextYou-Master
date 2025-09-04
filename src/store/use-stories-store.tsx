import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { fetchInspirationalStories } from '@/api/stories';
import { createSelectors } from '@/lib';
import { zustandMMKVStorage } from '@/lib/storage';
import { type ChallengeReview } from '@/types';

type StoriesStoreState = {
  inspiredStories: ChallengeReview[];
  loading: boolean;
  error: string | null;
  lastFetched: number | null;
  fetchInspirationalStories: (force?: boolean) => Promise<void>;
};

const _useStoriesStore = create<StoriesStoreState>()(
  persist(
    (set, get) => ({
      inspiredStories: [],
      loading: false,
      error: null,
      lastFetched: null,

      fetchInspirationalStories: async (force = false) => {
        const { lastFetched } = get();
        const now = Date.now();

        if (!force && lastFetched && now - lastFetched < 1000 * 60 * 10) {
          // Skip fetch if cached < 10 min ago
          return;
        }

        set({ loading: true, error: null });

        try {
          const res = await fetchInspirationalStories();
          const json = JSON.stringify(res, null, 2);
          console.log('fetchInspiredStories ::', json);
          set({
            inspiredStories: res.results,
            loading: false,
            lastFetched: now,
          });
        } catch (error: any) {
          set({
            error: error.message ?? 'Failed to fetch fetchInspiredStories',
            loading: false,
          });
        }
      },
    }),
    {
      name: 'stories-storage',
      storage: createJSONStorage(() => zustandMMKVStorage),
    }
  )
);

export const useInspirationalStoryStore = createSelectors(_useStoriesStore);
