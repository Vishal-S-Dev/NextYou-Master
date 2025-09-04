import { Image } from 'expo-image';
import React, { useEffect, useMemo, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';

import { ImagePath } from '@/api';
import { buildTodayTime, Font, formatTime } from '@/lib';

import ProfileStack from './profile-stack';
import TimeRange from './time-range';

interface Props {
  imageSource: string;
  title: string;
  startTime?: string;
  endTime?: string;
  mustDo?: boolean;
  peoples?: string[];
}

const TimerCard: React.FC<Props> = ({
  imageSource,
  title,
  startTime,
  endTime,
  mustDo,
  peoples = [
    'https://i.pravatar.cc/50?img=12',
    'https://i.pravatar.cc/50?img=12',
    'https://i.pravatar.cc/50?img=12',
    'https://i.pravatar.cc/50?img=12',
  ],
}) => {
  // Example: task starts 10 seconds from now
  // const dateString = '2025-08-20T18:45:00Z'; // ISO string (UTC)

  // Force times to today’s date
  const taskStart = useMemo(() => buildTodayTime(startTime), [startTime]);
  const taskEnd = useMemo(() => buildTodayTime(endTime), [endTime]);

  const [timeLeft, setTimeLeft] = useState(
    taskStart ? taskStart.getTime() - Date.now() : 0
  );
  const [status, setStatus] = useState<
    'waiting' | 'running' | 'ended' | 'idle'
  >(taskStart ? 'waiting' : 'idle');

  useEffect(() => {
    if (!taskStart) return; // no startTime, skip timer

    const checkStatus = () => {
      const now = Date.now();
      const diff = taskStart.getTime() - now;
      const elapsed = now - taskStart.getTime();

      if (diff > 0) {
        setStatus('waiting');
        setTimeLeft(diff);
      } else if (elapsed >= 0 && (!taskEnd || now <= taskEnd.getTime())) {
        setStatus((prev) => {
          if (prev !== 'running') {
            handleTaskStart();
          }
          return 'running';
        });
      } else {
        setStatus('ended');
      }
    };

    checkStatus();
    const interval = setInterval(checkStatus, 1000);

    return () => clearInterval(interval);
  }, [taskStart, taskEnd]);

  const handleTaskStart = () => {
    Alert.alert('Yoga Started!', 'Yoga session has begun!');
  };

  return (
    <View style={styles.cardHeader}>
      <Image
        source={{ uri: ImagePath(imageSource) }}
        style={styles.cardImage}
      />
      <View style={styles.taskInfo}>
        <Text style={styles.taskTitle}>{title}</Text>

        {/* Only show time range if startTime exists */}
        {startTime ? (
          <TimeRange startTime={startTime} endTime={endTime} />
        ) : (
          <Text style={styles.taskNote}>No schedule</Text>
        )}

        {/* Timer */}
        {status === 'waiting' && (
          <Text style={styles.timerLabel}>
            Starting in <Text style={styles.timer}>{formatTime(timeLeft)}</Text>
          </Text>
        )}
        {status === 'running' && (
          <Text style={[styles.timer, { color: '#EB8468' }]}>Started!</Text>
        )}
        {/* {status === 'ended' && (
          <Text style={[styles.timer, { color: 'red' }]}>
            Yoga Session Ended!
          </Text>
        )} */}

        {/* Peoples */}
        {peoples.length > 0 && (
          <>
            <View style={{ height: 8 }} />
            <ProfileStack peoples={peoples} />
            <Text style={styles.peopleCount}>
              {peoples.length} {peoples.length === 1 ? 'Person' : 'People'} Plan
              to Workout
            </Text>
          </>
        )}
      </View>

      {mustDo && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Must Do</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    // alignItems: 'center',
    //marginBottom: 12,
  },
  cardImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 10,
    backgroundColor: '#ccc',
  },
  taskInfo: {
    flex: 1,
  },
  taskTitle: {
    color: '#fff',
    fontFamily: Font.IBMPlexSans_500Medium,
    fontSize: 14,
    marginBottom: 4,
  },
  timeWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    marginBottom: 4,
  },
  taskTime: {
    color: '#ddd',
    fontSize: 12,
  },
  badge: {
    position: 'absolute',
    backgroundColor: '#FF7E65',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    right: 0,
    top: 0,
  },
  badgeText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 10,
  },
  timerLabel: {
    color: '#fff',
    fontFamily: Font.Inter_400Regular,
    fontSize: 12,
  },
  timer: {
    color: '#fff',
    fontFamily: Font.IBMPlexSans_700Bold,
    fontSize: 20,
  },
  taskNote: {
    color: '#fff',
    fontFamily: Font.Inter_400Regular,
    fontSize: 13,
  },
  pointsContainer: {
    position: 'absolute',
    backgroundColor: '#f5e6e0',
    borderTopLeftRadius: 50,
    borderTopRightRadius: 0,
    borderBottomEndRadius: 12,
    paddingRight: 12,
    //paddingLeft: 30,
    padding: 8,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    //marginRight: -8,
    //marginBottom: -22,
    height: 60,
    width: 70,
    right: 0,
    bottom: 0,
  },
  // pointsTitle: {
  //   fontSize: 12,
  //   color: '#7b4b42',
  // },
  points: {
    fontFamily: Font.IBMPlexSans_500Medium,
    fontSize: 14,
    color: '#000',
  },
  peopleCount: {
    color: '#fff',
    fontSize: 12,
    fontFamily: Font.IBMPlexSans_400Regular,
    marginTop: 4,
  },
});

export default TimerCard;
