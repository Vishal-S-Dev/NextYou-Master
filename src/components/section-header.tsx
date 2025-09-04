import React, { memo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Font } from '@/lib';

type SectionHeaderProps = {
  title: string;
  subtext?: string;
  showSeeAll?: boolean;
  onSeeAllPress?: () => void;
};

const SectionHeader = ({
  title,
  subtext,
  showSeeAll = false,
  onSeeAllPress,
}: SectionHeaderProps) => {
  return (
    <View style={styles.container}>
      {/* Top row: title + see all */}
      <View style={styles.topRow}>
        <Text style={styles.title}>{title}</Text>
        {showSeeAll && (
          <TouchableOpacity onPress={onSeeAllPress}>
            <Text style={styles.seeAll}>See All ➔</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Subtext below */}
      {subtext ? <Text style={styles.subtext}>{subtext}</Text> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: { fontFamily: Font.IBMPlexSans_600SemiBold, fontSize: 18 },
  subtext: {
    fontFamily: Font.IBMPlexSans_400Regular,
    fontSize: 12,
    color: '#777',
    marginTop: 4,
  },
  seeAll: {
    fontFamily: Font.Inter_500Medium,
    fontSize: 14,
    color: '#ff4500',
  },
});

export default memo(SectionHeader);
