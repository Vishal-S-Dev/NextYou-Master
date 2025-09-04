import { type DataItem } from '@/types';

export const data: DataItem[] = [
  {
    id: 1,
    source: require('@assets/onboarding/yoga_into_video.mp4'),
    title: 'Lorem Ipsum..',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    type: 'video',
  },
  {
    id: 2,
    source: require('@assets/onboarding/Image-2.png'),
    title: '..Lorem Ipsum',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    type: 'image',
  },
  {
    id: 3,
    source: require('@assets/onboarding/Image-2.png'),
    title: '*Lorem Ipsum*',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    type: 'image',
  },
];
