import type { LabelProps } from '@ptomasroos/react-native-multi-slider';
import React from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';

import { Font } from '@/lib';

const AnimatedView = Animated.createAnimatedComponent(View);

const width = 25;
const pointerWidth = width * 0.47;

function LabelBase(props: {
  position: number;
  value: number;
  pressed: boolean;
}) {
  const { position, value } = props;
  //const scaleValue = React.useRef(new Animated.Value(0.1));

  // React.useEffect(() => {
  //   Animated.timing(scaleValue.current, {
  //     toValue: pressed ? 1 : 0.1,
  //     duration: 200,
  //     delay: pressed ? 0 : 2000,
  //     useNativeDriver: false,
  //   }).start();
  // }, [pressed]);

  return (
    Number.isFinite(position) &&
    Number.isFinite(value) && (
      <AnimatedView
        style={[
          styles.sliderLabel,
          {
            left: position - width / 2,
            top: 40, // place below the slider
            //transform: [{ scale: scaleValue.current }],
          },
        ]}
      >
        <View style={styles.pointer} />
        <Text style={styles.sliderLabelText}>{value}</Text>
      </AnimatedView>
    )
  );
}

export default function CustomLabel({
  oneMarkerValue,
  twoMarkerValue,
  oneMarkerLeftPosition,
  twoMarkerLeftPosition,
  oneMarkerPressed,
  twoMarkerPressed,
}: LabelProps) {
  return (
    <View style={styles.parentView}>
      <LabelBase
        position={oneMarkerLeftPosition}
        value={Number(oneMarkerValue)}
        pressed={oneMarkerPressed}
      />
      <LabelBase
        position={twoMarkerLeftPosition}
        value={Number(twoMarkerValue)}
        pressed={twoMarkerPressed}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  parentView: {
    position: 'relative',
  },
  sliderLabel: {
    position: 'absolute',
    justifyContent: 'center',
    width: width,
    height: width,
  },
  sliderLabelText: {
    textAlign: 'center',
    lineHeight: 20,
    borderRadius: width / 2,
    borderWidth: 2,
    borderColor: '#999',
    backgroundColor: '#fff',
    flex: 1,
    fontFamily: Font.IBMPlexSans_500Medium,
    fontSize: 14,
  },
  pointer: {
    position: 'absolute',
    top: -pointerWidth / 4, // since label is below, point up
    left: (width - pointerWidth) / 2,
    transform: [{ rotate: '45deg' }],
    width: pointerWidth,
    height: pointerWidth,
    backgroundColor: '#999',
  },
});
