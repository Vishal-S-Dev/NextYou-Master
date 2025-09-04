import React, { useEffect, useRef, useState } from 'react';
import { Animated, type StyleProp, type ViewStyle } from 'react-native';

import CircularProgress from './circular-progress';

interface AnimatedCircularProgressProps {
  style?: StyleProp<ViewStyle>;
  size: number;
  fill?: number;
  prefill?: number;
  width: number;
  tintColor?: string;
  backgroundColor?: string;
  tension?: number;
  friction?: number;
  rotation?: number;
  linecap?: 'butt' | 'round' | 'square';
  children?: React.ReactNode;
  gradientSteps: string[];
}

const AnimatedCircularProgress: React.FC<AnimatedCircularProgressProps> = ({
  fill = 0,
  prefill = 0,
  tension = 7,
  friction = 10,
  ...props
}) => {
  const chartFillAnimation = useRef(new Animated.Value(prefill)).current;
  const [currentFill, setCurrentFill] = useState(prefill);

  useEffect(() => {
    const animation = Animated.spring(chartFillAnimation, {
      toValue: fill,
      useNativeDriver: false, // required for non-layout values like 'fill'
      tension,
      friction,
    });

    animation.start();

    const listenerId = chartFillAnimation.addListener(({ value }) => {
      setCurrentFill(value);
    });

    return () => {
      chartFillAnimation.removeListener(listenerId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fill, tension, friction]);

  return <CircularProgress {...props} fill={currentFill} />;
  // return <CircularProgressBar {...props} fill={currentFill} />;
};

export default AnimatedCircularProgress;
