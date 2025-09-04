import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { showMessage } from 'react-native-flash-message';

import { useSendOtp } from '@/api/auth/login';
import type { LoginFormProps } from '@/components/screen.components/login/login-form';
import { LoginForm } from '@/components/screen.components/login/login-form';
import { FocusAwareStatusBar, showErrorMessage } from '@/components/ui';

const Login = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const sendOtp = useSendOtp();
  const router = useRouter();

  const onSubmit: LoginFormProps['onSubmit'] = (data) => {
    setLoading(true);
    sendOtp.mutate(
      { mobileNumber: data.mobile, countryCode: data.code },
      {
        onSuccess: (responseData) => {
          setLoading(false);
          console.log('Login success', responseData);
          showMessage({
            message: `OTP: ${responseData.results.otp}`,
            autoHide: false,
            type: 'success',
          });
          router.push({
            pathname: '/auth/otp',
            params: {
              code: data.code,
              mobile: data.mobile,
            },
          });
        },
        onError: (error) => {
          setLoading(false);
          const message = `Login failed, ${error.response?.data || error.message}`;
          console.log('sendOtp', error.response);
          showErrorMessage(message);
        },
      }
    );
  };

  return (
    <>
      <FocusAwareStatusBar style="dark" />
      <LoginForm loading={loading} onSubmit={onSubmit} />
    </>
  );
};
export default Login;
