import '@react-native-firebase/app';

import messaging from '@react-native-firebase/messaging';
import { useCallback, useRef } from 'react';
import { Platform } from 'react-native';

const useNotificationService = () => {
  const notificationListeners = useRef<(() => void)[]>([]);

  // Request notification permission
  const requestPermission = useCallback(async () => {
    try {
      const authStatus = await messaging().requestPermission();
      console.log('Authorization status:', authStatus);
      if (Platform.OS === 'ios') {
        const enabled =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;
        if (enabled) {
          await messaging().registerDeviceForRemoteMessages();
        }
        return enabled;
      } else {
        return authStatus;
      }
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      return false;
    }
  }, []);

  // Get FCM token
  const getFCMToken = useCallback(async () => {
    try {
      const token = await messaging().getToken();
      console.log('FCM Token:', token);
      return token;
    } catch (error) {
      console.error('Error getting FCM token:', error);
      return null;
    }
  }, []);

  // Display local notification
  const displayLocalNotification = useCallback(async (remoteMessage: any) => {
    console.log('Displaying local notification:', remoteMessage);
    // try {
    //   await notifee.requestPermission();

    //   const channelId = await notifee.createChannel({
    //     id: 'default',
    //     name: 'Default Channel',
    //   });

    //   await notifee.displayNotification({
    //     title: remoteMessage.notification?.title || remoteMessage.data?.title,
    //     body: remoteMessage.notification?.body || remoteMessage.data?.body,
    //     data: remoteMessage.data,
    //     android: {
    //       channelId,
    //       pressAction: {
    //         id: 'default',
    //       },
    //     },
    //     ios: {
    //       foregroundPresentationOptions: {
    //         alert: true,
    //         badge: true,
    //         sound: true,
    //       },
    //     },
    //   });
    // } catch (error) {
    //   console.error('Error displaying local notification:', error);
    // }
  }, []);

  // Background message handler
  const setupBackgroundHandler = useCallback(() => {
    messaging().setBackgroundMessageHandler(async (remoteMessage) => {
      console.log('Background notification:', remoteMessage);
      // You can handle background notifications here
    });
  }, []);

  // Foreground message handler
  const setupForegroundHandler = useCallback(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      console.log('Foreground notification:', remoteMessage);
      await displayLocalNotification(remoteMessage);
    });

    return unsubscribe;
  }, [displayLocalNotification]);

  // Notification opened handler
  const setupNotificationOpenHandler = useCallback(() => {
    const unsubscribeOpened = messaging().onNotificationOpenedApp(
      (remoteMessage) => {
        console.log('Notification opened app:', remoteMessage);
        // Handle navigation or other actions when notification is tapped
      }
    );

    // Check if app was launched from notification
    messaging()
      .getInitialNotification()
      .then((remoteMessage) => {
        if (remoteMessage) {
          console.log('Launched from notification:', remoteMessage);
        }
      });

    return unsubscribeOpened;
  }, []);

  // Token refresh handler
  const setupTokenRefreshHandler = useCallback(() => {
    const unsubscribe = messaging().onTokenRefresh((token) => {
      console.log('FCM token refreshed:', token);
      // Send new token to your backend
    });

    return unsubscribe;
  }, []);

  const setupAPNSTokenHandler = useCallback(() => {
    // Debug APNS token
    messaging()
      .getAPNSToken()
      .then((apns) => {
        console.log('APNS token:', apns);
      });
  }, []);

  // Initialize all notification handlers
  const initializeNotifications = useCallback(async () => {
    try {
      setupAPNSTokenHandler();

      setupBackgroundHandler();

      const foregroundUnsubscribe = setupForegroundHandler();
      const openUnsubscribe = setupNotificationOpenHandler();
      const tokenRefreshUnsubscribe = setupTokenRefreshHandler();

      notificationListeners.current.push(
        foregroundUnsubscribe,
        openUnsubscribe,
        tokenRefreshUnsubscribe
      );

      // Check initial notification
      const initialNotification = await messaging().getInitialNotification();
      if (initialNotification) {
        console.log('App launched from notification:', initialNotification);
      }

      return true;
    } catch (error) {
      console.error('Error initializing notifications:', error);
      return false;
    }
  }, [
    setupAPNSTokenHandler,
    setupBackgroundHandler,
    setupForegroundHandler,
    setupNotificationOpenHandler,
    setupTokenRefreshHandler,
  ]);

  // Cleanup function
  const cleanupNotifications = useCallback(() => {
    notificationListeners.current.forEach((unsubscribe) => {
      if (unsubscribe && typeof unsubscribe === 'function') {
        unsubscribe();
      }
    });
    notificationListeners.current = [];
  }, []);

  return {
    requestPermission,
    getFCMToken,
    displayLocalNotification,
    initializeNotifications,
    cleanupNotifications,
  };
};

export default useNotificationService;
