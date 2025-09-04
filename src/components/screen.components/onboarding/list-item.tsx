import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, useWindowDimensions, View } from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  runOnJS,
  type SharedValue,
  useAnimatedStyle,
  useDerivedValue,
} from 'react-native-reanimated';
import Video from 'react-native-video';

import { type DataItem } from '@/types';

type Props = {
  item: DataItem;
  index: number;
  x: SharedValue<number>;
};

const ListItem = ({ item, index, x }: Props) => {
  const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = useWindowDimensions();

  // ↑ 1. SAME animation you already had
  const mediaAnimationStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      x.value,
      [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH,
      ],
      [0, 1, 0],
      Extrapolation.CLAMP
    );
    const translateY = interpolate(
      x.value,
      [
        (index - 1) * SCREEN_WIDTH,
        index * SCREEN_WIDTH,
        (index + 1) * SCREEN_WIDTH,
      ],
      [100, 0, 100],
      Extrapolation.CLAMP
    );
    return {
      opacity,
      transform: [{ translateY }],
    };
  });

  /**
   * 2. Play/pause optimisation
   *    We don’t want *all* videos playing off‑screen.
   */
  const [paused, setPaused] = useState(true);

  // derived value flips to true only when this item is centred
  const isActive = useDerivedValue(
    () =>
      x.value >= (index - 0.5) * SCREEN_WIDTH &&
      x.value <= (index + 0.5) * SCREEN_WIDTH
  );

  // sync derived value with React state (imperative video prop)
  useEffect(() => {
    const toggle = (v: boolean) => setPaused(!v);
    isActive.value && runOnJS(toggle)(true);
    !isActive.value && runOnJS(toggle)(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive]);

  // 3. Helper to render correct media component
  const renderMedia = useCallback(() => {
    if (item.type === 'video') {
      return (
        <Video
          source={item.source as any}
          style={StyleSheet.absoluteFill}
          resizeMode="cover"
          repeat
          muted={false}
          paused={paused}
          // iOS
          ignoreSilentSwitch="obey"
          // Android
          playInBackground={false}
          playWhenInactive={false}
        />
      );
    }

    // image branch
    return (
      <Animated.Image
        source={item.source as any}
        style={[
          StyleSheet.absoluteFill,
          { width: SCREEN_WIDTH, height: SCREEN_HEIGHT },
        ]}
        resizeMode="cover"
      />
    );
  }, [item, paused, SCREEN_HEIGHT, SCREEN_WIDTH]);

  return (
    <View
      style={[
        styles.itemContainer,
        { width: SCREEN_WIDTH, height: SCREEN_HEIGHT },
      ]}
    >
      <Animated.View style={[StyleSheet.absoluteFill, mediaAnimationStyle]}>
        {renderMedia()}
      </Animated.View>
    </View>
  );
};

export default React.memo(ListItem);

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    backgroundColor: 'black',
  },
});
