// /components/RewardsCard.js
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { CoinBox } from '@/icons';
import { Font } from '@/lib';
import { rewards } from '@/mock/home-components-mock-data';

type Props = {
  coins: number;
};
export function RewardsCard({ coins }: Props) {
  return (
    <View style={styles.container}>
      <CoinBox width={60} height={60} />
      <Text style={styles.label}>My Rewards Points</Text>
      <Text style={styles.points}>{coins} NY</Text>
      <Text style={styles.goal}>Goal: {rewards.goal} NY</Text>
    </View>
  );
}

// export function RewardsCard() {
//   return (
//     <View style={styles.container}>
//       <CoinBox width={80} height={80} />
//       <View>
//         {/* <Text style={styles.label}>My Rewards Points</Text> */}
//         <Text style={styles.points1}>Rewards : {rewards.points}</Text>
//         <Text style={styles.goal1}>Goal: {rewards.goal}</Text>
//       </View>
//     </View>
//   );
// }

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  label: {
    fontFamily: Font.IBMPlexSans_600SemiBold,
    color: '#fff',
    fontSize: 23,
  },
  points: {
    fontFamily: Font.IBMPlexSans_700Bold,
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
  },
  goal: {
    color: '#EB8468',
    fontSize: 16,
    fontFamily: Font.IBMPlexSans_500Medium,
  },
  points1: {
    fontFamily: Font.IBMPlexSans_700Bold,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  goal1: {
    color: '#EB8468',
    fontSize: 16,
    fontFamily: Font.IBMPlexSans_500Medium,
  },
});
