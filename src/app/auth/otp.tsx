import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { hideMessage } from 'react-native-flash-message';

import { useVerifyOtp } from '@/api/auth/login';
import { type OtpFormProps } from '@/components/screen.components/login/otp-form';
import OTPForm from '@/components/screen.components/login/otp-form';
import { FocusAwareStatusBar, showErrorMessage } from '@/components/ui';
// import { setIsAssessment, setIsBasicInfo } from '@/hooks';
import { signIn } from '@/store';
import { useOnboardingStore } from '@/store/use-onboarding-store';

type Params = {
  mobile: string;
  code: string;
};

export default function Otp() {
  const [loading, setLoading] = useState<boolean>(false);
  const { code, mobile } = useLocalSearchParams() as Params;

  const verifyOtp = useVerifyOtp();
  const router = useRouter();
  const { setAssessment, setBasicInfo, setChallengeSubscribe } =
    useOnboardingStore.getState();

  const onSubmit: OtpFormProps['onSubmit'] = (data) => {
    setLoading(true);
    verifyOtp.mutate(
      { mobileNumber: mobile, countryCode: code, otp: data.otp },
      {
        onSuccess: (responseData) => {
          setLoading(false);
          const json = JSON.stringify(responseData, null, 2);
          console.log('verifyOtp ::', json);
          const isBasicProfileCompleted =
            responseData.results.user.isBasicProfileCompleted;
          const isAssessmentCompleted =
            responseData.results.user.isAssessmentCompleted;
          const isChallengesSubscribe =
            responseData.results.user.challenges &&
            responseData.results.user.challenges.length > 0;
          setBasicInfo(isBasicProfileCompleted);
          setAssessment(isAssessmentCompleted);
          setChallengeSubscribe(isChallengesSubscribe);
          const isTemp =
            isBasicProfileCompleted &&
            isAssessmentCompleted &&
            isChallengesSubscribe;
          signIn(
            {
              access: responseData.results.token,
              refresh: 'refresh-token',
            },
            !isTemp
          );

          hideMessage();
          router.replace('/');
        },
        onError: (error) => {
          setLoading(false);
          const message = `Login failed, ${error.response?.data.message || error.message}`;
          console.error(error.response?.data);
          showErrorMessage(message);
        },
      }
    );
  };
  return (
    <>
      <FocusAwareStatusBar style="dark" />
      <OTPForm
        loading={loading}
        code={code}
        mobile={mobile}
        onSubmit={onSubmit}
      />
    </>
  );
}
