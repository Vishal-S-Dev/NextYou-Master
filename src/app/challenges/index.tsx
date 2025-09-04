// RecommendedChallengeScreen.tsx
// React Native + TypeScript screen with a SectionList implementation
// -----------------------------------------------------------------------------
// External deps (Expo friendly):
//   - expo-linear-gradient (for gradient button background)
//   - @expo/vector-icons (Ionicons & Feather)
//   - react-native-safe-area-context (SafeAreaView)
// Install:
//   expo install expo-linear-gradient @expo/vector-icons react-native-safe-area-context

import { FlashList } from '@shopify/flash-list';
import { router } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
  ChallengeCard,
  TrialButton,
} from '@/components/screen.components/recommended';
import { FocusAwareStatusBar } from '@/components/ui';
import { colors, Font } from '@/lib';
import { useChallengesStore } from '@/store/use-challenge-store';
import { type Challenge } from '@/types';

// interface ChallengeSection {
//   title: string; // Section header label
//   data: Challenge[]; // Items
//   isRecommended: boolean; // Flag to style header differently
// }

interface Props {}

const ITEM_SPACING = 20;

//---------------------------------------------------------------------
// Component
//---------------------------------------------------------------------
const RecommendedChallengeScreen: React.FC<Props> = () => {
  const insets = useSafeAreaInsets();
  const statusBarHeight = insets.top + 8;
  const bottomHeight = Platform.OS === 'android' ? 20 : insets.bottom;

  const [selectedId, setSelectedId] = useState<string | null>(null);

  const { challenges, fetchChallenges } = useChallengesStore();

  useEffect(() => {
    fetchChallenges(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onPressStart = () => {
    router.push({
      pathname: '/day-0',
      params: {
        challengeId: selectedId,
      },
    });
  };

  const itemSeparator = <View style={styles.itemSeparator} />; // constant

  // Render individual challenge card
  const renderChallenge = useCallback(
    ({ item }: { item: Challenge }) => (
      <ChallengeCard
        item={item}
        selected={item._id === selectedId}
        onPress={() => {
          setSelectedId(item._id);
          router.push(`/challenges/${item._id}`);
        }}
        onSelect={() => {
          setSelectedId(item._id);
        }}
      />
    ),
    [selectedId]
  );

  return (
    <View style={styles.container}>
      <FocusAwareStatusBar style="dark" />
      <View
        style={{
          flex: 1,
          paddingTop: statusBarHeight,
          paddingHorizontal: 16,
        }}
      >
        {/* header */}
        <View style={styles.headerRow}>
          <Text style={styles.headerTitle}>Recommended Challenge</Text>
        </View>

        <Text style={styles.description}>
          You've checked off multiple signs of gut dysfunction — bloating, poop
          irregularities, and brain fog — Let's target your gut health which
          will eventually also help your energy and brain fog.
        </Text>

        <FlashList
          data={challenges}
          keyExtractor={(item) => item._id}
          renderItem={renderChallenge}
          ItemSeparatorComponent={() => itemSeparator}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingTop: 8,
            paddingBottom: 24,
            paddingHorizontal: 8,
          }}
          removeClippedSubviews
          estimatedItemSize={80}
          extraData={selectedId}
        />
        {/* CTA button */}
        <View style={[styles.ctaWrapper, { marginBottom: bottomHeight }]}>
          <TrialButton
            onPress={onPressStart}
            disabled={challenges.length === 0 || selectedId === null}
          />
        </View>
      </View>
    </View>
  );
};

//---------------------------------------------------------------------
// Styles
//---------------------------------------------------------------------

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  headerTitle: {
    fontFamily: Font.IBMPlexSans_600SemiBold,
    fontSize: 22,
    textAlign: 'center',
    color: '#000000',
  },
  description: {
    fontFamily: Font.Inter_400Regular,
    fontSize: 12,
    textAlign: 'center',
    color: '#4F4F4F',
    lineHeight: 20,
    marginBottom: 24,
  },

  otherHeader: {
    fontSize: 15,
    fontWeight: '600',
    color: '#E28D7C',
    marginVertical: 16,
    textAlign: 'center',
  },
  ctaWrapper: {
    paddingHorizontal: 8,
    marginBottom: 20,
  },

  itemSeparator: {
    height: ITEM_SPACING,
  },
});

export default RecommendedChallengeScreen;
