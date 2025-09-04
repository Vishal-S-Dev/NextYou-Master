import dayjs from 'dayjs';
import { router } from 'expo-router';
import { useCallback } from 'react';
import { Alert } from 'react-native';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { createSelectors, zustandMMKVStorage } from '@/lib';

interface SubscriptionState {
  trialStartDate: string | null;
  subscriptionStartDate: string | null;
  subscriptionActive: boolean;
  currentTaskDay: number; // 0 = day 0 (no task), 1 = day 1 tasks, etc.

  setTrialStartDate: (date: string | null) => void;
  setSubscriptionStartDate: (date: string | null) => void;

  updateCurrentTaskDay: () => number;
}

export const useSubscriptionStore = create<SubscriptionState>()(
  persist(
    (set, get) => ({
      trialStartDate: null,
      subscriptionStartDate: null,
      subscriptionActive: false,
      currentTaskDay: 0, // start at day 0 (no task)

      setTrialStartDate: (date) => {
        //Logger.log('Setting trial start date:', date);
        set({
          trialStartDate: date,
          subscriptionActive: false,
        });

        get().updateCurrentTaskDay();
      },

      setSubscriptionStartDate: (date) => {
        //Logger.log('Setting subscription start date:', date);
        set({
          subscriptionStartDate: date,
          subscriptionActive: true,
        });

        get().updateCurrentTaskDay();
      },

      updateCurrentTaskDay: () => {
        const trialStart = get().trialStartDate;
        const subscriptionStart = get().subscriptionStartDate;

        if (!trialStart) {
          set({ currentTaskDay: 0 });
          return 0;
        }

        if (!subscriptionStart) {
          //Logger.log('Trial Start Date:', trialStart);
          const currentDay = dayjs().diff(
            dayjs(trialStart).startOf('day'),
            'day'
          );
          set({
            currentTaskDay: currentDay,
          });
          return currentDay;
        }

        if (subscriptionStart) {
          const day = 4;
          //Logger.log('Subscription Start Date:', subscriptionStart);
          const currentDay = dayjs().diff(
            dayjs(subscriptionStart).startOf('day'),
            'day'
          );
          set({
            currentTaskDay: day + currentDay,
          });
          return currentDay;
        }
        return 0;
      },
    }),
    {
      name: 'subscription-store-storage',
      storage: createJSONStorage(() => zustandMMKVStorage),
    }
  )
);

export const subscriptionStore = createSelectors(useSubscriptionStore);

export const currentTaskDay = () =>
  useSubscriptionStore.getState().currentTaskDay;

export const useSubscriptionAlert = () => {
  const showSubscriptionAlert = useCallback(() => {
    Alert.alert('Your subscription ended', 'Please subscribe to continue', [
      {
        text: 'Proceed to payment',
        onPress: () => {
          router.push('/challenges/plan-details');
        },
      },
      {
        text: 'Skip for Now',
        onPress: () => {},
        style: 'destructive',
      },
    ]);
  }, []);

  return { showSubscriptionAlert };
};
