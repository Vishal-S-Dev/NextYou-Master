import React, { useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import { Font } from '@/lib';
import { pastSessions } from '@/mock/home-components-mock-data';
import { type PastSession } from '@/types';

import PastSessionsListCard from './past-sessions-list-card';

export function PastSessions() {
  const renderOtherChallengesListCard = useCallback(
    ({ item }: { item: PastSession }) => (
      <PastSessionsListCard item={item} onPress={() => {}} />
    ),
    []
  );

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Past Sessions</Text>
      <FlatList
        data={pastSessions}
        keyExtractor={(item) => item.id}
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
