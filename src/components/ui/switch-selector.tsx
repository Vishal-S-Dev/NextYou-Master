/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable max-lines-per-function */
import React, {
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  Animated,
  Easing,
  type GestureResponderEvent,
  I18nManager,
  Image,
  type ImageStyle,
  PanResponder,
  type PanResponderGestureState,
  type PanResponderInstance,
  Text,
  type TextStyle,
  TouchableOpacity,
  View,
  type ViewStyle,
} from 'react-native';

export type Option = {
  label: string;
  value: any;
  imageIcon?: any;
  customIcon?: ReactNode | ((isSelected: boolean) => ReactNode);
  accessibilityLabel?: string;
  testID?: string;
  activeColor?: string;
};

type Props = {
  style?: ViewStyle | ViewStyle[];
  textStyle?: TextStyle;
  selectedTextStyle?: TextStyle;
  textContainerStyle?: ViewStyle;
  selectedTextContainerStyle?: ViewStyle;
  imageStyle?: ImageStyle;
  options: Option[];
  textColor?: string;
  selectedColor?: string;
  fontSize?: number;
  backgroundColor?: string;
  borderColor?: string;
  borderRadius?: number;
  borderWidth?: number;
  hasPadding?: boolean;
  valuePadding?: number;
  height?: number;
  bold?: boolean;
  buttonMargin?: number;
  buttonColor?: string;
  returnObject?: boolean;
  animationDuration?: number;
  disabled?: boolean;
  disableValueChangeOnPress?: boolean;
  initial?: number;
  value?: number;
  onPress?: (value: any) => void;
  accessibilityLabel?: string;
  testID?: string;
};

const styles = {
  button: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  } as ViewStyle,
  animated: {
    borderWidth: 0,
    position: 'absolute',
  } as ViewStyle,
};

const SwitchSelector: React.FC<Props> = ({
  style = {},
  textStyle = {},
  selectedTextStyle = {},
  textContainerStyle = {},
  selectedTextContainerStyle = {},
  imageStyle = {},
  options = [],
  textColor = '#000000',
  selectedColor = '#FFFFFF',
  fontSize = 14,
  backgroundColor = '#FFFFFF',
  borderColor = '#C9C9C9',
  borderRadius = 50,
  borderWidth = 1,
  hasPadding = false,
  valuePadding = 1,
  height = 40,
  bold = false,
  buttonMargin = 0,
  buttonColor = '#BCD635',
  returnObject = false,
  animationDuration = 100,
  disabled = false,
  disableValueChangeOnPress = false,
  initial = -1,
  value = 1,
  onPress = null,
  accessibilityLabel = null,
  testID = null,
}) => {
  const [selected, setSelected] = useState<number>(initial);
  const [sliderWidth, setSliderWidth] = useState<number | null>(null);

  const animatedValue = useRef(
    new Animated.Value(
      initial !== -1
        ? I18nManager.isRTL
          ? -(initial / options.length)
          : initial / options.length
        : 0
    )
  ).current;

  useEffect(() => {
    if (value !== selected && !disableValueChangeOnPress) {
      toggleItem(value, true);
    }
  }, [value]);

  const animate = (to: number, from: number) => {
    animatedValue.setValue(from);
    Animated.timing(animatedValue, {
      toValue: to,
      duration: animationDuration,
      easing: Easing.cubic,
      useNativeDriver: true,
    }).start();
  };

  const toggleItem = useCallback(
    (index: number, callOnPress = true) => {
      if (options.length <= 1 || index == null || isNaN(index)) return;
      animate(
        I18nManager.isRTL ? -(index / options.length) : index / options.length,
        I18nManager.isRTL
          ? -(selected / options.length)
          : selected / options.length
      );
      if (callOnPress && onPress) {
        onPress(returnObject ? options[index] : options[index].value);
      }
      setSelected(index);
    },
    [options, selected, onPress, returnObject]
  );

  const getSwipeDirection = (
    gestureState: PanResponderGestureState
  ): 'LEFT' | 'RIGHT' | null => {
    const { dx, dy, vx } = gestureState;
    if (Math.abs(vx) > 0.1 && Math.abs(dy) < 80) {
      return dx > 0 ? 'RIGHT' : 'LEFT';
    }
    return null;
  };

  const getBgColor = (): string => {
    if (selected === -1) return 'transparent';
    return options[selected].activeColor || buttonColor;
  };

  const responderEnd = (
    evt: GestureResponderEvent,
    gestureState: PanResponderGestureState
  ) => {
    if (disabled) return;
    const swipeDirection = getSwipeDirection(gestureState);
    if (swipeDirection === 'RIGHT' && selected < options.length - 1) {
      toggleItem(selected + 1);
    } else if (swipeDirection === 'LEFT' && selected > 0) {
      toggleItem(selected - 1);
    }
  };

  const shouldSetResponder = (
    evt: GestureResponderEvent,
    gestureState: PanResponderGestureState
  ) =>
    evt.nativeEvent.touches.length === 1 &&
    !(Math.abs(gestureState.dx) < 5 && Math.abs(gestureState.dy) < 5);

  const panResponder: PanResponderInstance = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: shouldSetResponder,
      onMoveShouldSetPanResponder: shouldSetResponder,
      onPanResponderRelease: responderEnd,
      onPanResponderTerminate: responderEnd,
    })
  ).current;

  const optionsMap = options.map((element, index) => {
    const isSelected = selected === index;

    return (
      <TouchableOpacity
        key={index}
        disabled={disabled}
        style={[
          styles.button,
          isSelected ? selectedTextContainerStyle : textContainerStyle,
        ]}
        onPress={() => toggleItem(index)}
        accessibilityLabel={element.accessibilityLabel}
        testID={element.testID}
      >
        {typeof element.customIcon === 'function'
          ? element.customIcon(isSelected)
          : element.customIcon}
        {element.imageIcon && (
          <Image
            source={element.imageIcon}
            style={[
              {
                height: 30,
                width: 30,
                tintColor: isSelected ? selectedColor : textColor,
              },
              imageStyle,
            ]}
          />
        )}
        <Text
          style={[
            {
              fontSize,
              fontWeight: bold ? 'bold' : 'normal',
              textAlign: 'center',
              color: isSelected ? selectedColor : textColor,
              backgroundColor: 'transparent',
            },
            isSelected ? selectedTextStyle : textStyle,
          ]}
        >
          {element.label}
        </Text>
      </TouchableOpacity>
    );
  });

  return (
    <View
      style={[{ flexDirection: 'row' }, style]}
      accessibilityLabel={accessibilityLabel || undefined}
      testID={testID || undefined}
    >
      <View {...panResponder.panHandlers} style={{ flex: 1 }}>
        <View
          style={{
            borderRadius,
            backgroundColor,
            height: height + buttonMargin * 2,
          }}
          onLayout={(event) => {
            const { width } = event.nativeEvent.layout;
            setSliderWidth(width - (hasPadding ? 2 : 0));
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              borderColor,
              borderRadius,
              borderWidth: hasPadding ? borderWidth : 0,
              alignItems: 'center',
            }}
          >
            {sliderWidth !== null && (
              <Animated.View
                style={[
                  {
                    height: hasPadding
                      ? height - valuePadding * 2 - borderWidth * 2
                      : height,
                    backgroundColor: getBgColor(),
                    width:
                      sliderWidth / options.length -
                      ((hasPadding ? valuePadding : 0) + buttonMargin * 2),
                    transform: [
                      {
                        translateX: animatedValue.interpolate({
                          inputRange: [0, 1],
                          outputRange: [
                            hasPadding ? valuePadding : 0,
                            sliderWidth - (hasPadding ? valuePadding : 0),
                          ],
                        }),
                      },
                    ],
                    borderRadius,
                    margin: buttonMargin,
                  },
                  styles.animated,
                ]}
              />
            )}
            {optionsMap}
          </View>
        </View>
      </View>
    </View>
  );
};

export default SwitchSelector;
