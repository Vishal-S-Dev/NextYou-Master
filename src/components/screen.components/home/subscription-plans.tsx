// /components/SubscriptionPlans.js
import { router } from 'expo-router';
import React, { useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import { Font } from '@/lib';
import { type ChallengeDetails } from '@/types/user';

import SubscriptionPlansListCard from './subscription-plans-list-card';

type Props = {
  subscription: ChallengeDetails[];
};

export function SubscriptionPlans({ subscription }: Props) {
  // const [selectedId, setSelectedId] = useState<string>('');

  const renderSubscriptionPlanListCard = useCallback(
    ({ item }: { item: ChallengeDetails }) => (
      <SubscriptionPlansListCard
        item={item}
        selected={item.isActive}
        onPress={() => {
          //setSelectedId(item.id);
          router.push(
            `/challenges/${item.challenge._id}?isActive=${item.isActive}`
          );
        }}
      />
    ),
    []
  );

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={[styles.sectionTitle]}>Subscription Plans</Text>
        <Text style={[styles.sectionSubTitle]}>
          You have {subscription.length} plans in purchase
        </Text>
      </View>
      <FlatList
        data={subscription}
        keyExtractor={(item) => item.challenge._id.toString()}
        renderItem={renderSubscriptionPlanListCard}
        horizontal
        showsHorizontalScrollIndicator={false}
        nestedScrollEnabled={true}
        keyboardShouldPersistTaps="handled"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    paddingHorizontal: 8,
    //backgroundColor: 'gray',
  },
  titleContainer: {
    paddingHorizontal: 8,
    marginBottom: 8,
  },
  sectionTitle: {
    fontFamily: Font.IBMPlexSans_600SemiBold,
    fontSize: 18,
    color: '#000',
  },
  sectionSubTitle: {
    fontFamily: Font.IBMPlexSans_400Regular,
    fontSize: 13,
    color: '#000',
  },
});
