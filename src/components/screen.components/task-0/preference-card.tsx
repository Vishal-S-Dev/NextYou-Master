import {
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { colors } from '@/lib';

/** Preference card ----------------------------------------------------*/
interface PreferenceCardProps {
  title: string;
  subtitle: string;
  icon?: React.ReactNode;
  active?: boolean;
  onPress?: () => void;
}

const { width } = Dimensions.get('window');

export const PreferenceCard: React.FC<PreferenceCardProps> = ({
  title,
  subtitle,
  icon,
  active,
  onPress,
}) => {
  const getShadowStyle = () => {
    if (Platform.OS === 'ios') {
      return styles.iosShadow;
    } else if (Platform.OS === 'android') {
      return styles.androidShadow;
    }
    return {}; // web or unknown
  };

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[
        styles.prefCard,
        getShadowStyle(),
        active && styles.prefCardActive,
      ]}
    >
      <View style={styles.prefTextWrapper}>
        <Text style={styles.prefTitle}>{title}</Text>
        <Text style={styles.prefSubtitle}>{subtitle}</Text>
      </View>
      <View style={styles.prefIconWrapper}>{icon}</View>
    </TouchableOpacity>
  );
};

const PADDING = 20;
const CARD_GAP = 14;

const styles = StyleSheet.create({
  prefCard: {
    width: (width - PADDING * 2 - CARD_GAP) / 2,
    padding: 16,
    backgroundColor: '#fff',
    borderWidth: 0.0,
    borderColor: colors.neutral[700],
    borderRadius: 10,
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
  },
  iosShadow: {
    shadowColor: '#3b82f6',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  androidShadow: {
    elevation: 2,
  },
  prefCardActive: {
    borderWidth: 1,
    backgroundColor: '#f0e8ff',
    borderColor: '#6c4cff',
  },
  prefTextWrapper: { marginBottom: 20 },
  prefTitle: { fontWeight: '700', fontSize: 16, marginBottom: 1 },
  prefSubtitle: { fontSize: 14, color: '#666' },
  prefIconWrapper: { flexDirection: 'row', justifyContent: 'flex-end' },
});

// export default memo(PreferenceCard);
