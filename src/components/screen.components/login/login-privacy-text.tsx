import React from 'react';
import { Text, View } from 'react-native';

export default function LoginPrivacyText() {
  type LinkTextProps = {
    linkText: string;
    onPress?: () => {};
  };

  const LinkText = ({ linkText, onPress }: LinkTextProps) => {
    return (
      <Text
        className="font-ibm-semibold text-sm text-primary-400 underline"
        onPress={onPress}
      >
        {linkText}
      </Text>
    );
  };

  return (
    <View className="absolute bottom-16 w-full items-center px-[10px]">
      <Text className="text-center font-ibm text-sm/6">
        By proceeding, you consent to share your information with Nextyou and
        agree to NextYou <LinkText linkText="Privacy Policy" /> and{' '}
        <LinkText linkText="Terms of Service" />.
      </Text>
    </View>
  );
}
