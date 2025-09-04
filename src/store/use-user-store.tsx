import { create, type StateCreator } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { fetchUserMe } from '@/api/user';
import { createSelectors, zustandMMKVStorage } from '@/lib';
import { type User } from '@/types/user';

import { useOnboardingStore } from './use-onboarding-store';
import { useSubscriptionStore } from './use-subscription-store';
import { useTaskStore } from './use-task-store';

type UserStoreState = {
  user: User | null;
  loading: boolean;
  error: string | null;
  lastFetched: number | null;
  isTemp: boolean;
  setIsTemp: (val: boolean) => void;
  fetchUser: (force?: boolean) => Promise<void>;
};

const saveToMMKV = (state: UserStoreState) => {
  const { fetchUser: _fetchUser, setIsTemp: _setIsTemp, ...plainState } = state;
  zustandMMKVStorage.setItem(
    'user-store-storage',
    JSON.stringify({ state: plainState })
  );
};

// ✅ Type the initializer so persist() knows it's a UserStoreState creator
const storeInitializer: StateCreator<
  UserStoreState,
  [],
  [['zustand/persist', unknown]]
> = (set, get) => ({
  user: null,
  loading: false,
  error: null,
  lastFetched: null,
  isTemp: false,

  setIsTemp: (val: boolean) => {
    const prev = get().isTemp;
    set({ isTemp: val });
    if (prev && !val) {
      saveToMMKV(get());
    }
    if (!prev && val) {
      zustandMMKVStorage.removeItem('user-store-storage');
    }
  },

  fetchUser: async (force = false) => {
    const { lastFetched, setIsTemp } = get();
    const now = Date.now();

    if (!force && lastFetched && now - lastFetched < 1000 * 60 * 10) {
      return;
    }

    set({ loading: true, error: null });

    try {
      const res = await fetchUserMe();
      if (res.results !== null) {
        // Update onboarding store with user data
        const { setAssessment, setBasicInfo, setChallengeSubscribe } =
          useOnboardingStore.getState();
        const userMe = res.results;
        const isBasicProfileCompleted = userMe.user.isBasicProfileCompleted;
        const isAssessmentCompleted = userMe.user.isAssessmentCompleted;
        const isChallenges =
          userMe.user.challenges && userMe.user.challenges.length > 0;

        setBasicInfo(isBasicProfileCompleted);
        setAssessment(isAssessmentCompleted);
        setChallengeSubscribe(isChallenges);

        // Turn persistence on/off automatically
        const shouldPersist =
          isBasicProfileCompleted && isAssessmentCompleted && isChallenges;
        setIsTemp(!shouldPersist);

        const challenge = userMe.user.challenges.findLast((c) => c.isActive);

        // Update subscription store.
        if (challenge) {
          useSubscriptionStore
            .getState()
            .setTrialStartDate(challenge.trialStartDate);
          useSubscriptionStore
            .getState()
            .setSubscriptionStartDate(challenge.subscriptionStartDate);
        } else {
          useSubscriptionStore.getState().setTrialStartDate(null);
          useSubscriptionStore.getState().setSubscriptionStartDate(null);
        }

        // // update task store.
        // const tasksByDay = challenge?.challenge.tasksByDay || [];
        // // console.log('tasksByDay ::', tasksByDay);
        // useTaskStore.getState().setTasksByDay(tasksByDay);

        // update user store.
        set({
          user: userMe.user,
          loading: false,
          lastFetched: now,
        });
      } else {
        set({
          user: null,
          loading: false,
          lastFetched: null,
        });
      }
    } catch (error: any) {
      console.error('Error fetching user data:', error);
      set({
        error: error.message ?? 'Failed to fetch user me',
        loading: false,
      });
    }
  },
});

const _useUserStore = create<UserStoreState>()(
  persist(storeInitializer, {
    name: 'user-store-storage',
    storage: createJSONStorage(() => ({
      ...zustandMMKVStorage,
      setItem: (key, value) => {
        if (_useUserStore.getState().isTemp) {
          return;
        }
        zustandMMKVStorage.setItem(key, value);
      },
    })),
  })
);

export const useUserStore = createSelectors(_useUserStore);
export const fetchUser = (force: boolean) =>
  _useUserStore.getState().fetchUser(force);

export const useActiveChallenge = () => {
  const user = useUserStore.use.user();
  if (user === null) return null;
  if (user.challenges === null) return null;
  return user.challenges.find((challenge) => challenge.isActive) || null;
};

export const useIsActiveChallenge = (_id: string) => {
  const user = useUserStore.use.user();
  if (user === null) return false;
  if (user.challenges === null) return false;
  const challenge = user.challenges.find((challenge) => challenge.isActive);
  return challenge != null;
};

export const useUpdateTaskByDay = () => {
  const activeChallenge = useActiveChallenge();
  const { fetchTaskByDay } = useTaskStore();
  return () => {
    const challenge = activeChallenge?.challenge;
    if (!challenge) return;
    fetchTaskByDay(challenge._id, true);
  };
};
