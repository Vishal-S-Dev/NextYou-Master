// ProgressBar.tsx
import React from 'react';
import { Animated as RNAnimated, StyleSheet, View } from 'react-native';

type ProgressBarProps = { progress: RNAnimated.Value };

const ProgressBar: React.FC<ProgressBarProps> = ({ progress }) => {
  console.log('ProgressBar rendered', progress);
  const width = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });
  //console.log('Progress ::', progress);
  return (
    <View style={styles.container}>
      <RNAnimated.View style={[styles.bar, { width }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%', // ← explicit width so header can lay it out
    height: 8,
    backgroundColor: '#EAEAEA',
    borderRadius: 4,
    overflow: 'hidden',
  },
  bar: {
    height: '100%',
    backgroundColor: '#6B4AEA',
  },
});

export default ProgressBar;
