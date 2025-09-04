import React, { useRef, useState } from 'react';
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

type SwitchDirection = 'ltr' | 'rtl';

// Define the type
export interface SwitchButtonProps {
  onValueChange?: (val: number) => void;
  switchWidth?: number;
  switchHeight?: number;
  switchBorderRadius?: number;
  switchBorderColor?: string;
  switchBackgroundColor?: string;
  switchSpeedChange?: number;
  direction?: SwitchDirection;
  btnBorderColor?: string;
  btnBackgroundColor?: string;
  fontColor?: string;
  activeFontColor?: string;
  text1?: string;
  text2?: string;
  children?: React.ReactNode;
}

const SwitchButton = ({
  onValueChange = () => null,
  switchWidth = 100,
  switchHeight = 44,
  switchBorderRadius,
  switchBorderColor = '#d4d4d4',
  switchBackgroundColor = '#fff',
  switchSpeedChange = 100,
  direction = 'ltr',
  btnBorderColor = '#00a4b9',
  btnBackgroundColor = '#00bcd4',
  fontColor = '#b1b1b1',
  activeFontColor = '#fff',
  text1 = 'ON',
  text2 = 'OFF',
  children,
}: SwitchButtonProps) => {
  const [activeSwitch, setActiveSwitch] = useState(1);
  const offsetX = useRef(new Animated.Value(0)).current;

  const switchDirection = (direction: SwitchDirection) => {
    return direction === 'rtl' ? 'row-reverse' : 'row';
  };

  const switchThumb = (direction: SwitchDirection) => {
    const dirSign = direction === 'rtl' ? -1 : 1;
    const toValue = activeSwitch === 1 ? (switchWidth / 2 - 6) * dirSign : 0;

    setActiveSwitch((prev) => {
      const next = prev === 1 ? 2 : 1;
      onValueChange(next);
      return next;
    });

    Animated.timing(offsetX, {
      toValue,
      duration: switchSpeedChange,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View>
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => switchThumb(direction)}
      >
        <View
          style={{
            width: switchWidth,
            height: switchHeight,
            borderRadius:
              switchBorderRadius !== undefined
                ? switchBorderRadius
                : switchHeight / 2,
            borderWidth: 1,
            borderColor: switchBorderColor,
            backgroundColor: switchBackgroundColor,
          }}
        >
          <View style={{ flexDirection: switchDirection(direction) }}>
            <Animated.View style={{ transform: [{ translateX: offsetX }] }}>
              <View
                style={[
                  switchStyles.wayBtnActive,
                  {
                    width: switchWidth / 2,
                    height: switchHeight - 6,
                    borderRadius:
                      switchBorderRadius !== undefined
                        ? switchBorderRadius
                        : switchHeight / 2,
                    borderColor: btnBorderColor,
                    backgroundColor: btnBackgroundColor,
                  },
                ]}
              />
            </Animated.View>

            <View
              style={[
                switchStyles.textPos,
                {
                  width: switchWidth / 2,
                  height: switchHeight - 6,
                  left: 0,
                },
              ]}
            >
              <Text
                style={{
                  color: activeSwitch === 1 ? activeFontColor : fontColor,
                }}
              >
                {text1}
              </Text>
            </View>

            <View
              style={[
                switchStyles.textPos,
                {
                  width: switchWidth / 2,
                  height: switchHeight - 6,
                  right: 0,
                },
              ]}
            >
              <Text
                style={{
                  color: activeSwitch === 2 ? activeFontColor : fontColor,
                }}
              >
                {text2}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
      {children}
    </View>
  );
};

const switchStyles = StyleSheet.create({
  textPos: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wayBtnActive: {
    borderWidth: 1,
    marginTop: 2,
    marginRight: 2,
    marginLeft: 2,
  },
});

export default SwitchButton;
