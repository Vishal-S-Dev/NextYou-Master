import type { LabelProps } from '@ptomasroos/react-native-multi-slider';
import React from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';

const AnimatedView = Animated.createAnimatedComponent(View);

const width = 50;
const pointerWidth = width * 0.47;

function LabelBase(props: {
  position: number;
  value: number;
  //leftDiff?: number;
  pressed: boolean;
}) {
  const { position, value, pressed } = props;
  const scaleValue = React.useRef(new Animated.Value(0.1));

  React.useEffect(() => {
    Animated.timing(scaleValue.current, {
      toValue: pressed ? 1 : 0.1,
      duration: 200,
      delay: pressed ? 0 : 2000,
      useNativeDriver: false,
    }).start();
  }, [pressed]);

  return (
    Number.isFinite(position) &&
    Number.isFinite(value) && (
      <AnimatedView
        style={[
          styles.sliderLabel,
          {
            left: position - width / 2,
            transform: [
              { translateY: width - 20 },
              { scale: scaleValue.current },
              { translateY: -width },
            ],
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
  //leftDiff = 0,
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
        //leftDiff={leftDiff}
        pressed={oneMarkerPressed}
      />
      <LabelBase
        position={twoMarkerLeftPosition}
        value={Number(twoMarkerValue)}
        //leftDiff={leftDiff}
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
    bottom: '100%',
    width: width,
    height: width,
  },
  sliderLabelText: {
    textAlign: 'center',
    lineHeight: width,
    borderRadius: width / 2,
    borderWidth: 2,
    borderColor: '#999',
    backgroundColor: '#fff',
    flex: 1,
    fontSize: 18,
    color: '#aaa',
  },
  pointer: {
    position: 'absolute',
    bottom: -pointerWidth / 4,
    left: (width - pointerWidth) / 2,
    transform: [{ rotate: '45deg' }],
    width: pointerWidth,
    height: pointerWidth,
    backgroundColor: '#999',
  },
});
