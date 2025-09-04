import React from 'react';
import { View } from 'react-native';
import { twMerge } from 'tailwind-merge';

import { Font, TextAlign, TextSize } from '@/lib';

import { Text } from './ui';

type WelcomeTextProps = {
  title: string;
  subText?: string;
  containerClassName?: string;
  titleClassName?: string;
  subTextClassName?: string;
};
export default function TitleSubTitleText({
  title,
  subText,
  containerClassName = '',
  titleClassName = '',
  subTextClassName = '',
}: WelcomeTextProps) {
  const containerStyle = React.useMemo(
    () => twMerge('mb-8 items-center justify-center', containerClassName),
    [containerClassName]
  );

  const titleStyle = React.useMemo(
    () => twMerge('pb-2', titleClassName),
    [titleClassName]
  );

  const subTextStyle = React.useMemo(
    () => twMerge('text-[#16161699]', subTextClassName),
    [subTextClassName]
  );

  return (
    <View className={containerStyle}>
      <Text
        font={Font.IBMPlexSans_600SemiBold}
        size={TextSize['4xl']}
        textAlign={TextAlign.center}
        className={titleStyle}
      >
        {title}
      </Text>
      {subText && (
        <Text textAlign={TextAlign.center} className={subTextStyle}>
          {subText}
        </Text>
      )}
    </View>
  );
}
