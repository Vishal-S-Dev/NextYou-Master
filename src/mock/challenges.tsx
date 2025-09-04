//---------------------------------------------------------------------
// Mock data (replace with API call / props as needed)

import { type MockChallenge } from '@/types';

//---------------------------------------------------------------------
export const challenges: MockChallenge[] = [
  {
    id: '1',
    title: '7 days challenge',
    desc: 'Gut Health Boost challenge',
    price: 2499,
    image: require('@assets/images/recommended/gut_health.png'), // placeholder asset path
    recommended: true,
  },
  {
    id: '2',
    title: '90 days challenge',
    desc: 'Complete Gut Reset Challenge',
    price: 24999,
    image: require('@assets/images/recommended/gut_reset.png'),
    recommended: true,
  },
  {
    id: '3',
    title: '7 days Mind Declutter Challenge',
    desc: 'For anxiety & Stress disorder',
    price: 2499,
    image: require('@assets/images/recommended/mind_declutter.png'),
    recommended: false,
  },
  {
    id: '4',
    title: '7 Days Energy Booster Challenge',
    desc: 'For brain fog , low energy, irritation',
    price: 2499,
    image: require('@assets/images/recommended/energy_booster.png'),
    recommended: false,
  },
];
