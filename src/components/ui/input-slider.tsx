import Slider, { type SliderProps } from '@react-native-community/slider';
// import { SliderRef } from '@react-native-community/slider';
import React, { type FC } from 'react';
import {
  type Control,
  Controller,
  type FieldValues,
  type Path,
  useController,
} from 'react-hook-form';
import {
  Platform,
  type StyleProp,
  StyleSheet,
  Text,
  type TextStyle,
  View,
} from 'react-native';

import { Font } from '@/lib';

import SliderStepMarker from '../slider-step-marker';

export interface SliderInputProps extends SliderProps {
  testID?: string;
  sliderLabel?: string;
  disabled?: boolean;
  error?: string;
  value?: number;
  onChange?: (value: number) => void;
  sliderLabelStyle?: StyleProp<TextStyle>;
}

export const SliderInput: FC<SliderInputProps> = (props) => {
  const {
    sliderLabel,
    value,
    onChange,
    disabled,
    sliderLabelStyle,
    ...sliderProps
  } = props;

  return (
    <View key={sliderLabel} style={styles.scaleItem}>
      {sliderLabel && (
        <Text style={[styles.scaleLabel, sliderLabelStyle]}>{sliderLabel}</Text>
      )}
      <View
        style={{
          paddingHorizontal: 0,
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            //backgroundColor: 'gray',
            justifyContent: 'space-between',
            paddingHorizontal: 6,
            //marginTop: 5,
            marginBottom: -5,
          }}
        >
          <Text>{props.minimumValue}</Text>
          <Text>{props.maximumValue}</Text>
        </View>
        <Slider
          style={styles.sliderStyle}
          step={1}
          value={value}
          minimumValue={props.minimumValue}
          maximumValue={props.maximumValue}
          minimumTrackTintColor="#6B4AEA"
          maximumTrackTintColor="#D9D1C2"
          onValueChange={onChange}
          StepMarker={props.StepMarker}
          thumbTintColor="#6B4AEA"
          thumbImage={props.thumbImage}
          disabled={disabled}
          {...sliderProps}
        />
      </View>
    </View>
  );
};

type ControlledSliderInputProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  label: string;
  min?: number;
  max?: number;
  step?: number;
};

export const ControlledSliderInput = <T extends FieldValues>({
  name,
  control,
  label,
  min = 0,
  max = 24,
  step = 1,
}: ControlledSliderInputProps<T>) => {
  const { fieldState } = useController({ control, name });

  return (
    <View style={styles.sliderContainer}>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange } }) => (
          <SliderInput
            sliderLabel={label}
            step={step}
            minimumValue={min}
            maximumValue={max}
            onValueChange={onChange}
            minimumTrackTintColor="#6B4AEA"
            maximumTrackTintColor="#D9D1C2"
            StepMarker={SliderStepMarker}
            thumbTintColor="#6B4AEA"
            sliderLabelStyle={styles.sliderLabel}
            style={{
              width: '100%',
              height: Platform.OS === 'android' ? 25 : 40,
            }}
          />
        )}
      />
      {fieldState.error && (
        <Text style={styles.errorText}>{fieldState.error?.message}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  sliderContainer: {
    marginBottom: 20,
  },
  sliderLabel: {
    width: 80,
    fontSize: 16,
    lineHeight: 24,
  },
  errorText: {
    color: 'red',
    fontSize: 13,
    marginTop: 4,
  },
  scaleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 8,
    //backgroundColor: 'red',
  },
  scaleLabel: {
    fontFamily: Font.IBMPlexSans_400Regular,
    fontSize: 15,
    color: '#000',
    width: 84,
  },
  rulerContainer: {
    marginTop: 24,
  },
  sliderStyle: {
    width: '100%',
    height: Platform.OS === 'android' ? 25 : 40,
  },
});
