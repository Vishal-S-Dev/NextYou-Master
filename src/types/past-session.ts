import { type ImageSourcePropType } from 'react-native';

export interface PastSession {
  id: string;
  image: ImageSourcePropType;
  title: string;
  desc: string;
  duration: number;
  calories: number;
  isFavorite: boolean;
}
