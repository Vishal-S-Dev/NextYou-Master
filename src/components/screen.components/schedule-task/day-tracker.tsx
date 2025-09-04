import AntDesign from '@expo/vector-icons/AntDesign';
import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { type TasksByDay } from '@/types';

type DayTrackerProps = {
  days: TasksByDay[];
  taskDay: number;
  selectedDay: number;
  onDayPress?: (day: TasksByDay) => void;
};

const DayTracker: React.FC<DayTrackerProps> = ({
  days,
  taskDay,
  selectedDay,
  onDayPress,
}) => {
  const handlePress = (item: TasksByDay) => {
    // setSelectedDay(item.day);
    onDayPress?.(item); // callback to parent
  };

  const renderItem = ({ item }: { item: TasksByDay }) => {
    const isSelected = item.day === selectedDay;

    return (
      <TouchableOpacity
        style={[styles.dayContainer, isSelected && styles.selectedDay]}
        onPress={() => handlePress(item)}
      >
        {item.day < taskDay && (
          <AntDesign name="checkcircle" size={20} color="#12C78D" />
        )}

        <Text style={[styles.dayText, isSelected && { color: '#fff' }]}>
          Day {item.day}
        </Text>

        {item.day === taskDay && (
          <View
            style={[
              styles.todayIcon,
              isSelected && { backgroundColor: '#fff' },
            ]}
          />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      horizontal
      data={days}
      renderItem={renderItem}
      keyExtractor={(item, index) => `${item.day}-${index}`}
      contentContainerStyle={styles.listContainer}
      showsHorizontalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    gap: 10,
    paddingHorizontal: 10,
  },
  dayContainer: {
    paddingHorizontal: 8,
    paddingVertical: 16,
    borderRadius: 25,
    backgroundColor: '#EDF6FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedDay: {
    backgroundColor: '#6B4AEA',
  },
  dayText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#333',
  },
  subText: {
    fontSize: 10,
    color: '#777',
    marginTop: 4,
  },
  checkIconContainer: {
    marginBottom: 4,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#12C78D',
    justifyContent: 'center',
    alignItems: 'center',
  },
  uncheckIconContainer: {
    marginBottom: 4,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  todayIcon: {
    backgroundColor: '#6B4AEA',
    position: 'absolute',
    width: 6,
    height: 6,
    borderRadius: 8,
    bottom: 6,
  },
});

export default DayTracker;
