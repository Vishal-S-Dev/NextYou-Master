import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import {
  fetchAssessmentQuestion,
  type QuestionApiResponse,
} from '@/api/assessment';
import { zustandMMKVStorage } from '@/lib/storage';

type QuestionState = {
  questions: QuestionApiResponse['results'];
  loading: boolean;
  error: string | null;
  lastFetched: number | null;
  fetchQuestions: (force?: boolean) => Promise<void>;
};

export const useQuestionStore = create<QuestionState>()(
  persist(
    (set, get) => ({
      questions: [],
      loading: false,
      error: null,
      lastFetched: null,

      fetchQuestions: async (force = false) => {
        const { lastFetched } = get();
        const now = Date.now();

        if (!force && lastFetched && now - lastFetched < 1000 * 60 * 10) {
          // Skip fetch if cached < 10 min ago
          return;
        }

        set({ loading: true, error: null });

        try {
          const res = await fetchAssessmentQuestion();
          const json = JSON.stringify(res);
          console.log('res.results ::', json);
          set({
            questions: res.results,
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
    }),
    {
      name: 'assessment-question-storage',
      storage: createJSONStorage(() => zustandMMKVStorage),
    }
  )
);
