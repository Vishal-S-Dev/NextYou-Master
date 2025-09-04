/* eslint-disable max-lines-per-function */
import BottomSheet, {
  BottomSheetBackdrop,
  type BottomSheetBackgroundProps,
  BottomSheetSectionList,
} from '@gorhom/bottom-sheet';
import { useFocusEffect, useRouter } from 'expo-router';
import { setStatusBarStyle, type StatusBarStyle } from 'expo-status-bar';
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Image, type LayoutChangeEvent, StyleSheet, View } from 'react-native';

import {
  DashboardTaskView,
  DayBadge,
  HealthSummary,
  HealthTipCard,
  HomeHeader,
  InspirationalStory,
  MeditationCard,
  OtherChallenges,
  PastSessions,
  QuickAccessList,
  ReferFriend,
  SubscriptionPlans,
} from '@/components/screen.components/home';
import { FocusAwareStatusBar, Loader } from '@/components/ui';
import {
  useActiveChallenge,
  useChallengesStore,
  useInspirationalStoryStore,
  useMeditationStore,
  useRecipeStore,
  useTaskStore,
  useUserStore,
} from '@/store';
import {
  useSubscriptionAlert,
  useSubscriptionStore,
} from '@/store/use-subscription-store';

// 👇 Module-level flag survives StrictMode remount
let hasFetchedDashboardData = false;
const DashboardScreen: React.FC = () => {
  const [viewHeight, setViewHeight] = useState(0);
  const [contentHeight, setContentHeight] = useState(0);
  const [snapPoints, setSnapPoints] = useState<string[] | null>(null);
  const [sheetIndex, setSheetIndex] = useState(0);

  const bottomSheetRef = useRef<BottomSheet>(null);

  const { user } = useUserStore();

  const {
    loading: challenges_loading,
    challenges,
    fetchChallenges,
  } = useChallengesStore();

  const {
    loading: meditation_loading,
    meditations,
    fetchMeditation,
  } = useMeditationStore();

  const {
    loading: inspirational_loading,
    inspiredStories,
    fetchInspirationalStories,
  } = useInspirationalStoryStore();

  const { recipes, loading: recipe_loading, fetchRecipes } = useRecipeStore();

  const { loading: task_loading, fetchTaskByDay } = useTaskStore();

  const activeChallenge = useActiveChallenge();

  const { currentTaskDay, subscriptionActive, updateCurrentTaskDay } =
    useSubscriptionStore();
  const { showSubscriptionAlert } = useSubscriptionAlert();

  const router = useRouter();

  const setStatusBar = (style: StatusBarStyle) => {
    setStatusBarStyle(style, true);
  };

  // Track screen focus
  useFocusEffect(
    useCallback(() => {
      setStatusBar('light');
      return () => {};
    }, [])
  );

  // Redirect if profile incomplete
  useLayoutEffect(() => {
    if (user && !user.isHealthDetailsCompleted) {
      const timeout = setTimeout(() => router.push('/day-0'), 2000);
      return () => clearTimeout(timeout);
    }
  }, [user, router]);

  // Initial fetch
  useEffect(() => {
    if (!hasFetchedDashboardData) {
      hasFetchedDashboardData = true;
      updateCurrentTaskDay();
      async function fetchData() {
        await Promise.all([
          fetchChallenges(),
          fetchRecipes(),
          fetchMeditation(),
          fetchInspirationalStories(),
        ]);

        if (currentTaskDay >= 4 && !subscriptionActive) {
          const timeout = setTimeout(() => showSubscriptionAlert(), 2000);
          return () => clearTimeout(timeout);
        }
      }
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // fetch tasks for active challenge
  useEffect(() => {
    const challenge = activeChallenge?.challenge;
    if (!challenge) return;
    fetchTaskByDay(challenge._id, true);
  }, [user, activeChallenge, fetchTaskByDay]);

  // Update snap points
  useEffect(() => {
    if (contentHeight > 0 && viewHeight > 0) {
      const initialHeight = Math.max(viewHeight - contentHeight - 10, 0);
      const percentage = `${(initialHeight / viewHeight) * 100}%`;
      const newSnapPoints = [percentage, '90%'];
      setSnapPoints(newSnapPoints);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contentHeight]);

  // Bottom sheet snapToIndex
  useEffect(() => {
    if (!snapPoints) return;
    if (!contentHeight || !viewHeight) return;
    const timeout = setTimeout(
      () => bottomSheetRef.current?.snapToIndex(0),
      1000
    );
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [snapPoints]);

  // Layout handlers
  const onLayoutView = useCallback((e: LayoutChangeEvent) => {
    const height = e.nativeEvent.layout.height;
    setViewHeight(height);
  }, []);

  const onLayoutGradient = useCallback((e: LayoutChangeEvent) => {
    const height = e.nativeEvent.layout.height;
    setContentHeight(height);
  }, []);

  // Memoized renders Backdrop
  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        appearsOnIndex={1}
        disappearsOnIndex={0}
        pressBehavior="none"
        {...props}
      />
    ),
    []
  );

  //sheet background
  const renderSheetBackground = useCallback(
    ({ style }: BottomSheetBackgroundProps) => (
      <View style={[style, styles.sheetContainer]}>
        <Image
          source={require('@assets/images/home-bg.png')}
          resizeMode="cover"
          style={styles.sheetImage}
        />
      </View>
    ),
    []
  );

  // Sheet handle
  const sheetHandleStyle = useMemo(
    () => ({ marginTop: sheetIndex >= 2 ? 20 : 0 }),
    [sheetIndex]
  );

  //UI rendering
  return (
    <View style={styles.container} onLayout={onLayoutView}>
      <FocusAwareStatusBar style="light" />

      <HomeHeader onLayout={onLayoutGradient} />

      {snapPoints && (
        <BottomSheet
          snapPoints={snapPoints}
          index={-1}
          ref={bottomSheetRef}
          onChange={setSheetIndex}
          backdropComponent={renderBackdrop}
          handleStyle={sheetHandleStyle}
          backgroundComponent={renderSheetBackground}
          enableDynamicSizing={false}
          style={styles.bottomSheet}
        >
          <BottomSheetSectionList
            sections={[{ title: '', data: ['Section1'] }]}
            keyExtractor={(item, index) => `${item}-${index}`}
            renderItem={() => (
              <View style={styles.contentContainer}>
                {/* Current Day Badge */}
                <DayBadge day={currentTaskDay} />

                {/* Task List */}
                <DashboardTaskView />

                {/* Subscription Plans */}
                {(user?.challenges?.length ?? 0) > 0 && (
                  <SubscriptionPlans subscription={user!.challenges} />
                )}

                {/* Quick Access */}
                <QuickAccessList />

                {/* Health Summary */}
                <HealthSummary />
                {challenges.length > 0 && <OtherChallenges />}

                {/* Past Sessions */}
                <PastSessions />

                {/* Health Tips */}
                {recipes.length > 0 && <HealthTipCard recipe={recipes[0]} />}

                {/* Refer a Friend */}
                <ReferFriend />

                {/* Meditation Card */}
                {meditations.length > 0 && (
                  <MeditationCard meditation={meditations[0]} />
                )}

                {/* Inspirational Story */}
                {inspiredStories.length > 0 && <InspirationalStory />}
              </View>
            )}
            stickySectionHeadersEnabled={false}
            nestedScrollEnabled
            keyboardShouldPersistTaps="handled"
          />
        </BottomSheet>
      )}

      {/* Loader */}
      <Loader
        visible={
          recipe_loading ||
          challenges_loading ||
          meditation_loading ||
          inspirational_loading ||
          task_loading
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    position: 'absolute',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: '#red',
  },
  loaderGradient: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: { flex: 1, alignItems: 'center', backgroundColor: '#2A1774' },
  sheetContainer: {
    alignItems: 'center',
    borderRadius: 40,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  sheetImage: { width: '100%' },
  contentContainer: {},
  bottomSheet: { zIndex: 999 },
});

export default DashboardScreen;
