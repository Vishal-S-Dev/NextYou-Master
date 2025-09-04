import { useCallback, useState } from 'react';

import { type QuestionAnswer, type QuestionType } from '@/types';

export function useQuestionAnswering() {
  const [answers, setAnswers] = useState<QuestionAnswer[]>([]);

  const updateAnswer = useCallback((updated: QuestionAnswer) => {
    setAnswers((prev) => {
      const index = prev.findIndex((a) => a.questionId === updated.questionId);
      if (index !== -1) {
        const updatedAnswers = [...prev];
        updatedAnswers[index] = updated;
        return updatedAnswers;
      }
      return [...prev, updated];
    });
  }, []);

  const isAnswered = useCallback(
    (questionId: string, type: QuestionType): boolean => {
      const q = answers.find((a) => a.questionId === questionId);
      if (!q) return false;

      switch (type) {
        case 'single':
          return q.ans.length === 1 && !!q.ans[0].value;
        case 'multiple':
          return q.ans.length > 0 && q.ans.every((a) => !!a.value);
        case 'scale':
          return (
            q.ans.length > 0 && q.ans.every((a) => !isNaN(Number(a.value)))
          );
        case 'timer':
          return q.ans.length === 1 && Number(q.ans[0].value) > 0;
        case 'ruler':
          return (
            q.ans.length === 1 &&
            !!q.ans[0].unit &&
            !!q.ans[0].value &&
            Number(q.ans[0].value) > 0
          );
        default:
          return false;
      }
    },
    [answers]
  );

  return {
    answers,
    updateAnswer,
    isAnswered,
  };
}
