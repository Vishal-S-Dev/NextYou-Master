import React from 'react';

import { TitleSubTitleText } from '@/components';
import { Image, View } from '@/components/ui';
import { nyLogoBlue } from '@/icons';

export default function WelcomeText() {
  return (
    <View className="mb-8 items-center justify-center">
      <Image
        source={nyLogoBlue}
        style={{ width: 120, height: 80 }}
        contentFit="contain"
      />
      <TitleSubTitleText
        title="Hey there,Welcome!"
        subText="Log in or Sign up"
      />
    </View>
  );
}
