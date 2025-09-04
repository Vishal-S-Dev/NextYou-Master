// /data/mockData.js

import { Community, MealPlan, MyActivities, MySessions } from '@/icons';
import type {
  HealthTip,
  PastSession,
  QuickAccess,
  SubscriptionPlan,
  TaskDetails,
} from '@/types';

export const rewards = { points: 560, goal: 1000 };

export const tasks: TaskDetails[] = [
  {
    _id: '1',
    type: 'task-0',
    bannerImage: require('@assets/images/task/mood.png'),
    title: 'Wake Up check-in, we will provide sleep early nudge tonight',
    points: 10,
    scheduledDate: '2023-10-01T08:00:00Z',
    status: 'pending',
  },
  {
    _id: '2',
    type: 'task-1',
    bannerImage: require('@assets/images/task/warm_water.png'),
    title:
      'Drink 1 L water empty stomach with pinch of salt + lemon , you need to get lemon today',
    points: 50,
    scheduledDate: '2023-10-01T08:00:00Z',
    status: 'pending',
  },
  {
    _id: '3',
    type: 'task-2',
    bannerImage: require('@assets/images/recommended/mind_declutter.png'),
    title: 'Tummy clearing Yoga Flow',
    subTitle: 'Enable your camera to get Rs 500 NYC!',
    points: 500,
    scheduledDate: '2023-10-01T08:00:00Z',
    status: 'pending',
  },
  {
    _id: '4',
    type: 'task-3',
    bannerImage: require('@assets/images/task/towel_rub.png'),
    title: 'Wet Towel rub before lunch check-in',
    points: 20,
    scheduledDate: '2023-10-01T08:00:00Z',
    status: 'pending',
  },
  {
    _id: '5',
    type: 'task-4',
    bannerImage: require('@assets/images/task/meditation.png'),
    title: 'Breathwork + Guided meditation task',
    subTitle:
      'Enable your smart device to track heart rate and stress levels + complete the task to get 250 NYC.',
    points: 100,
    scheduledDate: '2023-10-01T08:00:00Z',
    status: 'pending',
  },
];

export const subscriptions: SubscriptionPlan[] = [
  {
    id: '1',
    title: '7 days challenge',
    desc: 'Gut Health Boost challenge',
    price: 2499,
    image: require('@assets/images/recommended/gut_health.png'),
    recommended: true,
    progress: 40,
    totalSessions: 10,
    completedSessions: 4,
  },
  {
    id: '2',
    title: '7 days Mind Declutter Challenge',
    desc: 'For anxiety & Stress disorder',
    price: 2499,
    image: require('@assets/images/recommended/mind_declutter.png'),
    recommended: false,
    progress: 90,
    totalSessions: 5,
    completedSessions: 4,
  },
];

export const quickAccess: QuickAccess[] = [
  { id: '1', icon: MySessions, label: 'My Sessions' },
  { id: '2', icon: MyActivities, label: 'My Activities' },
  { id: '3', icon: MealPlan, label: 'Meal Plan' },
  { id: '4', icon: Community, label: 'Community' },
];

export const activityData = [20, 45, 28, 80, 99, 43, 50];

export const sessions = [
  { id: 'ps1', title: 'Guided Yoga' },
  { id: 'ps2', title: 'Immunity Workout' },
];

export const pastSessions: PastSession[] = [
  {
    id: '1',
    image: require('@assets/images/recommended/gut_health.png'),
    title: 'Guided Yoga',
    desc: 'Gut Health Boost challenge',
    duration: 12,
    calories: 120,
    isFavorite: true,
  },
  {
    id: '2',
    image: require('@assets/images/recommended/mind_declutter.png'),
    title: 'Immunity Workout',
    desc: 'Gut Health Boost challenge',
    duration: 10,
    calories: 100,
    isFavorite: false,
  },
  {
    id: '3',
    image: require('@assets/images/recommended/gut_reset.png'),
    title: 'Meditation',
    desc: 'Gut Health Boost challenge',
    duration: 12,
    calories: 120,
    isFavorite: false,
  },
];

export const healthTip: HealthTip = {
  title: 'Carrot And Orange Smoothie',
  imageUrl:
    'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=800',
  time: '10 Minutes',
  calories: '70 Cal',
  tag: 'Recipe Of The Day',
};

export const meditation = {
  title: 'Relaxing Music',
};

export const stories = [
  {
    id: 'story1',
    name: 'Sharon J',
    feedback:
      'They pushed me at the right time, adjusted the workouts, and helped me to my limits.',
  },
];
