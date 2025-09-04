import { type ImageSourcePropType } from 'react-native';

export interface MockChallenge {
  id: string;
  title: string;
  desc: string;
  price: number;
  image: ImageSourcePropType;
  recommended?: boolean;
}

export interface SubscriptionPlan extends MockChallenge {
  progress: number;
  totalSessions: number;
  completedSessions: number;
}
