import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';

import { useCreateBasicProfile } from '@/api/auth/basic-info';
import { useMessageModal } from '@/components/message.model';
import AccountSuccess from '@/components/screen.components/basic-info/account-success';
import {
  BasicInfoForm,
  type BasicInfoFormProps,
} from '@/components/screen.components/basic-info/basic-info-form';
import {
  FocusAwareStatusBar,
  SafeAreaView,
  showErrorMessage,
} from '@/components/ui';
// import { setIsAssessment, setIsBasicInfo } from '@/hooks';
import { colors } from '@/lib';
import { useOnboardingStore } from '@/store/use-onboarding-store';

const BasicInfo = () => {
  const [loading, setLoading] = useState<boolean>(false);

  const createBasicProfile = useCreateBasicProfile();
  const router = useRouter();
  const { showModal } = useMessageModal();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { setAssessment, setBasicInfo } = useOnboardingStore.getState();

  const onCloseAccountSuccessModel = () => {
    timeoutRef.current = setTimeout(() => {
      router.replace('/');
      timeoutRef.current = null;
    }, 0);
  };

  const onSubmit: BasicInfoFormProps['onSubmit'] = (data) => {
    //console.log('info data::', data);
    setLoading(true);
    createBasicProfile.mutate(
      { name: data.name, DOB: data.dob, gender: data.gender },
      {
        onSuccess: (responseData) => {
          //console.log('createBasicProfile ::', responseData);
          setLoading(false);
          setBasicInfo(responseData.results.isBasicProfileCompleted);
          setAssessment(responseData.results.isAssessmentCompleted);
          showModal({
            content: <AccountSuccess />,
            modelStyle: {
              flex: 1,
              width: '100%',
              borderRadius: 0,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: colors.bg,
            },
            onClose: onCloseAccountSuccessModel,
          });
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
    <SafeAreaView className="flex-1 bg-bg">
      <FocusAwareStatusBar style="dark" />
      <BasicInfoForm loading={loading} onSubmit={onSubmit} />
    </SafeAreaView>
  );
};
export default BasicInfo;
