import { type Font } from '@/lib';

export type HomeSection = {
  componentID: string;
  title: string;
  subTitle?: string;
  backgroundColor: string;
  textColor: string;
  fontSize?: number;
  font?: Font;
};

export interface Section {
  section: HomeSection;
  data: string[];
}
