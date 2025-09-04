/* eslint-disable react/react-in-jsx-scope */
import { Env } from '@env';
import { router, useFocusEffect } from 'expo-router';
import { setStatusBarStyle, type StatusBarStyle } from 'expo-status-bar';
import React, { useCallback } from 'react';

import { Item } from '@/components/screen.components/settings/item';
import { ItemsContainer } from '@/components/screen.components/settings/items-container';
import {
  FocusAwareStatusBar,
  NavigationHeader,
  SafeAreaView,
  ScrollView,
  View,
} from '@/components/ui';
import { colors } from '@/lib';
import { useAuth } from '@/store';

export default function Settings() {
  const signOut = useAuth.use.signOut();

  // Track screen focus
  const setStatusBar = (style: StatusBarStyle) => {
    setStatusBarStyle(style, true);
  };
  useFocusEffect(
    useCallback(() => {
      setStatusBar('dark');
      return () => {};
    }, [])
  );
  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: colors.bg }}
      edges={['top', 'left', 'right']}
    >
      <FocusAwareStatusBar style="dark" />
      {/* Header */}
      <NavigationHeader
        title="Settings"
        showBack={true}
        onBackPress={() => router.back()}
      />

      {/* Settings Content */}
      {/* Using ScrollView to allow scrolling if content overflows */}
      <ScrollView>
        <View className="flex-1 px-4 ">
          <ItemsContainer title="settings.about">
            <Item text="settings.app_name" value={Env.NAME} />
            <Item text="settings.version" value={Env.VERSION} />
          </ItemsContainer>

          <View className="my-8">
            <ItemsContainer>
              <Item text="settings.logout" onPress={signOut} />
            </ItemsContainer>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
