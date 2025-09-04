// googleFitPermissions.ts
import GoogleFit, { Scopes } from 'react-native-google-fit';

import { type HealthPermission } from '@/types';

const options = {
  scopes: [
    Scopes.FITNESS_ACTIVITY_READ,
    Scopes.FITNESS_HEART_RATE_READ,
    Scopes.FITNESS_SLEEP_READ,
    Scopes.FITNESS_NUTRITION_READ,
  ],
};

export async function requestGoogleFitPermissions(): Promise<boolean> {
  try {
    const result = await GoogleFit.authorize(options);
    return result.success;
  } catch {
    return false;
  }
}

export async function checkGoogleFitPermissions(): Promise<HealthPermission[]> {
  const isAuthorized = GoogleFit.isAuthorized;

  return [
    { id: 'steps', label: 'Steps', granted: isAuthorized },
    { id: 'heartRate', label: 'Heart Rate', granted: isAuthorized },
    { id: 'calories', label: 'Calories Burned', granted: isAuthorized },
    { id: 'sleep', label: 'Sleep', granted: isAuthorized },
  ];
}
