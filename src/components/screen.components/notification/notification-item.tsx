import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';

import { colors } from '@/lib';
import { type Notification } from '@/types';
interface Props {
  item: Notification;
  onDelete: () => void;
  onPress?: () => void;
}

export const NotificationItem: React.FC<Props> = ({ item, onDelete }) => {
  const renderRightActions = () => (
    <TouchableOpacity style={styles.deleteButton} onPress={onDelete}>
      <Ionicons name="trash" size={24} color="#fff" />
    </TouchableOpacity>
  );

  return (
    <Swipeable renderRightActions={renderRightActions}>
      {/* <TouchableOpacity style={styles.deleteButton} onPress={onPress}> */}
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <View style={styles.row}>
            {item.unread && <View style={styles.dot} />}
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.time}>{item.time}</Text>
          </View>
          <Text style={styles.message}>{item.message}</Text>
        </View>
      </View>
      {/* </TouchableOpacity> */}
    </Swipeable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.bg,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
  },
  textContainer: {
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    backgroundColor: '#4b6ef5',
    borderRadius: 4,
    marginRight: 6,
  },
  title: {
    fontWeight: 'bold',
    flex: 1,
    fontSize: 14,
  },
  time: {
    fontSize: 12,
    color: '#999',
  },
  message: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
  deleteButton: {
    backgroundColor: '#f44336',
    justifyContent: 'center',
    alignItems: 'center',
    width: 64,
    height: '100%',
  },
});
