import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { zustandMMKVStorage } from '@/lib/storage';
import { type Notification } from '@/types';

import { useUserStore } from './use-user-store';

type NotificationState = {
  notifications: Notification[];
  loading: boolean;
  error: string | null;
  lastFetched: number | null;
  fetchNotifications: (force?: boolean) => Promise<void>;
};

const initialData: Notification[] = [
  {
    id: '1',
    title: 'Congratulations',
    message: '35% your daily challenge completed',
    time: '9:45 AM',

    unread: true,
  },
  {
    id: '2',
    title: 'Attention',
    message: 'Your subscription is going to expire very soon. Subscribe now.',
    time: '9:38 AM',
    unread: true,
  },
  {
    id: '3',
    title: 'Daily Activity',
    message: 'Time for your workout session',
    time: '8:25 AM',
  },
  {
    id: '4',
    title: 'Refer & get 20% off',
    message: 'Get exiting 20% on referrals. Share with your loved one’s...',
    time: '9:45 AM',
  },
  {
    id: '5',
    title: 'Attention',
    message: 'Your subscription is going to expire very soon. Subscribe now.',
    time: '9:38 AM',
  },
  {
    id: '6',
    title: 'Earned 100pts',
    message: 'Yeee!! You have earned 100 pts on your day 2 task completion',
    time: '8:38 AM',
  },
];

export const useNotificationStore = create<NotificationState>()(
  persist(
    (set, get) => ({
      notifications: [],
      loading: false,
      error: null,
      lastFetched: null,

      fetchNotifications: async (force = false) => {
        const { lastFetched } = get();
        const now = Date.now();

        if (!force && lastFetched && now - lastFetched < 1000 * 60 * 10) {
          // Skip fetch if cached < 10 min ago
          return;
        }

        set({ loading: true, error: null });

        const { user } = useUserStore.getState();

        try {
          //const res = await fetchAssessmentQuestion();

          var noti: Notification[] = initialData;
          if (user !== null && !user!.isHealthDetailsCompleted) {
            noti[0] = {
              id: '0',
              title: 'Complete Health Data',
              message: 'Complete your heath data & earn 500pts',
              time: '9:38 AM',
              unread: true,
              type: 'health_data',
            };
          }
          set({
            notifications: noti,
            loading: false,
            lastFetched: now,
          });
        } catch (error: any) {
          set({
            error: error.message ?? 'Failed to fetch notification',
            loading: false,
          });
        }
      },
    }),
    {
      name: 'notification-storage',
      storage: createJSONStorage(() => zustandMMKVStorage),
    }
  )
);
