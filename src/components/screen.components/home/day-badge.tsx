import React, { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

type Props = {
  day: number;
};

const DayBadge = ({ day }: Props) => {
  return (
    <View style={styles.dayBadge}>
      <Text style={styles.dayBadgeText}>Day {day}</Text>
    </View>
  );
};
export default memo(DayBadge);

const styles = StyleSheet.create({
  dayBadge: {
    backgroundColor: '#EB846880',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginLeft: 16,
    marginBottom: 16,
    width: 80,
    alignItems: 'center',
  },
  dayBadgeText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 12,
  },
});
