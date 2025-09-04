import { useEffect, useState } from 'react';
import { Platform } from 'react-native';

import { requestGoogleFitPermissions } from '@/lib/google-fit-permissions';
import { requestHealthKitPermissions } from '@/lib/health-kit-permissions';

export function useHealthPermissions() {
  const [granted, setGranted] = useState<boolean | null>(null);

  useEffect(() => {
    const request = async () => {
      try {
        if (Platform.OS === 'ios') {
          const ok = await requestHealthKitPermissions();
          console.log('HealthKit permissions granted:', ok);
          setGranted(ok);
        } else {
          const ok = await requestGoogleFitPermissions();
          console.log('Google Fit permissions granted:', ok);
          setGranted(ok);
        }
      } catch (error) {
        console.error('Error requesting health permissions:', error);
        setGranted(false);
      }
    };
    request();
  }, []);

  return granted; // true / false / null (loading)
}
