import { xorBy } from 'lodash';
import React from 'react';
import {
  type Control,
  type FieldValues,
  type Path,
  useController,
} from 'react-hook-form';
import {
  Platform,
  type StyleProp,
  StyleSheet,
  type TextStyle,
  View,
  type ViewStyle,
} from 'react-native';

import { colors, Font } from '@/lib';
import { ALL_ALLERGIES } from '@/mock/allergies';

import SelectBox from './select-box';
import { Text } from './text';

export type SelectBoxProps<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  //clearErrors: UseFormClearErrors<T>;
  label?: string;
  placeholder: string;
  error?: string;
  disabled?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
};

export function ControlledSelectBox<T extends FieldValues>(
  props: SelectBoxProps<T>
) {
  const {
    name,
    control,
    label,
    placeholder,
    error,
    disabled,
    containerStyle,
    labelStyle,
  } = props;
  const { field, fieldState } = useController({ control, name });
  const [isFocussed, setIsFocussed] = React.useState(false);

  const onBlur = () => setIsFocussed(false);
  const onFocus = () => {
    setIsFocussed(true);
    //onFocus();
  };

  const getShadowStyle = () => {
    if (Platform.OS === 'ios') {
      return styles.iosShadow;
    } else if (Platform.OS === 'android') {
      return styles.androidShadow;
    }
    return {}; // web or unknown
  };

  const getSelectBoxContainerStyle = () => {
    return [
      styles.selectBox,
      getShadowStyle(),
      isFocussed && styles.inputContainerFocused,
      error && styles.inputContainerError,
      disabled && styles.inputContainerDisabled,
    ];
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {/* Label */}
      {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}

      {/* Select Box */}
      <SelectBox
        inputPlaceholder={placeholder}
        options={ALL_ALLERGIES}
        preSelectedValues={field.value}
        searchIconColor="#6c4cff"
        toggleIconColor="#6c4cff"
        multiOptionContainerStyle={styles.multiSelectedOption}
        multiOptionsLabelStyle={styles.multiLabel}
        placeholderStyle={styles.multiEmpty}
        onMultiSelect={(item) =>
          field.onChange(xorBy(field.value, [item], 'id'))
        }
        onTapClose={(item) => field.onChange(xorBy(field.value, [item], 'id'))}
        onFocus={onFocus}
        onBlur={onBlur}
        isMulti
        listOptionProps={{ nestedScrollEnabled: true }}
        containerStyle={getSelectBoxContainerStyle()}
      />

      {/* Error Label */}
      {fieldState.error && (
        <Text style={styles.errorText}>{fieldState.error?.message}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 8 },
  label: {
    marginBottom: 4,
    fontFamily: Font.IBMPlexSans_500Medium,
    fontSize: 18,
    color: '#161616',
  },
  labelDark: {
    color: '#f5f5f5', // Tailwind `neutral-100`
  },
  selectBox: {
    //marginBottom: 12,
    backgroundColor: '#fff',
    borderWidth: 0.0,
    borderColor: colors.neutral[700],
    borderRadius: 10,
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  inputContainerFocused: {
    borderWidth: 0.5,
    borderColor: colors.primary[500],
  },
  inputContainerError: {
    borderColor: colors.danger[600],
    borderWidth: 1,
  },
  inputContainerDisabled: {
    backgroundColor: '#E0E0E0',
  },
  iosShadow: {
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  androidShadow: {
    elevation: 2,
  },

  multiSelectedOption: {
    backgroundColor: '#f0e8ff',
  },
  multiLabel: {
    fontFamily: Font.IBMPlexSans_600SemiBold,
    fontSize: 12,
    color: colors.black,
  },
  multiEmpty: {
    fontFamily: Font.Inter_400Regular,
    fontSize: 15,
    color: colors.neutral[400],
  },
  errorText: {
    color: 'red',
    marginTop: 4,
  },
});
