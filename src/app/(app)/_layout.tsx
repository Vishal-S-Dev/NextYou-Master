import Entypo from '@expo/vector-icons/Entypo';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Redirect, Tabs } from 'expo-router';
import React, { useEffect } from 'react';
import { Platform } from 'react-native';

import { useIsFirstTime } from '@/hooks';
import { NutritionIcon } from '@/icons';
import { Logger } from '@/lib/logger';
import { useAuth, useUserStore } from '@/store';
import { useOnboardingStore } from '@/store/use-onboarding-store';

// 👇 Module-level flag survives StrictMode remount
let hasFetchedUser = false;
export default function TabLayout() {
  const status = useAuth.use.status();
  const [isFirstTime] = useIsFirstTime();
  const { isBasicInfoComplete, isAssessmentComplete, isChallengeSubscribe } =
    useOnboardingStore();
  const { fetchUser } = useUserStore();
  useEffect(() => {
    if (status === 'signIn' && !hasFetchedUser) {
      const token = useAuth.getState().token?.access;
      Logger.log(`Token: ${token}`);
      fetchUser(true);
    }
  }, [fetchUser, status]);

  // Redirect logic (runs before rendering Tabs)
  if (isFirstTime) return <Redirect href="/onboarding" />;
  if (status === 'signOut') return <Redirect href="/auth/login" />;
  if (!isBasicInfoComplete) return <Redirect href="/basic-info" />;
  if (!isAssessmentComplete) return <Redirect href="/assessment" />;
  if (!isChallengeSubscribe) return <Redirect href="/challenges" />;

  return (
    <>
      <Tabs
        screenOptions={{
          tabBarStyle: {
            backgroundColor: '#03010C',
            borderTopColor: '#eee',
            height: Platform.OS === 'android' ? 64 : 84,
            paddingBottom: Platform.OS === 'android' ? 8 : 20,
            //position: 'absolute',
          },
          tabBarActiveTintColor: '#9B81FF',
          tabBarInactiveTintColor: '#FFFFFFDD',
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            headerShown: false,
            title: 'Home',
            tabBarIcon: ({ color }) => (
              <Entypo name="home" size={24} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="my-schedule"
          options={{
            headerShown: false,
            title: 'Schedule',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons
                name="calendar-range"
                size={24}
                color={color}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="nutrition"
          options={{
            headerShown: false,
            title: 'Nutrition',
            tabBarIcon: ({ color }) => (
              <NutritionIcon size={24} color={color} />
            ),
          }}
        />

        <Tabs.Screen
          name="settings"
          options={{
            title: 'Account',
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="account-circle" size={24} color={color} />
            ),
            tabBarButtonTestID: 'settings-tab',
          }}
        />
      </Tabs>
      {/* <Loader visible={loading} /> */}
    </>
  );
}
