import React, { memo } from 'react';
import { Text, View } from 'react-native';

import { AccountSuccessIcon } from '@/icons';

const SubscriptionSuccess = () => {
  return (
    <View className="items-center justify-center gap-4 p-10">
      <AccountSuccessIcon />
      <Text className="text-center font-ibm-semibold text-2xl">
        🎉 You’ve successfully subscribed! Your 3-day trial is now active.
      </Text>
      <Text className="text-center font-inter text-sm">
        We need a few details to kickstart your journey
      </Text>
    </View>
  );
};
export default memo(SubscriptionSuccess);
