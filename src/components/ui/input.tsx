import * as React from 'react';
import type {
  Control,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormClearErrors,
} from 'react-hook-form';
import { useController } from 'react-hook-form';
import type {
  NativeSyntheticEvent,
  TextInputFocusEventData,
  TextInputProps,
} from 'react-native';
import { I18nManager, Platform, StyleSheet, Text, View } from 'react-native';
import { TextInput as NTextInput } from 'react-native';
import { tv } from 'tailwind-variants';

import { colors } from '@/lib';

const inputTv = tv({
  slots: {
    container: 'mb-2',
    label: 'text-grey-100 mb-1 text-lg dark:text-neutral-100',
    inputContainer:
      'mt-0 h-14 flex-row items-center rounded-xl border-[0.1px] border-neutral-300 bg-white shadow-md shadow-blue-500/50 dark:border-neutral-700 dark:bg-black',
    input: 'text-md h-full flex-1 rounded-xl p-3 font-inter  dark:text-white',
    errorText: 'text-sm font-semibold text-danger-400 dark:text-danger-600',
  },

  variants: {
    focused: {
      true: {
        inputContainer:
          'border-[0.5px] border-primary-500 dark:border-primary-500',
      },
    },
    error: {
      true: {
        inputContainer: 'border border-danger-600',
        input: 'border-danger-600',
        label: 'text-danger-600 dark:text-danger-600',
      },
    },
    disabled: {
      true: {
        inputContainer: 'bg-neutral-200',
        //input: 'bg-neutral-200',
      },
    },
  },
  defaultVariants: {
    focused: false,
    error: false,
    disabled: false,
  },
});

export interface NInputProps extends TextInputProps {
  label?: string;
  disabled?: boolean;
  error?: string;
  testID?: string;
  styleOverrides?: {
    container?: string;
    label?: string;
    inputContainer?: string;
    input?: string;
    errorText?: string;
    variants?: {
      focused?: {
        inputContainer?: string;
        input?: string;
        label?: string;
      };
      disabled?: {
        inputContainer?: string;
        input?: string;
        label?: string;
      };
      error?: {
        inputContainer?: string;
        input?: string;
        label?: string;
        errorText?: string;
      };
    };
  };
  leftComponent?: React.ReactNode;
  rightComponent?: React.ReactNode;
}

type TRule<T extends FieldValues> =
  | Omit<
      RegisterOptions<T>,
      'disabled' | 'valueAsNumber' | 'valueAsDate' | 'setValueAs'
    >
  | undefined;

export type RuleType<T extends FieldValues> = { [name in keyof T]: TRule<T> };
export type InputControllerType<T extends FieldValues> = {
  name: Path<T>;
  control: Control<T>;
  rules?: RuleType<T>;
  clearErrors?: UseFormClearErrors<T>;
};

interface ControlledInputProps<T extends FieldValues>
  extends NInputProps,
    InputControllerType<T> {}

export const Input = React.forwardRef<NTextInput, NInputProps>((props, ref) => {
  const {
    label,
    error,
    testID,
    styleOverrides = {},
    disabled,
    onFocus = () => {},
    ...inputProps
  } = props;
  const [isFocussed, setIsFocussed] = React.useState(false);
  const onBlur = React.useCallback(() => setIsFocussed(false), []);
  const onFocusInput = React.useCallback(
    (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      setIsFocussed(true);
      onFocus(e);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const styles = React.useMemo(
    () =>
      inputTv({
        error: Boolean(error),
        focused: isFocussed,
        disabled: Boolean(props.disabled),
      }),
    [error, isFocussed, props.disabled]
  );

  // const getShadowStyle = () => {
  //   if (Platform.OS === 'ios') {
  //     return 'shadow shadow-blue-500/10'; // iOS supports shadow props
  //   } else if (Platform.OS === 'android') {
  //     return 'elevation-2'; // Android uses elevation instead of shadow*
  //   }
  //   return ''; // web or unknown
  // };

  const getShadowStyle = () => {
    if (Platform.OS === 'ios') {
      return {
        shadowColor: '#3b82f6',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      };
    } else if (Platform.OS === 'android') {
      return {
        elevation: 2,
      };
    }
  };

  // Combine base + variant + override styles
  const getClass = (
    slot: 'container' | 'label' | 'inputContainer' | 'input' | 'errorText'
  ): string => {
    let base = styles[slot]?.() || '';
    let override = styleOverrides[slot] || '';

    const variants = styleOverrides.variants || {};

    if (slot === 'inputContainer' || slot === 'label') {
      if (isFocussed && variants.focused?.[slot]) {
        override += ` ${variants.focused[slot]}`;
      }
      if (disabled && variants.disabled?.[slot]) {
        override += ` ${variants.disabled[slot]}`;
      }
      if (error && variants.error?.[slot]) {
        override += ` ${variants.error[slot]}`;
      }
    }

    if (slot === 'errorText' && error && variants.error?.errorText) {
      override += ` ${variants.error.errorText}`;
    }

    return `${base} ${override}`.trim();
  };

  return (
    <View className={getClass('container')}>
      {label && (
        <Text
          testID={testID ? `${testID}-label` : undefined}
          className={getClass('label')}
        >
          {label}
        </Text>
      )}
      <View
        className={`${getClass('inputContainer')} `}
        style={[getShadowStyle(), { height: inputProps.multiline ? 80 : 48 }]}
      >
        {props.leftComponent && (
          <View className="pl-3 pr-2">{props.leftComponent}</View>
        )}

        <NTextInput
          testID={testID}
          ref={ref}
          placeholderTextColor={colors.neutral[400]}
          className={getClass('input')}
          onBlur={onBlur}
          onFocus={onFocusInput}
          editable={!disabled}
          {...inputProps}
          style={StyleSheet.flatten([
            { writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr' },
            { textAlign: I18nManager.isRTL ? 'right' : 'left' },
            Platform.OS === 'android' &&
              inputProps.multiline && { textAlignVertical: 'top' },
            inputProps.style,
          ])}
        />

        {props.rightComponent && (
          <View className="pl-2 pr-3">{props.rightComponent}</View>
        )}
      </View>
      {error && (
        <Text
          testID={testID ? `${testID}-error` : undefined}
          className={getClass('errorText')}
        >
          {error}
        </Text>
      )}
    </View>
  );
});

// only used with react-hook-form
export function ControlledInput<T extends FieldValues>(
  props: ControlledInputProps<T>
) {
  const { name, control, rules, clearErrors, onFocus, ...inputProps } = props;
  const { field, fieldState } = useController({ control, name, rules });
  return (
    <Input
      ref={field.ref}
      autoCapitalize="none"
      onChangeText={field.onChange}
      value={(field.value as string) || ''}
      {...inputProps}
      error={fieldState.error?.message}
      onFocus={(e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        clearErrors && clearErrors(name);
        onFocus && onFocus(e);
      }}
    />
  );
}
