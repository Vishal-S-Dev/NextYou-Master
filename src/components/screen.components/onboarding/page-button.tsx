import React from 'react';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Animated, {
  type SharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

import { colors, Font } from '@/lib';

type Props = {
  flatListRef: any;
  flatListIndex: SharedValue<number>;
  dataLength: number;
  getStarted?: () => void;
};
//const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const PageButton = ({
  flatListRef,
  flatListIndex,
  dataLength,
  getStarted = () => {},
}: Props) => {
  //const navigation = useNavigation();
  const nextTextAnimationStyle = useAnimatedStyle(() => {
    return {
      opacity:
        flatListIndex.value === dataLength - 1 ? withTiming(0) : withTiming(1),
      transform: [
        {
          translateX:
            flatListIndex.value === dataLength - 1
              ? withTiming(100)
              : withTiming(0),
        },
      ],
    };
  });
  const getStartedTextAnimationStyle = useAnimatedStyle(() => {
    return {
      opacity:
        flatListIndex.value === dataLength - 1 ? withTiming(1) : withTiming(0),
      transform: [
        {
          translateX:
            flatListIndex.value === dataLength - 1
              ? withTiming(0)
              : withTiming(-100),
        },
      ],
    };
  });
  const onPressButton = () => {
    if (flatListIndex.value < dataLength - 1) {
      flatListRef.current.scrollToIndex({ index: flatListIndex.value + 1 });
    } else {
      getStarted();
    }
  };
  return (
    <TouchableWithoutFeedback onPress={onPressButton}>
      <Animated.View style={[styles.btn]}>
        <Animated.Text
          style={[styles.textButton, getStartedTextAnimationStyle]}
        >
          Get Started
        </Animated.Text>
        <Animated.Text style={[styles.textButton, nextTextAnimationStyle]}>
          Next
        </Animated.Text>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export default PageButton;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'orange',
    padding: 10,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },

  textButton: {
    color: colors.primary[400],
    fontSize: 16,
    fontFamily: Font.Inter_500Medium,
    //fontWeight: '700',
    position: 'absolute',
    flex: 1,
  },

  btn: {
    flex: 1,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.primary[400],
    paddingHorizontal: 20,
    width: '100%',
  },
});
