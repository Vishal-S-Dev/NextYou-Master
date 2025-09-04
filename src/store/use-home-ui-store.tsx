// lib/store/onboarding.store.ts
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { zustandMMKVStorage } from '@/lib';
import { type HomeSection } from '@/types/home';

import { useUserStore } from './use-user-store';

type HomeUIState = {
  sections: HomeSection[];
  configHomeSections: () => Promise<void>;
};

export const useHomeUIStateStore = create<HomeUIState>()(
  persist(
    (set) => ({
      sections: [],

      configHomeSections: async () => {
        var homeSections: HomeSection[] = [];

        const { user } = useUserStore.getState();
        if (user?.isHealthDetailsCompleted) {
          const section = {
            componentID: 'Tasks',
            title: 'Day 1 Upcoming Task',
            backgroundColor: 'transparent',
            textColor: '#161616',
          };
          homeSections.push(section);
        }

        set({ sections: homeSections });
      },
    }),
    {
      name: 'home-ui-storage',
      storage: createJSONStorage(() => zustandMMKVStorage),
    }
  )
);
