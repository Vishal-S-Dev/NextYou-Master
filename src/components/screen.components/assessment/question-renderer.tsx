import React, { useMemo } from 'react';

import { type BaseQuestion, type QuestionAnswer } from '@/types';

import MultipleChoice, { type Option as MultiOption } from './multiple-choice';
import Ruler, { type Unit } from './ruler';
import ScaleOptionRenderer, {
  type ScaleOption,
} from './scale/scale-option-renderer';
import SingleChoice, { type Option as SingleOption } from './single-choice';
import TimerControl from './timer-control';

type Props = {
  question: BaseQuestion;
  answers: QuestionAnswer[];
  updateAnswer: (answer: QuestionAnswer) => void;
};

const QuestionRenderer: React.FC<Props> = ({
  question,
  answers,
  updateAnswer,
}) => {
  const currentAnswer = useMemo(
    () => answers.find((a) => a.questionId === question._id),
    [answers, question._id]
  );

  const getAns = useMemo(() => currentAnswer?.ans ?? [], [currentAnswer]);

  const commonProps = {
    questionId: question._id,
    questionType: question.questionType,
    type: question.type,
    points: question.points,
  };

  switch (question.type) {
    case 'single': {
      const selected = getAns[0]?.value ?? '';
      const options: SingleOption[] =
        question.options?.map((obj) => ({
          id: obj._id!,
          value: obj.name!,
        })) ?? [];

      return (
        <SingleChoice
          options={options}
          value={selected}
          onSelect={(option) =>
            updateAnswer({
              ...commonProps,
              ans: [{ id: option.id, value: option.value }],
            })
          }
        />
      );
    }

    case 'multiple': {
      const selectedValues: MultiOption[] = getAns.map((a) => ({
        id: a.id,
        value: a.value,
      }));

      const options: MultiOption[] =
        question.options?.map((obj) => ({
          id: obj._id!,
          value: obj.name!,
        })) ?? [];

      return (
        <MultipleChoice
          options={options}
          selectedValues={selectedValues}
          onChange={(newValues) =>
            updateAnswer({
              ...commonProps,
              ans: newValues.map((val) => ({
                id: val.id,
                value: val.value,
              })),
            })
          }
        />
      );
    }

    case 'scale': {
      const current = getAns.map((a) => ({
        id: a.id,
        label: a.label,
        value: Number(a.value),
      }));

      const options: ScaleOption[] =
        question.options?.map((obj) => ({
          id: obj._id!,
          label: obj.name ?? '-',
          minValue: obj.minValue ?? 0,
          maxValue: obj.maxValue ?? 5,
        })) ?? [];

      return (
        <ScaleOptionRenderer
          options={options}
          questionId={question._id}
          currentAnswer={current}
          onChangeAnswer={(option) => {
            const updated = [...getAns];
            const index = updated.findIndex((a) => a.id === option.id);
            const newAns = {
              id: option.id,
              label: option.label,
              value: option.value.toString(),
            };

            if (index !== -1) {
              updated[index] = newAns;
            } else {
              updated.push(newAns);
            }

            updateAnswer({
              ...commonProps,
              ans: updated,
            });
          }}
        />
      );
    }

    case 'timer': {
      const current = Number(getAns[0]?.value ?? 0);

      return (
        <TimerControl
          value={current}
          onStart={() =>
            updateAnswer({
              ...commonProps,
              ans: [{ id: question._id, value: '0' }],
            })
          }
          onStop={(duration) =>
            updateAnswer({
              ...commonProps,
              ans: [{ id: question._id, value: duration.toString() }],
            })
          }
        />
      );
    }

    case 'ruler': {
      const current = getAns[0] ?? { id: '', value: '', unit: '' };

      const units: Unit[] =
        question.units?.map((obj) => ({
          id: obj._id,
          label: obj.label,
          unit: obj.value,
        })) ?? [];

      return (
        <Ruler
          key={question._id}
          min={question.minValue ?? 20}
          max={question.maxValue ?? 200}
          units={units}
          currentAnswer={{
            id: current.id,
            value: current.value,
            unit: current.unit ?? '',
          }}
          valueChange={(val) =>
            updateAnswer({
              ...commonProps,
              ans: [{ id: val.id, value: val.value, unit: val.unit }],
            })
          }
        />
      );
    }

    default:
      return null;
  }
};

export default QuestionRenderer;
