// healthkitPermissions.ts
import BrokenHealthKit from 'react-native-health';

import { type HealthPermission } from '@/types';

// const HK = BrokenHealthKit.Constants.Permissions;
const NativeModules = require('react-native').NativeModules;
const AppleHealthKit = NativeModules.AppleHealthKit as typeof BrokenHealthKit;

// const permissions = {
//   permissions: {
//     read: [HK.StepCount, HK.HeartRate, HK.ActiveEnergyBurned, HK.SleepAnalysis],
//     write: [],
//   },
// } as HealthKitPermissions;

export async function requestHealthKitPermissions(): Promise<boolean> {
  AppleHealthKit.Constants = BrokenHealthKit.Constants;

  return new Promise((resolve) => {
    const options = {
      permissions: {
        read: [
          AppleHealthKit.Constants.Permissions.StepCount,
          AppleHealthKit.Constants.Permissions.HeartRate,
          AppleHealthKit.Constants.Permissions.HeartRateVariability,
          AppleHealthKit.Constants.Permissions.HeartbeatSeries,
          AppleHealthKit.Constants.Permissions.SleepAnalysis,
        ],
        write: [],
      },
    };

    AppleHealthKit.initHealthKit(options, (err) => {
      if (err) {
        console.error('Error initializing HealthKit:', err);
        resolve(false);
      } else {
        resolve(true);
      }
    });

    // AppleHealthKit.initHealthKit(permissions, (err) => {
    //   if (err) {
    //     resolve(false);
    //   } else {
    //     resolve(true);
    //   }
    // });
  });
}

export async function checkHealthKitPermissions(): Promise<HealthPermission[]> {
  const results: HealthPermission[] = [
    { id: 'steps', label: 'Steps', granted: null },
    { id: 'heartRate', label: 'Heart Rate', granted: null },
    { id: 'calories', label: 'Calories Burned', granted: null },
    { id: 'sleep', label: 'Sleep', granted: null },
  ];

  return new Promise((resolve) => {
    AppleHealthKit.isAvailable(async (err, available) => {
      if (err || !available)
        return resolve(results.map((p) => ({ ...p, granted: false })));

      // Try a sample query for each type:
      AppleHealthKit.getStepCount({}, (err2) => {
        results[0].granted = !err2;
        resolve(results);
      });
      // NOTE: For full coverage, repeat with other APIs like getHeartRateSamples, getActiveEnergyBurned, etc.
    });
  });
}
