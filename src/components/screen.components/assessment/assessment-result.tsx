import React from 'react';

import { Text, View } from '@/components/ui';
import { BodyWithRing } from '@/icons';
import { Font, TextAlign, TextSize } from '@/lib';

const AssessmentResult = () => {
  return (
    <View className="items-center justify-center gap-4 bg-slate-50 p-10">
      <BodyWithRing />
      <Text
        font={Font.Inter_400Regular}
        size={TextSize.sm}
        textAlign={TextAlign.center}
      >
        56% Loaded
      </Text>
      <Text
        font={Font.IBMPlexSans_600SemiBold}
        size={TextSize.lg}
        textAlign={TextAlign.center}
      >
        Your Body Speaks… and here’s what it’s saying
      </Text>
    </View>
  );
};
export default AssessmentResult;
