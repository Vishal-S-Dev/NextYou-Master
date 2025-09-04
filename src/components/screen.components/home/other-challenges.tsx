import { router } from 'expo-router';
import React, { useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import { Font } from '@/lib';
import { useChallengesStore } from '@/store/use-challenge-store';
import { type Challenge } from '@/types';

import OtherChallengesCard from './other-challenges-list-card';

export function OtherChallenges() {
  const { challenges } = useChallengesStore();

  const renderOtherChallengesListCard = useCallback(
    ({ item }: { item: Challenge }) => (
      <OtherChallengesCard
        item={item}
        onPress={() => {
          router.push(`/challenges/${item._id}`);
        }}
      />
    ),
    []
  );

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Other Challenges</Text>

      <FlatList
        data={challenges}
        keyExtractor={(item) => item._id}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={renderOtherChallengesListCard}
        nestedScrollEnabled={true}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ paddingHorizontal: 8 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    //marginVertical: 16,
    //paddingHorizontal: 16,
    backgroundColor: '#13093D',
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: Font.IBMPlexSans_600SemiBold,
    color: '#fff',
    marginBottom: 8,
    marginHorizontal: 16,
  },
});
