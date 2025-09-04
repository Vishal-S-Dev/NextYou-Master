import { type AnswerSubmissionVariables } from '@/api/assessment/types';
import { type QuestionAnswer } from '@/types';

export function transformAnswersToPayload(
  answers: QuestionAnswer[]
): AnswerSubmissionVariables {
  return {
    questionResponses: answers.map((q) => ({
      questionId: q.questionId,
      questionType: q.questionType,
      type: q.type,
      points: q.points,
      ans: q.ans.map((a) => ({
        id: a.id,
        value: a.value,
        unit: a.unit,
      })),
    })),
  };
}
