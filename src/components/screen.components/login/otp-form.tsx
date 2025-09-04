import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import React from 'react';
import { type SubmitHandler, useForm } from 'react-hook-form';
import { KeyboardAvoidingView, View } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import * as z from 'zod';

import { useSendOtp } from '@/api/auth/login';
import { Button, ControlledOTPInput, showErrorMessage } from '@/components/ui';
import { colors } from '@/lib';

import OTPSentText from './otp-sent';
import OTPTimerText from './otp-timer-text';
const schema = z.object({
  otp: z
    .string({
      required_error: 'Enter otp',
    })
    .regex(/^\d{4}$/, {
      message: 'Enter valid valid',
    }),
});

export type OTPFormType = z.infer<typeof schema>;

export type OtpFormProps = {
  loading?: boolean;
  code: string;
  mobile: string;
  onSubmit?: SubmitHandler<OTPFormType>;
};

const OTPForm = ({
  loading,
  code,
  mobile,
  onSubmit = () => {},
}: OtpFormProps) => {
  const { handleSubmit, control, clearErrors, watch } = useForm<OTPFormType>({
    resolver: zodResolver(schema),
    shouldFocusError: false,
  });
  const sendOtp = useSendOtp();

  // Validate against 10-digit mobile number
  const isOtpValid = /^\d{4}$/.test(watch('otp') || '');

  const router = useRouter();

  const onEditMobile = () => {
    router.back();
  };

  const resendOtp = () => {
    sendOtp.mutate(
      { mobileNumber: mobile, countryCode: code },
      {
        onSuccess: (responseData) => {
          //console.log('Login success', responseData);
          showMessage({
            message: `OTP: ${responseData.results.otp}`,
            autoHide: false,
            type: 'success',
          });
        },
        onError: (error) => {
          const message = `Login failed, ${error.response?.data || error.message}`;
          // console.error(message);
          showErrorMessage(message);
        },
      }
    );
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: colors.bg }}
      behavior="padding"
      keyboardVerticalOffset={10}
    >
      <View className="flex-1 justify-center p-8">
        <OTPSentText code={code} mobile={mobile} onEdit={onEditMobile} />
        <ControlledOTPInput
          numberOfDigits={4}
          control={control}
          name="otp"
          clearErrors={clearErrors}
        />
        <View className="h-8" />
        <Button
          testID="otp-button"
          label="Verify OTP"
          disabled={!isOtpValid}
          variant="login"
          size="login"
          onPress={handleSubmit(onSubmit)}
          loading={loading}
        />
        <OTPTimerText onResend={resendOtp} />
      </View>
      {/* <LoginPrivacyText /> */}
    </KeyboardAvoidingView>
  );
};

export default OTPForm;
