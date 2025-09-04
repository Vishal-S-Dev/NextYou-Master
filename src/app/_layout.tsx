// Import  global CSS file
import '../../global.css';
import '@react-native-firebase/app';

import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { ThemeProvider } from '@react-navigation/native';
import * as Network from 'expo-network';
import * as Notifications from 'expo-notifications';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { useCallback, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import FlashMessage, {
  hideMessage,
  showMessage,
} from 'react-native-flash-message';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { KeyboardProvider } from 'react-native-keyboard-controller';

import { APIProvider } from '@/api';
import { ModalProvider } from '@/components/message.model/message-model-context';
import { loadSelectedTheme } from '@/hooks';
import useNotificationHandler from '@/hooks/use-notification-handler';
import { useAppFonts, useThemeConfig } from '@/lib';
import { Logger } from '@/lib/logger';
import { hydrateAuth } from '@/store';

export { ErrorBoundary } from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(app)',
};

Notifications.setNotificationHandler({
  handleNotification: async (notification) => {
    Logger.log('Notification received:', notification);
    return {
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    };
  },
});

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
// Set the animation options. This is optional.
SplashScreen.setOptions({
  duration: 1000,
  fade: true,
});

hydrateAuth();
loadSelectedTheme();

export default function RootLayout() {
  const fontsLoaded = useAppFonts();

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  //Network Check
  useEffect(() => {
    const checkConnection = async () => {
      const { isConnected } = await Network.getNetworkStateAsync();
      if (!isConnected) {
        showMessage({
          message: 'No Internet Connection',
          description: 'Please check your connection.',
          type: 'danger',
          autoHide: false, // 👈 keep visible until manually hidden
          floating: true,
        });
      }
    };

    // Initial check
    checkConnection();

    // Subscribe to connectivity changes
    const subscription = Network.addNetworkStateListener((state) => {
      if (!state.isConnected) {
        showMessage({
          message: 'No Internet Connection',
          description: 'Please check your connection.',
          type: 'danger',
          autoHide: false,
          floating: true,
        });
      } else {
        hideMessage(); // 👈 hide when back online
        showMessage({
          message: 'Back Online',
          type: 'success',
          autoHide: true, // show briefly then auto hide
          duration: 2000,
          floating: true,
        });
      }
    });

    return () => subscription.remove();
  }, []);

  const { handleNotificationNavigation: _handleNotificationNavigation } =
    useNotificationHandler();

  if (!fontsLoaded) return null;

  return (
    <GestureHandlerRootView
      style={styles.container}
      //className={theme.dark ? `dark` : undefined}
    >
      <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
        <Providers>
          <Stack>
            <Stack.Screen name="(app)" options={{ headerShown: false }} />
            <Stack.Screen name="onboarding" options={{ headerShown: false }} />
            <Stack.Screen name="auth" options={{ headerShown: false }} />
            <Stack.Screen name="basic-info" options={{ headerShown: false }} />
            <Stack.Screen name="assessment" options={{ headerShown: false }} />
            <Stack.Screen name="challenges" options={{ headerShown: false }} />
            <Stack.Screen
              name="app-agreement"
              options={{
                headerShown: false,
                presentation: 'fullScreenModal',
                animation: 'slide_from_bottom',
                title: 'Terms and Condition',
              }}
            />
            <Stack.Screen
              name="day-0"
              options={{
                headerShown: false,
                presentation: 'fullScreenModal',
                animation: 'slide_from_bottom',
              }}
            />
            <Stack.Screen name="task-1" options={{ headerShown: false }} />
            <Stack.Screen name="task-2" options={{ headerShown: false }} />
            <Stack.Screen name="task-3" options={{ headerShown: false }} />
            <Stack.Screen
              name="task-4/index"
              options={{ headerShown: false }}
            />
            <Stack.Screen name="notification" options={{ headerShown: true }} />
          </Stack>
        </Providers>
      </View>
    </GestureHandlerRootView>
  );
}

function Providers({ children }: { children: React.ReactNode }) {
  const theme = useThemeConfig();
  return (
    <KeyboardProvider>
      <ThemeProvider value={theme}>
        <APIProvider>
          <BottomSheetModalProvider>
            <ModalProvider>
              {children}
              <FlashMessage position="top" />
            </ModalProvider>
          </BottomSheetModalProvider>
        </APIProvider>
      </ThemeProvider>
    </KeyboardProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
