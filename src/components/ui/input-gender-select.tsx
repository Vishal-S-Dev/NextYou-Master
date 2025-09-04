import React from 'react';
import {
  type Control,
  type FieldValues,
  type Path,
  useController,
} from 'react-hook-form';
import {
  Platform,
  Pressable,
  type StyleProp,
  StyleSheet,
  type TextStyle,
  View,
  type ViewStyle,
} from 'react-native';

import { FemaleIcon, MaleIcon } from '@/icons';
import { Font, TextAlign } from '@/lib';

import { Text } from './text';
type GenderOption = {
  label: string;
  value: string;
};

export type GenderSelectProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  //clearErrors: UseFormClearErrors<T>;
  label?: string;
  containerStyle?: StyleProp<ViewStyle>;
  optionStyle?: StyleProp<ViewStyle>;
  optionTextStyle?: StyleProp<TextStyle>;
};

const genderOptions: GenderOption[] = [
  { label: 'Male', value: 'Male' },
  { label: 'Female', value: 'Female' },
  //{ label: 'Other', value: 'other' },
];

const ControlledGenderSelect = <T extends FieldValues>(
  props: GenderSelectProps<T>
) => {
  const {
    name,
    control,
    //clearErrors,
    label,
    containerStyle,
    optionStyle,
    optionTextStyle,
  } = props;
  const { field, fieldState } = useController({ control, name });

  const getShadowStyle = () => {
    if (Platform.OS === 'ios') {
      return 'shadow-md shadow-blue-500/20'; // iOS supports shadow props
    } else if (Platform.OS === 'android') {
      return 'elevation-2'; // Android uses elevation instead of shadow*
    }
    return ''; // web or unknown
  };

  const renderIcon = (value: string, isSelected: boolean) => {
    //const iconColor = isSelected ? '#161616' : '#fff';
    if (value === 'Male') {
      return <MaleIcon selected={isSelected} />;
    } else if (value === 'Female') {
      return <FemaleIcon selected={isSelected} />;
    }
    return null;
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text className="mb-1 font-ibm text-lg text-[#161616] dark:text-neutral-100">
          {label}
        </Text>
      )}

      <View
        style={styles.optionsWrapper}
        className={`${'elevation-lg border-[0.1px] shadow-md shadow-blue-500/50 dark:border-neutral-700 dark:bg-black'} ${getShadowStyle()}`}
      >
        {genderOptions.map((option, index) => {
          const isSelected = field.value === option.value;
          const isFirst = index === 0;
          const isLast = index === genderOptions.length - 1;

          const borderRadiusStyle: ViewStyle = {
            borderTopLeftRadius: isFirst ? 12 : 0,
            borderBottomLeftRadius: isFirst ? 12 : 0,
            borderTopRightRadius: isLast ? 12 : 0,
            borderBottomRightRadius: isLast ? 12 : 0,
          };

          return (
            <Pressable
              key={option.value}
              onPress={() => field.onChange(option.label)}
              style={[
                styles.optionButton,
                isSelected && styles.optionButtonSelected,
                borderRadiusStyle, // <- dynamically applied
                optionStyle,
              ]}
            >
              {renderIcon(option.value, isSelected)}

              <Text
                font={Font.IBMPlexSans_500Medium}
                textAlign={TextAlign.center}
                style={[
                  styles.optionText,
                  optionTextStyle,
                  isSelected && styles.optionTextSelected,
                ]}
              >
                {option.label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      {fieldState.error && (
        <Text style={styles.errorText}>{fieldState.error?.message}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { marginVertical: 0 },
  optionsWrapper: {
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: 12,
  },
  optionButton: {
    paddingVertical: 12,
    backgroundColor: '#16161699',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    height: 50,
  },
  optionButtonSelected: {
    backgroundColor: '#fff',
    borderColor: '#fff',
  },
  optionText: {
    color: '#fff',
  },
  optionTextSelected: {
    color: '#161616',
    fontWeight: '600',
  },
  errorText: {
    color: 'red',
    marginTop: 4,
  },
});

export default ControlledGenderSelect;
