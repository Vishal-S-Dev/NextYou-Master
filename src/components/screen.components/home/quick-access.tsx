import { router } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import { Font } from '@/lib';
import { quickAccess } from '@/mock/home-components-mock-data';
import { type QuickAccess } from '@/types';

import QuickAccessListCard from './quick-access-list-card';

export function QuickAccessList() {
  const [selectedId, setSelectedId] = useState<string>('');

  const renderQuickAccessListCard = useCallback(
    ({ index, item }: { index: number; item: QuickAccess }) => (
      <QuickAccessListCard
        item={item}
        selected={item.id === selectedId}
        onPress={() => {
          setSelectedId(item.id);
          if (index === 2) {
            setTimeout(() => {
              router.push('/nutrition');
            }, 0); // 1000ms = 1 second delay
          }
        }}
      />
    ),
    [selectedId]
  );

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Quick Access</Text>
      <FlatList
        data={quickAccess}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderQuickAccessListCard}
        horizontal
        showsHorizontalScrollIndicator={false}
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
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: Font.IBMPlexSans_600SemiBold,
    color: '#fff',
    marginBottom: 8,
    marginHorizontal: 16,
  },
});
