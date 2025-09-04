import { cssInterop } from 'nativewind';
import Svg from 'react-native-svg';

export * from './button';
export * from './checkbox';
export * from './focus-aware-status-bar';
export * from './gradient-wrapper';
export * from './image';
export * from './input';
export * from './input-otp';
export * from './input-select-box';
export * from './input-slider';
export * from './list';
export * from './loader';
export * from './modal';
export * from './nav-header';
export * from './progress-bar';
export * from './rating';
export * from './select';
export * from './text';
export * from './utils';

// export base components from react-native
export {
  ActivityIndicator,
  Pressable,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
export { SafeAreaView } from 'react-native-safe-area-context';

//Apply cssInterop to Svg to resolve className string into style
cssInterop(Svg, {
  className: {
    target: 'style',
  },
});
