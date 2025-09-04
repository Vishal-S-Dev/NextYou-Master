import '@react-native-firebase/app'; // must be imported before other firebase packages

import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { Platform } from 'react-native';

import useNotificationService from '@/hooks/use-notification-service';
import { Logger } from '@/lib/logger';

export default function AuthLayout() {
  const { requestPermission, getFCMToken } = useNotificationService();

  useEffect(() => {
    async function setupNotifications() {
      const hasPermission = await requestPermission();
      if (hasPermission) {
        const fcmToken = await getFCMToken();
        Logger.log(`Platform: ${Platform.OS}, FCM Token: ${fcmToken}`);
      } else {
        Logger.log('Notifications disabled by user.');
      }
    }
    const timeout = setTimeout(() => {
      setupNotifications();
    }, 1000);
    return () => clearTimeout(timeout);
  }, [getFCMToken, requestPermission]);

  return (
    <Stack>
      <Stack.Screen
        name="login"
        options={{ title: 'Login', headerShown: false }}
      />
      <Stack.Screen name="otp" options={{ title: 'OTP', headerShown: false }} />
    </Stack>
  );
}
