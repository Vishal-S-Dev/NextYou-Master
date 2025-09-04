import messaging from '@react-native-firebase/messaging';
import { useCallback, useEffect } from 'react';

import useNotificationService from '@/hooks/use-notification-service';

const useNotificationHandler = () => {
  const { initializeNotifications, cleanupNotifications } =
    useNotificationService();

  // Handle notification data for navigation
  const handleNotificationNavigation = useCallback((remoteMessage: any) => {
    const { data } = remoteMessage;

    if (data?.screen) {
      // Navigate to specific screen based on notification data
      switch (data.screen) {
        case 'profile':
          console.log('Navigating to Profile screen');
          break;
        case 'settings':
          console.log('Navigating to Settings screen');
          break;
        case 'order':
          if (data.orderId) {
            console.log('Navigating to OrderDetails screen');
          }
          break;
        default:
          console.log('Unknown screen:', data.screen);
      }
    }
  }, []);

  // Setup notification handlers with navigation
  const setupNotificationHandlers = useCallback(async () => {
    // Custom handler for notification opens
    const customOpenHandler = (remoteMessage: any) => {
      console.log('Custom notification handler:', remoteMessage);
      handleNotificationNavigation(remoteMessage);
    };

    // You can override default handlers here
    messaging().onNotificationOpenedApp(customOpenHandler);

    // Initialize the base notification service
    await initializeNotifications();
  }, [initializeNotifications, handleNotificationNavigation]);

  useEffect(() => {
    setupNotificationHandlers();

    return () => {
      cleanupNotifications();
    };
  }, [setupNotificationHandlers, cleanupNotifications]);

  return {
    handleNotificationNavigation,
  };
};

export default useNotificationHandler;
