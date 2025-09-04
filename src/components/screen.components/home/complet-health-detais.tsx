// components/NextyouLogo.tsx
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

import { Button } from '@/components/ui';

export const CompleteHealth = () => {
  return (
    <View style={styles.container}>
      <Svg height="24" width="24" viewBox="0 0 24 24" style={styles.icon}>
        <Circle cx="12" cy="12" r="12" fill="#6C3EFF" />
        <Path
          d="M9 12.5l2 2.5 4-6"
          fill="none"
          stroke="#fff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* White checkmark */}
      </Svg>
      <View className="flex-1">
        <Text style={styles.text}>Well-come!</Text>
        <Text>Please complete your health data </Text>
      </View>
      <Button label="Complete" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  icon: {
    marginRight: 8,
  },
  text: {
    fontSize: 20,
    color: '#000',
    fontWeight: '600',
  },
});
