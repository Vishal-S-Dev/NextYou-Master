// lib/store/onboarding.store.ts
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { zustandMMKVStorage } from '@/lib';

type OnboardingState = {
  isBasicInfoComplete: boolean;
  isAssessmentComplete: boolean;
  isChallengeSubscribe: boolean;
  isHealthDetailsSubmit: boolean;

  setBasicInfo: (value: boolean) => void;
  setAssessment: (value: boolean) => void;
  setChallengeSubscribe: (value: boolean) => void;
  setHealthDetailsSubmit: (value: boolean) => void;
};

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set) => ({
      isBasicInfoComplete: false,
      isAssessmentComplete: false,
      isChallengeSubscribe: false,
      isHealthDetailsSubmit: false,

      setBasicInfo: (value) => set({ isBasicInfoComplete: value }),
      setAssessment: (value) => set({ isAssessmentComplete: value }),
      setChallengeSubscribe: (value) => set({ isChallengeSubscribe: value }),
      setHealthDetailsSubmit: (value) => set({ isHealthDetailsSubmit: value }),
    }),
    {
      name: 'onboarding-storage',
      storage: createJSONStorage(() => zustandMMKVStorage),
    }
  )
);
