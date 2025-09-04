import { type ImageURISource } from 'react-native';

export type ItemType = 'video' | 'image';

export type DataItem = {
  id: number;
  source: ImageURISource | { uri: string } | number;
  title: string;
  text: string;
  type: ItemType;
};
