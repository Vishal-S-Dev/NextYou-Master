import { useState } from 'react';

import { getItem, removeItem, setItem } from '@/lib/storage';
import { type QuestionAnswer } from '@/types';

type SavedProgress = {
  index: number;
  answers: QuestionAnswer[];
  coins: number;
};

const STORAGE_KEY = 'assessment_progress';

export function useAssessmentStorage() {
  const [isLoading, setIsLoading] = useState(true);

  const loadProgress = async (): Promise<SavedProgress | null> => {
    try {
      const json = getItem<string>(STORAGE_KEY);
      //console.log('json ::', json);
      if (!json) return null;
      const parsed = JSON.parse(json) as SavedProgress;
      return parsed;
    } catch (err) {
      console.warn('Failed to load assessment progress', err);
      return null;
    }
  };

  const saveProgress = async (progress: SavedProgress): Promise<void> => {
    try {
      const json = JSON.stringify(progress);
      setItem<string>(STORAGE_KEY, json);
    } catch (err) {
      console.warn('Failed to save assessment progress', err);
    }
  };

  const clearProgress = (): void => {
    removeItem(STORAGE_KEY);
  };

  return {
    loadProgress,
    saveProgress,
    clearProgress,
    isLoading,
    setIsLoading,
  };
}
