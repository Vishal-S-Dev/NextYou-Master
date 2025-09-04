import { useHeaderHeight } from '@react-navigation/elements';
import { useNavigation, useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Animated as RNAnimated,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { useMessageModal } from '@/components/message.model';
import {
  AssessmentQuestion,
  AssessmentResult,
  HeaderCoins,
  ProgressBar,
} from '@/components/screen.components/assessment';
import { FocusAwareStatusBar } from '@/components/ui';
// import { setIsAssessment } from '@/hooks';
import { colors } from '@/lib';
import { useOnboardingStore } from '@/store/use-onboarding-store';
import { useQuestionStore } from '@/store/use-question-store';
import { type QuestionAnswer } from '@/types';
// import { type Answer } from '@/types';

export default function TakeAssessment() {
  /* -----------------------------------------------------------------* /
     1. State & refs
  /* -----------------------------------------------------------------*/
  const [coins, setCoins] = useState<number>(0);
  const progress = useRef(new RNAnimated.Value(0)).current;
  const headerHeight = useHeaderHeight();
  const navigation = useNavigation();
  const router = useRouter();
  const { showModal, hideModal } = useMessageModal();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { questions, fetchQuestions, loading, error } = useQuestionStore();
  const { setAssessment } = useOnboardingStore.getState();

  useEffect(() => {
    fetchQuestions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    console.log('ProgressBar value', progress);
    navigation.setOptions({
      headerTitle: () => <ProgressBar progress={progress} />,
      headerRight: () => <HeaderCoins coins={coins} />,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [navigation, coins, progress]);

  const onClose = () => {
    hideModal();
    setAssessment(true);
    timeoutRef.current = setTimeout(() => {
      router.replace('/');
      // 🔴 This clears the ref — not the timeout (because it's done)
      timeoutRef.current = null;
    }, 0);
  };

  const handleSubmit = (_answers: QuestionAnswer[]) => {
    showModal({
      content: <AssessmentResult />,
      modelStyle: {
        flex: 1,
        width: '100%',
        borderRadius: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.bg,
      },
      actionType: 'ok',
      onOk: onClose,
      okLabel: 'OK',
    });
  };

  return (
    <View style={styles.container}>
      <FocusAwareStatusBar style="dark" />

      <View
        style={{
          flex: 1,
          paddingTop: headerHeight,
          backgroundColor: colors.bg,
          paddingBottom: Platform.OS === 'ios' ? 20 : 0,
        }}
      >
        {loading ? (
          <ActivityIndicator size="large" color="red" />
        ) : error ? (
          <Text style={{ color: 'red', textAlign: 'center' }}>{error}</Text>
        ) : (
          <AssessmentQuestion
            questions={questions}
            showResult={handleSubmit}
            progressAnimatedVal={progress}
            coins={coins}
            setCoins={setCoins}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
});
