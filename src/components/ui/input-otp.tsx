import * as React from 'react';
import type {
  Control,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormClearErrors,
} from 'react-hook-form';
import { useController } from 'react-hook-form';
import { Keyboard, Platform, Text, View } from 'react-native';
import {
  OtpInput,
  type OtpInputProps,
  type OtpInputRef,
} from 'react-native-otp-entry';
import { tv } from 'tailwind-variants';

import { colors, Font } from '@/lib';

// https://www.npmjs.com/package/react-native-otp-entry

const inputTv = tv({
  slots: {
    container: 'mb-2',
    label: 'text-grey-100 mb-1 text-lg dark:text-neutral-100',
    errorText: 'text-sm text-danger-400 dark:text-danger-600',
  },

  variants: {
    error: {
      true: {
        inputContainer: 'border-danger-600',
        label: 'text-danger-600 dark:text-danger-600',
      },
    },
  },
  defaultVariants: {
    error: false,
  },
});

export interface OTPProps extends OtpInputProps {
  label?: string;
  error?: string;
  //onFocus?: () => void;
}

type TRule<T extends FieldValues> =
  | Omit<
      RegisterOptions<T>,
      'disabled' | 'valueAsNumber' | 'valueAsDate' | 'setValueAs'
    >
  | undefined;

export type OTPRuleType<T extends FieldValues> = {
  [name in keyof T]: TRule<T>;
};
export type InputOTPControllerType<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  rules?: OTPRuleType<T>;
  clearErrors?: UseFormClearErrors<T>;
};

interface ControlledOTPInputProps<T extends FieldValues>
  extends OTPProps,
    InputOTPControllerType<T> {}

export const OTPTetInput = React.forwardRef<OtpInputRef, OTPProps>(
  (props, ref) => {
    const { label, error, disabled, onFocus, ...inputProps } = props;
    const onFocusInput = React.useCallback(() => {
      {
        onFocus && onFocus();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const styles = React.useMemo(
      () =>
        inputTv({
          error: Boolean(error),
        }),
      [error]
    );

    return (
      <View className={styles.container()}>
        {label && <Text className={styles.label()}>{label}</Text>}

        <OtpInput
          ref={ref}
          //onBlur={onBlur}
          onFocus={onFocusInput}
          disabled={disabled}
          theme={{
            containerStyle: { paddingHorizontal: 40 },
            pinCodeContainerStyle: {
              backgroundColor: 'white',
              ...Platform.select({
                ios: {
                  shadowColor: '#000',
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.25,
                  shadowRadius: 3.84,
                },
                android: {
                  elevation: 5,
                },
              }),
            },
            pinCodeTextStyle: {
              fontFamily: Font.IBMPlexSans_600SemiBold,
              fontSize: 22,
            },
          }}
          {...inputProps}
        />

        {error && <Text className={styles.errorText()}>{error}</Text>}
      </View>
    );
  }
);
// only used with react-hook-form
export function ControlledOTPInput<T extends FieldValues>(
  props: ControlledOTPInputProps<T>
) {
  const { name, control, rules, clearErrors, onFocus, ...inputProps } = props;

  const { field, fieldState } = useController({ control, name, rules });

  const handleOtpFilled = ({ _ }: any) => {
    Keyboard.dismiss();
  };
  return (
    <OTPTetInput
      ref={field.ref}
      autoFocus={false}
      onTextChange={field.onChange}
      textInputProps={{ value: (field.value as string) || '' }}
      error={fieldState.error?.message}
      onFocus={() => {
        clearErrors && clearErrors(name);
        onFocus && onFocus();
      }}
      onFilled={handleOtpFilled}
      blurOnFilled={true}
      focusColor={colors.primary[400]}
      {...inputProps}
    />
  );
}
