import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, type ViewProps } from 'react-native';

type GradientWrapperProps = ViewProps & {
  children: React.ReactElement;
  colors?: [string, string, ...string[]];
};

export const GradientWrapper: React.FC<GradientWrapperProps> = ({
  children,
  colors = ['#4A3AFF', '#753AFF'],
  style,
}) => (
  <LinearGradient
    colors={colors}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 0 }}
    style={[styles.gradient, style]}
  >
    {children}
  </LinearGradient>
);

const styles = StyleSheet.create({
  gradient: {
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
  },
});
