import moment from 'moment';
import { useState } from 'react';
import { type FieldValues, useController } from 'react-hook-form';
import {
  Keyboard,
  type NativeSyntheticEvent,
  Pressable,
  type TextInputFocusEventData,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import { Input, type InputControllerType, type NInputProps } from './input';
interface ControlledInputProps<T extends FieldValues>
  extends NInputProps,
    InputControllerType<T> {}

interface Props<T extends FieldValues> extends ControlledInputProps<T> {
  dateFormat?: string;
}

// only used with react-hook-form
export function ControlledDatePickerInput<T extends FieldValues>(
  props: Props<T>
) {
  const {
    name,
    control,
    rules,
    clearErrors,
    onFocus,
    dateFormat,
    ...inputProps
  } = props;
  const { field, fieldState } = useController({ control, name, rules });

  const [date, setDate] = useState(new Date(2000, 0, 1));
  const [showPicker, setShowPicker] = useState(false);

  const formatDate = (d: Date) => {
    const dateFormatStr = dateFormat ?? 'DD/MM/YYYY';
    return moment(d).format(dateFormatStr); // customize format if needed
  };

  const onFocusInput = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    Keyboard.dismiss();
    clearErrors && clearErrors(name);
    if (showPicker) {
      setShowPicker(false);
      return;
    }
    setShowPicker(true);
    onFocus && onFocus(e);
  };

  const showDatePicker = () => {
    setShowPicker(true);
  };

  const hideDatePicker = () => {
    setShowPicker(false);
  };

  const handleConfirm = (date: Date) => {
    setDate(date);
    field.onChange(formatDate(date));
    hideDatePicker();
  };

  return (
    <>
      <Pressable onPress={showDatePicker}>
        <Input
          ref={field.ref}
          autoCapitalize="none"
          onChangeText={field.onChange}
          value={(field.value as string) || ''}
          {...inputProps}
          error={fieldState.error?.message}
          onFocus={onFocusInput}
          disabled
          pointerEvents="none"
          styleOverrides={{
            variants: {
              disabled: {
                inputContainer: 'bg-white',
              },
            },
          }}
        />
      </Pressable>
      <DateTimePickerModal
        date={date}
        isVisible={showPicker}
        mode="date"
        display="inline"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </>
  );
}
