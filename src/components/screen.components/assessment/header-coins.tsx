import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Font } from '@/lib';

interface Props {
  coins: number;
}

const HeaderCoins: React.FC<Props> = ({ coins }) => {
  return (
    <View style={styles.coinContainer}>
      <Text style={styles.coinText}>₹ {coins}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  coinContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingVertical: 2,
    backgroundColor: '#6B4AEA',
    borderRadius: 20,
    marginRight: 8,
    marginLeft: 8,
  },
  coinText: {
    fontSize: 16,
    fontFamily: Font.IBMPlexSans_600SemiBold,
    color: '#fff',
  },
});

export default HeaderCoins;
