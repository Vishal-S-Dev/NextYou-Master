import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { fetchChallengeTasksByDay } from '@/api/challenges';
import { createSelectors, zustandMMKVStorage } from '@/lib';
import { Logger } from '@/lib/logger';
import { type TaskDetails, type TasksByDay } from '@/types';

import { currentTaskDay } from './use-subscription-store';

interface TaskState {
  loading: boolean;
  error: string | null;
  lastFetched: number | null;
  tasksByDay: TasksByDay[];

  setTasksByDay: (tasksByDay: TasksByDay[]) => void;
  completeTask: (day: number, taskId: string) => void;
  resetTasksForDay: (day: number) => void;
  getTasksForDay: (day: number) => TaskDetails[];
  getTaskById: (day: number, taskId: string) => TaskDetails | null;
  getCurrentDayTaskById: (taskId: string) => TaskDetails | null;

  fetchTaskByDay: (challengeId: string, force?: boolean) => Promise<void>;
  fetchTaskByID: (taskId: string, force?: boolean) => Promise<void>;
}

export const useTaskStore = create<TaskState>()(
  persist(
    (set, get) => ({
      loading: false,

      error: null,

      lastFetched: null,

      tasksByDay: [],

      setTasksByDay: (tasksByDay) => set({ tasksByDay }),

      completeTask: (day, taskId) =>
        set((state) => ({
          tasksByDay: state.tasksByDay.map((d) =>
            d.day === day
              ? {
                  ...d,
                  tasks: d.tasks.map((t) =>
                    t._id === taskId ? { ...t, status: 'completed' } : t
                  ),
                }
              : d
          ),
        })),

      resetTasksForDay: (day) =>
        set((state) => ({
          tasksByDay: state.tasksByDay.map((d) =>
            d.day === day
              ? {
                  ...d,
                  tasks: d.tasks.map((t) => ({ ...t, status: 'pending' })),
                }
              : d
          ),
        })),

      getTasksForDay: (day) => {
        const taskDay = get().tasksByDay?.find((d) => d.day === day);
        if (!taskDay) return [];
        return taskDay.tasks;
      },

      getTaskById: (day: number, taskId: string) => {
        const tasks = get().getTasksForDay(day);
        return tasks.find((t) => t._id === taskId) || null;
      },

      getCurrentDayTaskById: (taskId: string) => {
        return get().getTaskById(currentTaskDay(), taskId);
      },

      fetchTaskByDay: async (challengeId: string, force = false) => {
        const { lastFetched } = get();
        const now = Date.now();

        if (!force && lastFetched && now - lastFetched < 1000 * 60 * 5) {
          // Skip fetch if cached < 5 min ago
          Logger.log('Using cached tasks for challenge:', challengeId);
          return;
        }

        set({ loading: true, error: null });

        try {
          const res = await fetchChallengeTasksByDay(challengeId);
          const json = JSON.stringify(res, null, 2);
          Logger.log('fetchChallengeTasksByDay ::', json);
          set({
            tasksByDay: res.results,
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
      fetchTaskByID: async (taskId, force) => {
        const { lastFetched } = get();
        const now = Date.now();

        if (!force && lastFetched && now - lastFetched < 1000 * 60 * 5) {
          // Skip fetch if cached < 5 min ago
          Logger.log('Using cached tasks for challenge:', taskId);
          return;
        }

        set({ loading: true, error: null });

        try {
          const res = await fetchChallengeTasksByDay(taskId);
          const json = JSON.stringify(res, null, 2);
          Logger.log('fetchChallengeTasksByDay ::', json);
          set({
            tasksByDay: res.results,
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
      name: 'task-store-storage',
      storage: createJSONStorage(() => zustandMMKVStorage),
    }
  )
);

export const taskStore = createSelectors(useTaskStore);
