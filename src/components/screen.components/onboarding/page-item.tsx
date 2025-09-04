import React, { useState } from 'react';
import { Text } from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  runOnJS,
  type SharedValue,
  useAnimatedStyle,
  useDerivedValue,
} from 'react-native-reanimated';

import { type DataItem } from '@/types';

type Props = {
  data: DataItem[];
  x: SharedValue<number>;
  flatListIndex: SharedValue<number>;
  screenWidth: number;
};

const PageItem = ({ data, x, flatListIndex, screenWidth }: Props) => {
  const [item, setItem] = useState<DataItem>(data[0]);
  const textAnimationStyle = useAnimatedStyle(() => {
    const opacityAnimation = interpolate(
      x.value,
      [
        (flatListIndex.value - 1) * screenWidth,
        flatListIndex.value * screenWidth,
        (flatListIndex.value + 1) * screenWidth,
      ],
      [0, 1, 0],
      Extrapolation.CLAMP
    );
    const translateYAnimation = interpolate(
      x.value,
      [
        (flatListIndex.value - 1) * screenWidth,
        flatListIndex.value * screenWidth,
        (flatListIndex.value + 1) * screenWidth,
      ],
      [100, 0, 100],
      Extrapolation.CLAMP
    );

    return {
      opacity: opacityAnimation,
      transform: [{ translateY: translateYAnimation }],
    };
  });

  useDerivedValue(() => {
    const index = flatListIndex.value;
    const currentItem = data[index];
    runOnJS(setItem)(currentItem);
  }, [flatListIndex]);

  return (
    <Animated.View style={textAnimationStyle}>
      <Text className="text-center font-ibm-semibold text-[25px] color-white">
        {item.title}
      </Text>
      <Text className="text-center font-inter text-base color-white">
        {item.text}
      </Text>
    </Animated.View>
  );
};

export default PageItem;
