import React, { memo } from 'react';
import { StyleSheet, Text } from 'react-native';

import { buildTodayTime, Font } from '@/lib';

interface Props {
  startTime: string;
  endTime?: string; // optional
}

const TimeRangeText: React.FC<Props> = ({ startTime, endTime }) => {
  const formatTime = (timeString?: string) => {
    const date = buildTodayTime(timeString);
    return date
      ? new Intl.DateTimeFormat('en-US', {
          hour: 'numeric',
          minute: 'numeric',
          hour12: true,
        }).format(date)
      : null;
  };

  const start = formatTime(startTime);
  const end = formatTime(endTime);

  if (!start) return <Text style={styles.timeText}>No schedule</Text>;
  return (
    <Text style={styles.timeText}>{end ? `${start} - ${end}` : start}</Text>
  );
};

const styles = StyleSheet.create({
  timeWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  timeText: {
    color: '#fff',
    fontFamily: Font.Inter_400Regular,
    fontSize: 12,
  },
});

export default memo(TimeRangeText);
