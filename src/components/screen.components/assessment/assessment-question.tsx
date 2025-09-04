import React, {
  type Dispatch,
  type SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Animated as RNAnimated, StyleSheet } from 'react-native';

import { useQuestionAnswerSubmission } from '@/api/assessment';
import { showErrorMessage, Text, View } from '@/components/ui';
import { useAssessmentStorage, useQuestionAnswering } from '@/hooks';
import { Font, TextAlign, TextSize } from '@/lib';
import { type BaseQuestion, type QuestionAnswer } from '@/types';

import CoinsWon from './coins-won';
import NavigationButtons from './navigation-buttons';
import QuestionRenderer from './question-renderer';
import SlideTransition from './slide-transition';

interface AssessmentProps {
  questions: BaseQuestion[];
  showResult: (answers: QuestionAnswer[]) => void;
  progressAnimatedVal: RNAnimated.Value;
  coins: number;
  setCoins: Dispatch<SetStateAction<number>>;
}

//const COINS_PER_QUESTION = 10;

const AssessmentQuestion: React.FC<AssessmentProps> = ({
  questions,
  //progressSharedValue,
  progressAnimatedVal,
  coins,
  setCoins,
  showResult,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [coinWon, setCoinWon] = useState(false);

  const lastAnsweredIndex = useRef(-1);

  const { answers, updateAnswer, isAnswered } = useQuestionAnswering();
  const {
    loadProgress,
    saveProgress,
    isLoading,
    setIsLoading,
    // clearProgress
  } = useAssessmentStorage();
  const questionAnswerSubmission = useQuestionAnswerSubmission();

  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;

  // Load stored answers and index
  useEffect(() => {
    updateState();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Save progress + animate progress bar
  useEffect(() => {
    // progressSharedValue.value = withTiming(
    //   (currentIndex + 1) / totalQuestions,
    //   {
    //     duration: 400,
    //   }
    // );

    console.log('Progress ::', progressAnimatedVal);

    RNAnimated.timing(progressAnimatedVal, {
      toValue: (currentIndex + 1) / totalQuestions,
      duration: 400,
      useNativeDriver: false, // width anim can't use native driver
    }).start();
    saveProgress({ index: currentIndex, answers, coins });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex, answers, coins]);

  const updateState = async () => {
    setIsLoading(true);
    const saved = await loadProgress();
    console.log('Saved progress ::', saved);
    if (saved) {
      console.log('saved. ..Progress ::', saved);

      setCurrentIndex(saved.index);
      saved.answers.forEach((qa: QuestionAnswer) => {
        updateAnswer(qa);
      });
      lastAnsweredIndex.current = Object.keys(saved.answers).length - 1;
      //setCoins((lastAnsweredIndex.current + 1) * COINS_PER_QUESTION);
      setCoins(saved.coins);
    } else {
      setCurrentIndex(0);
      setCoins(0);
    }
    setIsLoading(false);
  };

  const submitAnswers = () => {
    const jsonString = JSON.stringify(answers);
    console.log('jsonString ::', jsonString);

    questionAnswerSubmission.mutate(
      { questionResponses: answers },
      {
        onSuccess: (responseData) => {
          console.log('questionAnswerSubmission success', responseData);
          setCoinWon(true);
        },
        onError: (error) => {
          const message = `questionAnswerSubmission failed, ${error.response?.data || error.message}`;
          console.log('questionAnswerSubmission', error.response);
          showErrorMessage(message);
        },
      }
    );
  };

  const isCurrentAnswered = useCallback((): boolean => {
    return isAnswered(currentQuestion._id, currentQuestion.type);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [answers, currentQuestion]);

  const handleNext = useCallback(() => {
    if (!coinWon) {
      if (!isCurrentAnswered()) return;

      const isNewAnswer = currentIndex > lastAnsweredIndex.current;
      if (isNewAnswer) {
        setCoins((coins) => coins + questions[currentIndex].points);
      }

      if (currentIndex < totalQuestions - 1) {
        setCurrentIndex((prev) => prev + 1);
      } else {
        //submit the result
        // setCoinWon(true); // <-- This sets up the next button click to go to result
        submitAnswers();
      }
    } else {
      // Now coinWon is true on the second click
      //clearProgress();
      showResult(answers);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coinWon, currentIndex, isCurrentAnswered]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      setCoinWon(false);
      setCurrentIndex((prev) => prev - 1);
    }
  }, [currentIndex]);
  const previousIndex = useRef(0);

  useEffect(() => {
    previousIndex.current = currentIndex;
  }, [currentIndex]);

  const getDirection =
    currentIndex > previousIndex.current ? 'forward' : 'backward';

  const nextButtonLabel = coinWon
    ? 'See Result'
    : currentIndex === totalQuestions - 1
      ? 'Submit'
      : 'Next';

  if (isLoading)
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading..</Text>
      </View>
    );

  return (
    <View style={styles.container}>
      {!coinWon && (
        <Text
          font={Font.IBMPlexSans_500Medium}
          size={TextSize['2xl']}
          textAlign={TextAlign.center}
          className="mb-4"
        >
          {currentQuestion.question}
        </Text>
      )}

      {!coinWon ? (
        <SlideTransition trigger={currentQuestion._id} direction={getDirection}>
          <QuestionRenderer
            question={currentQuestion}
            answers={answers}
            updateAnswer={updateAnswer}
          />
        </SlideTransition>
      ) : (
        <CoinsWon coins={coins} />
      )}

      <NavigationButtons
        nextButtonLabel={nextButtonLabel}
        onPrev={handlePrev}
        onNext={handleNext}
        isNextDisabled={!isCurrentAnswered()}
        showPrev={currentIndex > 0 && !coinWon}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  coinContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default AssessmentQuestion;
