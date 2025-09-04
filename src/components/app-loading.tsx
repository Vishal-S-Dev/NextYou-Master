import { LinearGradient } from 'expo-linear-gradient';
import React, { memo } from 'react';
import { ActivityIndicator } from 'react-native';

import { colors } from '@/lib';

const AppLoadingScreen = () => {
  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 0.9 }}
      colors={[colors.primary[500], colors.primary[500], '#2A1774']}
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <ActivityIndicator size="large" color="#fff" />
    </LinearGradient>
  );
};

export default memo(AppLoadingScreen);
