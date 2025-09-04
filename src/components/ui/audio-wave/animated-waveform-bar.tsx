import React from 'react';
import Animated, {
  type SharedValue,
  useAnimatedProps,
} from 'react-native-reanimated';
import { Rect } from 'react-native-svg';

type Props = {
  x: number;
  barWidth: number;
  sharedHeight: SharedValue<number>;
  containerHeight: number;
  barColor: string;
};

const AnimatedRect = Animated.createAnimatedComponent(Rect);

export const AnimatedWaveformBar: React.FC<Props> = ({
  x,
  barWidth,
  sharedHeight,
  containerHeight,
  barColor,
}) => {
  const animatedProps = useAnimatedProps(() => {
    const height = sharedHeight.value;
    const y = (containerHeight - height) / 2;
    return {
      height,
      y,
      fill: barColor,
    };
  });

  return (
    <AnimatedRect
      animatedProps={animatedProps}
      x={x}
      width={barWidth}
      rx={barWidth / 2}
    />
  );
};
