export type QuestionType = 'single' | 'multiple' | 'scale' | 'timer' | 'ruler';

export type ServerQuestionType =
  | 'healthIssue'
  | 'previousHealthIssue'
  | 'mentalHealthIssue'
  | 'poopCycle'
  | 'sleepCycle'
  | 'toBeSolvedHealthIssue'
  | 'other';

// Option for select-type questions
export type QuestionOption = {
  _id: string;
  name: string;
  minValue?: number;
  maxValue?: number;
  type: ServerQuestionType;
  isActive: boolean;
  isDeleted: boolean;
};

// Unit for ruler-type questions
export type QuestionUnit = {
  label: string;
  value: string;
  _id: string;
};

// Base structure shared by all questions
export interface BaseQuestion {
  _id: string;
  question: string;
  questionType: ServerQuestionType;
  type: QuestionType;
  minValue?: number;
  maxValue?: number;
  points: number;
  maxDuration?: number;
  options?: QuestionOption[];
  units?: QuestionUnit[];
  sortOrder: number;
  isActive: boolean;
  isDeleted: boolean;
  createdBy: string;
  updatedBy: string;
  createdAt: string; // could be Date if parsed
  updatedAt: string;
  __v: number;
}
//Answer Submission
// Base Answer shape
export type BaseAnswer = {
  id: string;
  value: string;
  label?: string;
  unit?: string;
};

// Answer object per question
export type QuestionAnswer = {
  questionId: string;
  questionType: ServerQuestionType;
  type: QuestionType;
  points: number;
  ans: BaseAnswer[];
};
