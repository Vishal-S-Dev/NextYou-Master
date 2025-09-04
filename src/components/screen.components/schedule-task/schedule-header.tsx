import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Font } from '@/lib';

interface ScheduleHeaderProps {
  dateStatus: string;
  onDayPress?: (day: string) => void;
}

const ScheduleHeader = ({ dateStatus: _status }: ScheduleHeaderProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.rowContainer}>
        <View
          className={
            'flex-row items-center justify-center gap-2 rounded-lg bg-[#E6E9FF] px-2 py-1'
          }
        >
          <FontAwesome name="calendar" size={16} color="#4F2BDA" />
          <Text style={styles.date}>Apr 5, 2025</Text>
        </View>
        <TouchableOpacity>
          <View className={'flex-row items-center justify-center'}>
            <FontAwesome name={'calendar'} size={16} color="#D8683A" />
            <Text style={styles.syncText} className={'ms-2'} onPress={() => {}}>
              {`Sync With Your\nPhone’s Calendar`}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ScheduleHeader;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 16,
    gap: 12,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  date: {
    fontFamily: Font.IBMPlexSans_500Medium,
    fontSize: 12,
    color: '#4F2BDA',
    textAlign: 'center',
  },
  syncText: {
    color: '#D8683A',
    fontFamily: Font.Inter_500Medium,
    fontSize: 10,
    textDecorationLine: 'underline',
  },
  taskText: {
    color: '#000',
    fontFamily: Font.IBMPlexSans_600SemiBold,
    fontSize: 18,
  },
});
