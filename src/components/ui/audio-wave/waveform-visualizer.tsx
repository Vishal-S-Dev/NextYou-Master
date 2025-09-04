/* eslint-disable react-hooks/rules-of-hooks */
// components/WaveformVisualizer.tsx
import React, { useRef, useState } from 'react';
import {
  type LayoutChangeEvent,
  Pressable,
  type StyleProp,
  Text,
  type TextStyle,
  View,
} from 'react-native';
import Animated, {
  type SharedValue,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import Svg from 'react-native-svg';

import { AnimatedWaveformBar } from './animated-waveform-bar';

type Props = {
  waveform: number[];
  barWidth: number;
  gap: number;
  color: string;
  progressColor: string;
  height: number;
  progress: SharedValue<number>;
  onSeek: (seekMillis: number) => void;
  duration: number | null;
  position: number;
  durationTextStyle?: StyleProp<TextStyle>;
};

const formatTime = (millis: number) => {
  const totalSeconds = Math.floor(millis / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

export const WaveformVisualizer: React.FC<Props> = ({
  waveform,
  barWidth,
  gap,
  color,
  progressColor,
  height,
  progress,
  onSeek,
  duration,
  position,
  durationTextStyle,
}) => {
  const [containerWidth, setContainerWidth] = useState(0);

  const minBarHeight = 10; // or 0.5 for thinner lines
  const animatedHeights = useRef(
    waveform.map((v) => useSharedValue(Math.max(v * height, minBarHeight)))
  ).current;

  const handleLayout = (event: LayoutChangeEvent) => {
    setContainerWidth(event.nativeEvent.layout.width);
  };

  const handleSeek = (event: any) => {
    if (!duration || !containerWidth) return;
    const { locationX } = event.nativeEvent;
    const seekFraction = Math.min(1, Math.max(0, locationX / containerWidth));
    const seekMillis = seekFraction * duration;
    onSeek(seekMillis);
  };

  const animatedOverlayStyle = useAnimatedStyle(() => ({
    width: containerWidth * progress.value,
  }));

  return (
    <View style={{ flex: 1 }} onLayout={handleLayout}>
      {containerWidth > 0 && (
        <Pressable onPress={handleSeek}>
          <View style={{ width: containerWidth, height }}>
            <Svg
              width={containerWidth}
              height={height}
              style={{ position: 'absolute' }}
            >
              {waveform.map((_, i) => (
                <AnimatedWaveformBar
                  key={`base-${i}`}
                  x={i * (barWidth + gap)}
                  barWidth={barWidth}
                  sharedHeight={animatedHeights[i]}
                  containerHeight={height}
                  barColor={color}
                />
              ))}
            </Svg>

            <Animated.View
              pointerEvents="none"
              style={[
                {
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  height,
                  overflow: 'hidden',
                },
                animatedOverlayStyle,
              ]}
            >
              <Svg width={containerWidth} height={height}>
                {waveform.map((_, i) => (
                  <AnimatedWaveformBar
                    key={`progress-${i}`}
                    x={i * (barWidth + gap)}
                    barWidth={barWidth}
                    sharedHeight={animatedHeights[i]}
                    containerHeight={height}
                    barColor={progressColor}
                  />
                ))}
              </Svg>
            </Animated.View>
          </View>
        </Pressable>
      )}

      <View
        style={{
          marginTop: 6,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <Text style={[{ fontSize: 14, color: '#555' }, durationTextStyle]}>
          {formatTime(position)}
        </Text>
        <Text style={[{ fontSize: 14, color: '#555' }, durationTextStyle]}>
          {duration != null ? formatTime(duration - position) : '--:--'}
        </Text>
      </View>
    </View>
  );
};
