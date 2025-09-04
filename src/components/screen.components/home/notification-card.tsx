// NotificationCard.tsx

import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Medal } from '@/icons';
import { type Notification } from '@/types';

type Props = {
  item?: Notification;
  index?: number;
};

const NotificationCard: React.FC<Props> = ({ item }) => {
  return (
    <LinearGradient colors={['#5C61FF', '#F8ACFF']} style={styles.card}>
      <Medal />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item?.title}</Text>
        <Text style={styles.subtitle}>You will earn points - 300pts</Text>
      </View>
      {/* <Feather name="arrow-up-right" size={20} color="#000" /> */}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    gap: 12,
    backgroundColor: '#fff',
  },
  iconContainer: {
    backgroundColor: '#fff',
    padding: 8,
    borderRadius: 999,
    // marginRight: 12,
  },
  textContainer: {
    // backgroundColor: 'red',
    flex: 1,
  },
  title: {
    fontWeight: '600',
    fontSize: 16,
    color: '#000',
  },
  subtitle: {
    fontSize: 12,
    color: '#000',
    opacity: 0.7,
    marginTop: 2,
  },
});

export default NotificationCard;
