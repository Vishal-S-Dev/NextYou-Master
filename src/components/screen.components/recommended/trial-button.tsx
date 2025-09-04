import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

import { GradientWrapper } from '@/components/ui';
import { Font } from '@/lib';

interface TrialButtonProps {
  onPress: () => void;
  disabled?: boolean;
}

export const TrialButton: React.FC<TrialButtonProps> = ({
  onPress,
  disabled,
}) => {
  return (
    <GradientWrapper style={styles.gradientWrapper}>
      <Pressable
        style={[styles.ctaButton, disabled && { backgroundColor: 'gray' }]}
        android_ripple={{ color: 'rgba(0,0,0,0.1)' }}
        onPress={onPress}
        disabled={disabled}
      >
        <Text style={styles.ctaText}>Start Free 3 days Trial</Text>
      </Pressable>
    </GradientWrapper>
  );
};

const styles = StyleSheet.create({
  gradientWrapper: {
    paddingHorizontal: 0,
    overflow: 'hidden',
  },
  ctaButton: {
    height: 50,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  ctaText: {
    fontFamily: Font.Inter_600SemiBold,
    fontSize: 16,
    color: '#FFFFFF',
  },
});
