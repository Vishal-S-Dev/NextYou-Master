/* eslint-disable max-lines-per-function */
import type { ConfigContext, ExpoConfig } from '@expo/config';
import type { AppIconBadgeConfig } from 'app-icon-badge/types';

import { ClientEnv, Env } from './env';

const appIconBadgeConfig: AppIconBadgeConfig = {
  enabled: Env.APP_ENV !== 'production',
  badges: [
    {
      text: Env.APP_ENV,
      type: 'banner',
      color: 'white',
    },
    {
      text: Env.VERSION.toString(),
      type: 'ribbon',
      color: 'white',
    },
  ],
};

export default ({ config }: ConfigContext): ExpoConfig => {
  // const googleServicesJson = `./google-services.${Env.APP_ENV}.json`;
  // const googleServicesPlist = `./GoogleService-Info.${Env.APP_ENV}.plist`;

  return {
    ...config,
    name: Env.NAME,
    description: `${Env.NAME} Mobile App`,
    owner: Env.EXPO_ACCOUNT_OWNER,
    scheme: Env.SCHEME,
    slug: 'nextyou',
    version: Env.VERSION.toString(),
    orientation: 'portrait',
    icon: './assets/icon.png',
    userInterfaceStyle: 'light',
    newArchEnabled: true,
    updates: {
      fallbackToCacheTimeout: 0,
    },
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#4F2BDA',
    },
    notification: {
      icon: './assets/notification-icon.png',
      color: '#ffffff',
    },
    assetBundlePatterns: ['**/*'],
    experiments: {
      typedRoutes: true,
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: Env.BUNDLE_ID,
      config: {
        usesNonExemptEncryption: false, // Avoid the export compliance warning on the app store
      },
      splash: {
        image: './assets/splash.png',
        resizeMode: 'contain',
        backgroundColor: '#4F2BDA',
      },
      userInterfaceStyle: 'light',
      infoPlist: {
        NSAppTransportSecurity: {
          NSAllowsArbitraryLoads: true,
        },
        UIBackgroundModes: ['remote-notification'],
      },
      entitlements: {
        'aps-environment': 'production',
      },
      googleServicesFile: './GoogleService-Info.plist',
    },
    android: {
      adaptiveIcon: {
        foregroundImage: './assets/adaptive-icon.png',
        backgroundColor: '#2E3C4B',
      },
      package: Env.PACKAGE,
      userInterfaceStyle: 'light',
      googleServicesFile: './google-services.json',
      permissions: [
        'android.permission.health.READ_STEPS',
        'android.permission.health.READ_ACTIVE_CALORIES_BURNED',
      ],
    },
    androidNavigationBar: {
      backgroundColor: '#fff',
    },
    web: {
      favicon: './assets/favicon.png',
      bundler: 'metro',
    },
    plugins: [
      [
        'expo-splash-screen',
        {
          backgroundColor: '#4F2BDA',
          image: './assets/splash-icon.png',
          imageWidth: 240,
        },
      ],
      [
        'expo-font',
        {
          fonts: ['./assets/fonts/Inter.ttf'],
        },
      ],
      'expo-localization',
      'expo-router',
      ['app-icon-badge', appIconBadgeConfig],
      ['react-native-edge-to-edge'],
      [
        'expo-av',
        {
          microphonePermission:
            'Allow $(PRODUCT_NAME) to access your microphone.',
        },
      ],
      [
        'expo-video',
        {
          supportsBackgroundPlayback: false,
          supportsPictureInPicture: false,
        },
      ],
      ['react-native-video'],
      [
        'expo-calendar',
        {
          calendarPermission: 'The app needs to access your calendar.',
        },
      ],
      'expo-notifications',
      '@react-native-firebase/app',
      '@react-native-firebase/messaging',
      '@react-native-firebase/crashlytics',
      [
        'expo-build-properties',
        {
          ios: {
            useFrameworks: 'static',
          },
        },
      ],
      ['expo-health-connect'],
      [
        'react-native-health',
        {
          isClinicalDataEnabled: true,
          healthSharePermission: 'Custom health share permission',
          healthUpdatePermission: 'Custom health update permission',
          healthClinicalDescription:
            'Custom health share permission for clinical data',
        },
      ],
    ],
    extra: {
      ...ClientEnv,
      eas: {
        projectId: Env.EAS_PROJECT_ID,
      },
    },
  };
};
