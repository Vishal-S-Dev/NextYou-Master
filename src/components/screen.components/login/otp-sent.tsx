import React from 'react';

import { Button, Text, View } from '@/components/ui';
import { Pencil } from '@/icons';

type OTPSentTextProps = {
  code: string;
  mobile: string;
  onEdit?: () => void; // Optional function prop
};
export default function OTPSentText({
  code,
  mobile,
  onEdit,
}: OTPSentTextProps) {
  return (
    <View className="mb-8 items-center justify-center">
      {/* <Image
        source={require('../../../assets/ny-logo-blue.png')}
        style={{ width: 120, height: 80 }}
        contentFit="contain"
      /> */}
      <Text
        testID="form-title"
        className="pb-2 text-center font-ibm-semibold text-2xl"
      >
        Enter the OTP we’ve sent to
      </Text>
      <Button size="sm" variant="ghost" onPress={onEdit}>
        <Text className="mr-2 max-w-xs text-center text-[#16161699] underline">
          {code}-{mobile}
        </Text>
        <Pencil />
      </Button>
    </View>
  );
}
