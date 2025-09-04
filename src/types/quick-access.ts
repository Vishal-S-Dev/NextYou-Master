import { type SvgProps } from 'react-native-svg';

export type QuickAccess = {
  id: string;
  icon: React.FC<SvgProps>; // Accepts any SVG component
  label: string;
};
