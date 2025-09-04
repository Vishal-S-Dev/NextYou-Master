import { Image } from 'expo-image';
import { ImageBackground } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams } from 'expo-router';
import { setStatusBarStyle, type StatusBarStyle } from 'expo-status-bar';
import React, { useCallback, useEffect, useState } from 'react';
import {
  Dimensions,
  FlatList,
  type ListRenderItem,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Animated, {
  runOnJS,
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ImagePath } from '@/api';
import { fetchChallengeDetails } from '@/api/challenges';
import { type ChallengeDetail } from '@/api/challenges/types';
import InspiredStoriesCard from '@/components/inspired-stories-card';
import ProfileStack from '@/components/profile-stack';
import {
  FeatureItem,
  Header,
  TrialButton,
} from '@/components/screen.components/recommended';
import {
  FocusAwareStatusBar,
  Loader,
  NavigationHeader,
  showErrorMessage,
} from '@/components/ui';
import { colors, Font } from '@/lib';
import { Logger } from '@/lib/logger';
import { useChallengesStore, useIsActiveChallenge } from '@/store';

const { width } = Dimensions.get('window');
const HEADER_HEIGHT = 56;

type Params = {
  id: string;
  isActive?: boolean;
};

// eslint-disable-next-line max-lines-per-function
const ChallengeDetailScreen: React.FC = () => {
  /**
   * Shared values (native‑driver, 100% off‑JS)
   */
  const scrollY = useSharedValue(0);

  /**
   * Const values
   */
  const insets = useSafeAreaInsets();
  const bottomInsets = insets.bottom;
  const bottomHeight = Platform.OS === 'android' ? 12 : bottomInsets;
  const barStyle = useSharedValue<'light' | 'dark'>('light');
  // const { showModal } = useMessageModal();

  const rawParams = useLocalSearchParams();
  const params: Params = {
    id: String(rawParams.id),
    isActive:
      rawParams.isActive !== undefined && rawParams.isActive === 'true'
        ? true
        : false,
  };
  const { id: challengeId, isActive } = params;
  const isActiveChallenge = useIsActiveChallenge(challengeId);
  // const { setChallengeSubscribe } = useOnboardingStore.getState();
  // const challengeStartTrial = useChallengeStartTrial();
  // const { mutate: startTrial } = challengeStartTrial();

  const [loading, setLoading] = useState<boolean>(false);
  const [challengeDetails, setChallengeDetails] =
    useState<ChallengeDetail | null>(null);

  const { getChallengeById } = useChallengesStore();

  console.log(
    `isActive -- ${isActive} ::: isActiveChallenge -- ${isActiveChallenge}`
  );

  //
  // Data
  //
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetchChallengeDetails(challengeId);
        const json = JSON.stringify(res, null, 2);
        Logger.log('fetchChallengeDetails ::', json);
        setChallengeDetails(res.results);
      } catch (error) {
        showErrorMessage('Failed to fetch challenge details');
        const local = getChallengeById(challengeId);
        if (local) {
          setChallengeDetails({ challenge: local });
        }
      } finally {
        setLoading(false);
      }
    };
    if (challengeId) {
      fetchData();
    } else {
      showErrorMessage('Invalid challenge ID');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * Scroll handler
   */
  const setStatusBar = (style: StatusBarStyle) => {
    setStatusBarStyle(style, true);
  };
  const onScroll = useAnimatedScrollHandler({
    onScroll: (ev) => {
      scrollY.value = ev.contentOffset.y;
      const next = scrollY.value > HEADER_HEIGHT ? 'dark' : 'light';
      if (next !== barStyle.value) {
        barStyle.value = next;
        runOnJS(setStatusBar)(next);
      }
    },
  });

  //--------------------
  //Callbacks
  //-----------------------
  // const onCloseAccountSuccessModel = () => {
  //   setChallengeSubscribe(true);
  //   router.replace('/');
  // };

  // const onAgree = () => {
  //   setLoading(true);
  //   startTrial(
  //     { challengeId },
  //     {
  //       onSuccess: (responseData) => {
  //         setLoading(false);
  //         const json = JSON.stringify(responseData, null, 2);
  //         console.log('challengeStartTrial ::', json);
  //         showModal({
  //           content: <SubscriptionSuccess />,
  //           modelStyle: {
  //             flex: 1,
  //             width: '100%',
  //             borderRadius: 0,
  //             justifyContent: 'center',
  //             alignItems: 'center',
  //             backgroundColor: colors.bg,
  //           },
  //           onClose: onCloseAccountSuccessModel,
  //         });
  //       },
  //       onError: (error) => {
  //         setLoading(false);
  //         const message = `challengeStartTrial failed, ${error.response?.data.message || error.message}`;
  //         console.error(error.response?.data);
  //         showErrorMessage(message);
  //       },
  //     }
  //   );
  // };

  const onPressStart = () => {
    router.push({
      pathname: '/day-0',
      params: {
        challengeId: challengeId,
      },
    });
  };

  const renderItem = useCallback<ListRenderItem<string>>(
    ({ item }) => <FeatureItem label={item} />,
    []
  );

  const keyExtractor = useCallback((_: string, i: number) => i.toString(), []);

  // UI
  return (
    <View style={styles.container}>
      {challengeDetails !== null ? (
        <>
          <FocusAwareStatusBar style="light" />

          <Header
            title={challengeDetails!.challenge!.title}
            scrollY={scrollY}
          />

          <Animated.ScrollView
            onScroll={onScroll}
            scrollEventThrottle={16}
            showsVerticalScrollIndicator={false}
            contentInsetAdjustmentBehavior="never" // 🔑 iOS only
            contentContainerStyle={{ paddingBottom: bottomInsets + 50 }}
            scrollIndicatorInsets={{ top: 0 }}
          >
            {/* Hero */}
            <ImageBackground
              placeholder={require('@assets/images/recommended/energy_booster.png')}
              source={{ uri: ImagePath(challengeDetails!.challenge!.banner) }}
              style={styles.hero}
              contentFit="cover"
            >
              <Header />
            </ImageBackground>

            {/* Card */}
            <View style={styles.card}>
              {/* title + price */}
              <View style={styles.titleRow}>
                <Text style={styles.title}>
                  {challengeDetails!.challenge!.title}
                </Text>
                <Text style={styles.price}>
                  ₹ {challengeDetails!.challenge!.price}
                </Text>
              </View>
              {/* Subtitle */}
              <Text style={styles.subtitle}>
                {challengeDetails!.challenge!.subTitle}
              </Text>
              <View style={styles.separator} />
              {/* Description */}
              <Text style={styles.description} numberOfLines={3}>
                {challengeDetails!.challenge!.description}
              </Text>

              {/* Avatars */}
              {challengeDetails!.challenge!.peoples && (
                <View style={styles.avatarRow}>
                  <ProfileStack
                    peoples={challengeDetails!.challenge!.peoples}
                  />
                  <Text style={styles.activeUsersNumber}>
                    ${challengeDetails!.challenge!.peoples.length}+{' '}
                    <Text style={styles.activeUsers}>Active users</Text>
                  </Text>
                </View>
              )}

              {/* Features  */}
              <FlatList
                data={challengeDetails!.challenge!.benefits}
                renderItem={renderItem}
                keyExtractor={keyExtractor}
                scrollEnabled={false}
                initialNumToRender={
                  challengeDetails!.challenge!.benefits.length
                }
                contentContainerStyle={{ paddingVertical: 8 }}
              />

              {/* Rewards */}
              <View style={styles.rewardCard}>
                <Image
                  source={require('@assets/images/recommended/score_rewards.png')}
                  style={styles.rewardImage}
                />
                <View style={{ flex: 1, paddingHorizontal: 12 }}>
                  <Text style={styles.rewardTitle}>Score Rewards</Text>
                  <Text style={styles.rewardSubtitle}>
                    Increase your reward points after you complete this
                  </Text>
                </View>
                <View style={styles.rewardPointsBox}>
                  <Text style={styles.rewardPointsLabel}>Earn</Text>
                  <Text style={styles.rewardPoints}>
                    +{challengeDetails!.challenge!.price}
                    <Text style={styles.pts}> Pts</Text>
                  </Text>
                </View>
              </View>

              {/* Testimonial */}
              {(challengeDetails?.reviews?.length ?? 0) > 0 && (
                <LinearGradient
                  colors={['#dbe4ff', '#f5e0ff']}
                  style={styles.testimonialCard}
                >
                  <InspiredStoriesCard
                    review={challengeDetails!.reviews![0]}
                    color="#000"
                  />
                </LinearGradient>
              )}
            </View>
          </Animated.ScrollView>

          {/* Floating CTA  */}
          {!isActive && !isActiveChallenge && (
            <Animated.View
              style={[styles.ctaWrapper, { marginBottom: bottomHeight }]}
            >
              <TrialButton onPress={onPressStart} />
            </Animated.View>
          )}
        </>
      ) : (
        <SafeAreaView style={styles.container}>
          <FocusAwareStatusBar style="dark" />
          <NavigationHeader onBackPress={() => router.back()} />
          <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          >
            <Text> No Data </Text>
          </View>
        </SafeAreaView>
      )}
      <Loader visible={loading} />
    </View>
  );
};

// Styles

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  hero: {
    width: '100%',
    height: width * 0.8,
    justifyContent: 'flex-start',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  heroOverlay: { ...StyleSheet.absoluteFillObject },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    padding: 8,
    borderRadius: 24,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  card: {
    marginTop: -40,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: colors.bg,
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 40,
    minHeight: width,
  },
  titleRow: { flexDirection: 'row', justifyContent: 'space-between' },
  title: {
    flex: 1,
    fontFamily: Font.IBMPlexSans_600SemiBold,
    fontSize: 20,
    color: '#4F2BDA',
  },
  price: {
    fontFamily: Font.IBMPlexSans_600SemiBold,
    fontSize: 20,
    color: '#1e1e1e',
  },
  subtitle: {
    fontFamily: Font.IBMPlexSans_500Medium,
    fontSize: 14,
    marginTop: 8,
    color: '#000',
  },
  separator: {
    height: 1,
    backgroundColor: 'rgba(0,0,0,0.05)',
    width: '100%',
    marginVertical: 12,
  },
  description: {
    fontFamily: Font.Inter_400Regular,
    fontSize: 12,
    lineHeight: 18,
    color: '#161616',
  },
  avatarRow: { flexDirection: 'row', alignItems: 'center', marginTop: 16 },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: '#fff',
  },
  activeUsersNumber: {
    marginLeft: 8,
    fontFamily: Font.IBMPlexSans_500Medium,
    fontSize: 14,
    color: '#000',
  },
  activeUsers: {
    marginLeft: 8,
    fontFamily: Font.IBMPlexSans_500Medium,
    fontSize: 13,
    color: '#7F7F7F',
  },
  ctaWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    paddingVertical: 8,
    paddingHorizontal: 30,
    //backgroundColor: colors.white,
  },
  rewardCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginTop: 20,
    borderRadius: 16,
    backgroundColor: '#fff',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },
  rewardImage: { width: 68, height: 68, borderRadius: 8 },
  rewardTitle: {
    fontFamily: Font.IBMPlexSans_600SemiBold,
    fontSize: 15,
    color: '#000',
  },
  rewardSubtitle: {
    fontFamily: Font.IBMPlexSans_400Regular,
    fontSize: 11,
    color: '#626262',
    marginTop: 2,
  },
  rewardPointsBox: {
    justifyContent: 'center',
    //alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 12,
    backgroundColor: '#6549ef',
    borderRadius: 10,
    height: 68,
  },
  rewardPointsLabel: {
    fontFamily: Font.IBMPlexSans_400Regular,
    fontSize: 12,
    color: '#fff',
  },
  rewardPoints: {
    fontFamily: Font.IBMPlexSans_700Bold,
    fontSize: 15,
    color: '#fff',
  },
  pts: {
    fontFamily: Font.IBMPlexSans_400Regular,
    fontSize: 11,
  },
  testimonialCard: { marginTop: 24, borderRadius: 16, padding: 16 },
});

export default ChallengeDetailScreen;
