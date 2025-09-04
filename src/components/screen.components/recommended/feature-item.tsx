import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import React, { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Font } from '@/lib';

// -----------------------------------------------------------------------------
// Types
// -----------------------------------------------------------------------------

type FeatureItemProps = {
  icon?: keyof typeof Icon.glyphMap;
  label: string;
};

// -----------------------------------------------------------------------------
// Components
// -----------------------------------------------------------------------------

export const FeatureItem = memo<FeatureItemProps>(
  ({ icon = 'checkbox-marked', label }) => (
    <View style={styles.featureRow}>
      <Icon name={icon} size={20} color="#6549ef" style={styles.featureIcon} />
      <Text style={styles.featureText}>{label}</Text>
    </View>
  )
);

const styles = StyleSheet.create({
  featureRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  featureIcon: { marginRight: 10, marginTop: 2 },
  featureText: {
    flex: 1,
    fontFamily: Font.Inter_600SemiBold,
    fontSize: 12,
    color: '#161616',
  },
});
