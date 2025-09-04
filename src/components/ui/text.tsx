import React from 'react';
import type { TextProps, TextStyle } from 'react-native';
import { I18nManager, StyleSheet, Text as RNText } from 'react-native';
import { twMerge } from 'tailwind-merge';

import { Font, type TextAlign, TextSize } from '@/lib';
import { translate, type TxKeyPath } from '@/lib/i18n';

interface Props extends TextProps {
  className?: string;
  tx?: TxKeyPath;
  font?: Font;
  size?: TextSize;
  textAlign?: TextAlign;
  letterSpacing?: number;
  lineHeight?: number;
}

export const Text = ({
  className = '',
  style,
  tx,
  children,
  font = Font.Inter_400Regular,
  size = TextSize.base,
  textAlign,
  letterSpacing,
  lineHeight,
  ...props
}: Props) => {
  const textStyle = React.useMemo(
    () => twMerge(`${size} text-black dark:text-white`, className),
    [className, size]
  );

  const nStyle = React.useMemo(
    () =>
      StyleSheet.flatten([
        {
          writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr',
          fontFamily: font,
          textAlign,
          letterSpacing,
          lineHeight,
        },
        style,
      ]) as TextStyle,
    [style, font, textAlign, letterSpacing, lineHeight]
  );

  return (
    <RNText className={textStyle} style={nStyle} {...props}>
      {tx ? translate(tx) : children}
    </RNText>
  );
};
