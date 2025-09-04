import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { fetchChallenges } from '@/api/challenges';
import { createSelectors } from '@/lib';
import { Logger } from '@/lib/logger';
import { zustandMMKVStorage } from '@/lib/storage';
import { type Challenge } from '@/types';
// import { challenges } from '@/mock/challenges';

type ChallengeStoreState = {
  challenges: Challenge[];
  loading: boolean;
  error: string | null;
  lastFetched: number | null;
  fetchChallenges: (force?: boolean) => Promise<void>;
  getChallengeById: (id: string) => Challenge | undefined;
};

const _useChallengesStore = create<ChallengeStoreState>()(
  persist(
    (set, get) => ({
      challenges: [],
      loading: false,
      error: null,
      lastFetched: null,

      fetchChallenges: async (force = false) => {
        const { lastFetched } = get();
        const now = Date.now();

        if (!force && lastFetched && now - lastFetched < 1000 * 60 * 10) {
          // Skip fetch if cached < 10 min ago
          return;
        }

        set({ loading: true, error: null });

        try {
          const res = await fetchChallenges();
          const json = JSON.stringify(res, null, 2);
          Logger.log('fetchChallenges ::', json);
          set({
            challenges: res.results,
            loading: false,
            lastFetched: now,
          });
        } catch (error: any) {
          set({
            error: error.message ?? 'Failed to fetch questions',
            loading: false,
          });
        }
      },
      getChallengeById: (id: string) => {
        const { challenges } = get();
        return challenges.find((challenge) => challenge._id === id);
      },
    }),
    {
      name: 'challenges-storage',
      storage: createJSONStorage(() => zustandMMKVStorage),
    }
  )
);
export const useChallengesStore = createSelectors(_useChallengesStore);
