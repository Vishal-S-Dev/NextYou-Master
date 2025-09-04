import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { fetchMeditation } from '@/api/meditation';
import { type HealthAudio } from '@/api/meditation/types';
import { createSelectors } from '@/lib';
import { zustandMMKVStorage } from '@/lib/storage';

type MeditationStoreState = {
  meditations: HealthAudio[];
  loading: boolean;
  error: string | null;
  lastFetched: number | null;
  fetchMeditation: (force?: boolean) => Promise<void>;
};

const _useMeditationStore = create<MeditationStoreState>()(
  persist(
    (set, get) => ({
      meditations: [],
      loading: false,
      error: null,
      lastFetched: null,

      fetchMeditation: async (force = false) => {
        const { lastFetched } = get();
        const now = Date.now();

        if (!force && lastFetched && now - lastFetched < 1000 * 60 * 10) {
          // Skip fetch if cached < 10 min ago
          return;
        }

        set({ loading: true, error: null });

        try {
          const res = await fetchMeditation();
          const json = JSON.stringify(res, null, 2);
          console.log('fetchMeditation ::', json);
          set({
            meditations: res.results,
            loading: false,
            lastFetched: now,
          });
        } catch (error: any) {
          set({
            error: error.message ?? 'Failed to fetch fetchMeditation',
            loading: false,
          });
        }
      },
    }),
    {
      name: 'meditations-storage',
      storage: createJSONStorage(() => zustandMMKVStorage),
    }
  )
);

export const useMeditationStore = createSelectors(_useMeditationStore);
