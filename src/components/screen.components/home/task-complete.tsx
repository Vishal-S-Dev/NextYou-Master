// components/NextyouLogo.tsx
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

export const TaskComplete = () => {
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
      <View>
        <Text style={styles.text}>Well done!</Text>
        <Text>You have completed todays Task</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 16,
    paddingHorizontal: 16,
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
