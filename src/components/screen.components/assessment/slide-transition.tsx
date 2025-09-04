import React, { type ReactNode, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

type SlideTransitionProps = {
  children: ReactNode;
  direction?: 'forward' | 'backward';
  trigger: number | string;
};

const SlideTransition: React.FC<SlideTransitionProps> = ({
  children,
  direction = 'forward',
  trigger,
}) => {
  const translateX = useSharedValue(0);

  useEffect(() => {
    translateX.value = direction === 'forward' ? 300 : -300;
    translateX.value = withTiming(0, { duration: 300 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      {children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default SlideTransition;
