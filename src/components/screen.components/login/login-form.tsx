import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { KeyboardAvoidingView, View } from 'react-native';
import * as z from 'zod';

import { Button, ControlledInput, Text } from '@/components/ui';
import { colors, Font } from '@/lib';

import LoginPrivacyText from './login-privacy-text';
import WelcomeText from './welcome-text';

const schema = z.object({
  code: z.string().default('+91'),
  mobile: z
    .string({
      required_error: 'Enter mobile number',
    })
    .regex(/^\d{10}$/, {
      message: 'Enter valid mobile number',
    }),
});

export type FormType = z.infer<typeof schema>;

export type LoginFormProps = {
  loading?: boolean;
  onSubmit?: SubmitHandler<FormType>;
};

export const LoginForm = ({ loading, onSubmit = () => {} }: LoginFormProps) => {
  const { handleSubmit, control, clearErrors, watch } = useForm<FormType>({
    resolver: zodResolver(schema),
    shouldFocusError: false,
    defaultValues: {
      code: '+91',
      mobile: '',
    },
  });

  //const defaultValuesObject = schema.parse({});
  //console.log('Runtime Default Values:', defaultValuesObject);

  // Validate against 10-digit mobile number
  const isMobileValid = /^\d{10}$/.test(watch('mobile') || '');
  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.bg }}
      behavior="padding"
      keyboardVerticalOffset={10}
    >
      <View className="flex-1 justify-center p-8">
        <WelcomeText />

        <ControlledInput
          testID="mobile-input"
          keyboardType="number-pad"
          control={control}
          name="mobile"
          clearErrors={clearErrors}
          placeholder="Mobile Number"
          leftComponent={
            <Text className="w-12 text-center font-inter-medium">
              {watch('code')}
            </Text>
          }
          maxLength={10}
          style={{
            fontFamily: Font.Inter_400Regular,
            fontSize: watch('mobile') === '' ? 14 : 18,
            textAlignVertical: 'center',
            letterSpacing: watch('mobile') === '' ? 0 : 4,
          }}
        />
        <View className="h-8" />

        <Button
          testID="login-button"
          label="Get OTP"
          disabled={!isMobileValid}
          variant="login"
          size="login"
          onPress={handleSubmit(onSubmit)}
          loading={loading}
        />
      </View>
      <LoginPrivacyText />
    </KeyboardAvoidingView>
  );
};
