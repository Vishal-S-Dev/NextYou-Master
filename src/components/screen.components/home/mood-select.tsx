/* eslint-disable react-hooks/exhaustive-deps */
import { LinearGradient } from 'expo-linear-gradient';
import React, { useCallback, useEffect, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { Easing } from 'react-native-reanimated';

export const moods = [
  { label: 'Excited', emoji: '😃' },
  { label: 'Happy', emoji: '😇' },
  { label: 'Normal', emoji: '😊' },
  { label: 'Angry', emoji: '😡' },
  { label: 'Tired', emoji: '😐' },
  { label: 'Sad', emoji: '😔' },
];

type Props = {
  selectedMood?: number;
  sliderHeight?: number;
  thumbSize?: number;
  onChange?: (value: number, mood: string) => void;
};

export default function MoodSelectorCard({
  selectedMood = 0,
  sliderHeight = 300,
  thumbSize = 24,
  onChange,
}: Props) {
  const [selectedIndex, setSelectedIndex] = useState<number>(selectedMood); // Sad = 0
  const selectedIndexAnimated = useSharedValue(0);
  const moodHeight = sliderHeight / moods.length;

  const getThumbTranslateY = (index: number) =>
    index * moodHeight + moodHeight / 2 - thumbSize / 2;

  const translateY = useSharedValue(
    getThumbTranslateY(moods.length - 1 - selectedIndex)
  );
  const fillHeight = useSharedValue(
    ((selectedIndex + 1) / moods.length) * sliderHeight
  );
  const contextY = useSharedValue(0);

  useEffect(() => {
    translateY.value = withSoftTiming(
      getThumbTranslateY(getInvertedIndex(selectedIndex))
    );
    fillHeight.value = withSoftTiming(
      ((selectedIndex + 1) / moods.length) * sliderHeight
    );
    selectedIndexAnimated.value = selectedIndex;
    onChange?.(selectedIndex, moods[selectedIndex].label);
  }, []);

  const onSnap = (index: number) => {
    selectedIndexAnimated.value = withSoftTiming(index);
    setSelectedIndex(index);
    onChange?.(index, moods[index].label);
  };

  const withSoftTiming = (toValue: number) => {
    'worklet';
    return withTiming(toValue, {
      duration: 300,
      easing: Easing.out(Easing.cubic),
    });
  };

  const panGesture = Gesture.Pan()
    .onStart(() => {
      contextY.value = translateY.value;
    })
    .onUpdate((event) => {
      const newY = contextY.value + event.translationY;
      const minY = thumbSize / 2;
      const maxY = sliderHeight - thumbSize / 2;
      const clampedCenterY = Math.max(
        minY,
        Math.min(newY + thumbSize / 2, maxY)
      );
      translateY.value = clampedCenterY - thumbSize / 2;
    })
    .onEnd((event) => {
      const centerY =
        event.translationY > 0
          ? translateY.value + thumbSize / 2
          : translateY.value - (thumbSize + thumbSize / 2);

      const rawIndex = Math.round(centerY / moodHeight);
      const clamped = Math.max(0, Math.min(rawIndex, moods.length - 1));
      const finalIndex = moods.length - 1 - clamped;

      const snappedY = clamped * moodHeight + moodHeight / 2 - thumbSize / 2;

      translateY.value = withSoftTiming(snappedY);
      fillHeight.value = withSoftTiming(
        ((finalIndex + 1) / moods.length) * sliderHeight
      );
      runOnJS(onSnap)(finalIndex);
    });

  const thumbStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const fillStyle = useAnimatedStyle(() => ({
    height: fillHeight.value,
  }));

  const getInvertedIndex = useCallback(
    (index: number) => moods.length - 1 - index,
    []
  );

  return (
    <View style={[styles.sliderWrapper, { height: sliderHeight }]}>
      {/* Labels */}
      <View style={styles.labelsContainer}>
        {moods.map((mood, index) => {
          const logicalIndex = getInvertedIndex(index);
          return (
            <MoodItem
              key={index}
              mood={mood}
              index={logicalIndex}
              selectedIndexAnimated={selectedIndexAnimated}
              moodHeight={moodHeight}
              onPress={() => {
                onSnap(logicalIndex);
                translateY.value = withSoftTiming(getThumbTranslateY(index));
                fillHeight.value = withSoftTiming(
                  ((logicalIndex + 1) / moods.length) * sliderHeight
                );
              }}
            />
          );
        })}
      </View>

      {/* Track + Thumb */}
      <View style={styles.trackContainer}>
        <LinearGradient
          colors={['#D9D9F3', '#7028E4']}
          style={styles.sliderTrack}
          start={{ x: 0.5, y: 0.3 }}
          end={{ x: 0.5, y: 1 }}
        />
        <Animated.View style={[styles.sliderFill, fillStyle]} />

        <GestureDetector gesture={panGesture}>
          <Animated.View style={styles.gestureArea}>
            <Animated.View
              style={[
                styles.sliderThumb,
                {
                  width: thumbSize,
                  height: thumbSize,
                  borderRadius: thumbSize / 2,
                },
                thumbStyle,
              ]}
            />
          </Animated.View>
        </GestureDetector>
      </View>

      {/* Emojis */}
      <View style={styles.emojiContainer}>
        {moods.map((mood, index) => {
          const logicalIndex = getInvertedIndex(index);
          return (
            <MoodItem
              key={index}
              mood={mood}
              index={logicalIndex}
              selectedIndexAnimated={selectedIndexAnimated}
              moodHeight={moodHeight}
              isEmoji
              onPress={() => {
                onSnap(logicalIndex);
                translateY.value = withSoftTiming(getThumbTranslateY(index));
                fillHeight.value = withSoftTiming(
                  ((logicalIndex + 1) / moods.length) * sliderHeight
                );
              }}
            />
          );
        })}
      </View>
    </View>
  );
}

const MoodItem = ({
  mood,
  index,
  selectedIndexAnimated,
  onPress,
  moodHeight,
  isEmoji,
}: {
  mood: { label: string; emoji: string };
  index: number;
  selectedIndexAnimated: Animated.SharedValue<number>;
  onPress: () => void;
  moodHeight: number;
  isEmoji?: boolean;
}) => {
  const animatedStyle = useAnimatedStyle(() => {
    const isSelected = selectedIndexAnimated.value === index;
    return {
      transform: [{ scale: withSpring(isSelected ? 1.1 : 1) }],
      color: isSelected ? 'black' : '#999',
      fontWeight: isSelected ? '600' : '400',
      fontSize: withSpring(isSelected ? 18 : 12),
    };
  });

  return (
    <Pressable onPress={onPress} style={[styles.mood, { height: moodHeight }]}>
      <Animated.Text
        style={[isEmoji ? styles.emoji : styles.label, animatedStyle]}
      >
        {isEmoji ? mood.emoji : mood.label}
      </Animated.Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    width: '90%',
  },

  sliderWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  labelsContainer: {
    flex: 1,
    marginRight: 20,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  mood: {
    justifyContent: 'center',
  },
  label: {
    fontSize: 12,
    color: '#999',
  },
  activeLabel: {
    color: 'black',
    fontWeight: '600',
    fontSize: 18,
  },
  trackContainer: {
    width: 24,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  sliderTrack: {
    width: 6,
    height: '100%',
    borderRadius: 3,
  },
  gestureArea: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    alignItems: 'center',
    zIndex: 10,
  },
  sliderFill: {
    position: 'absolute',
    bottom: 0,
    width: 6,
    backgroundColor: '#7028E4',
    borderRadius: 3,
  },
  sliderThumb: {
    position: 'absolute',
    backgroundColor: 'white',
    borderWidth: 3,
    borderColor: '#7028E4',
    zIndex: 10,
  },
  emojiContainer: {
    flex: 1,
    marginLeft: 20,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  emoji: {
    fontSize: 16,
    textAlign: 'center',
  },
});
