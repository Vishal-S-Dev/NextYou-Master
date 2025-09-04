/** Preference options */
import { type Ionicons } from '@expo/vector-icons';
type ValidIconName = keyof typeof Ionicons.glyphMap;

export interface DietaryPreference {
  id: string;
  title: string;
  subtitle: string;
  icon: ValidIconName;
}

export const preferenceOptions: DietaryPreference[] = [
  {
    id: 'plant',
    title: 'Plant Based',
    subtitle: 'Vegan',
    icon: 'leaf',
  },
  {
    id: 'carbo',
    title: 'Carbo Diet',
    subtitle: 'Bread, etc',
    icon: 'barbell',
  },
  {
    id: 'spec',
    title: 'Specialized',
    subtitle: 'Paleo, keto, etc',
    icon: 'restaurant',
  },
  {
    id: 'trad',
    title: 'Traditional',
    subtitle: 'Fruit diet',
    icon: 'nutrition',
  },
];
