import AntDesign from '@expo/vector-icons/AntDesign';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { type TaskDetails } from '@/types';

import TaskListCard from '../../task-list-card';

interface TaskCardProps {
  task: TaskDetails;
  dateStatus: 'past' | 'today' | 'upcoming';
  index: number;
  total: number;
  onPress?: (taskId: number) => void;
}

const ScheduleTaskCard = ({
  dateStatus,
  task,
  index,
  total,
}: TaskCardProps) => {
  const isCompleted: boolean = task.status === 'completed';
  const isFirst = index === 0;
  const isLast = index === total - 1;
  // const dateStatus = getDateStatus(date);

  return (
    <View className={'w-full flex-row items-center'}>
      {(dateStatus === 'past' || dateStatus === 'today') && (
        // Line
        <View style={styles.lineContainer}>
          {/* Top Line */}
          <View style={isFirst ? styles.line : styles.lineBottom} />

          {/* Purple side check circle */}
          <View className={'mx-2 items-center'}>
            {isCompleted ? (
              <AntDesign name="checkcircle" size={24} color="#CFC1F7" />
            ) : (
              <View style={styles.checkCircle} />
            )}
          </View>

          {/* Bottom Line */}
          <View style={isLast ? styles.line : styles.lineBottom} />
        </View>
      )}
      <TaskListCard item={task} isTodayTask={dateStatus === 'today'} />
    </View>
  );
};

const styles = StyleSheet.create({
  lineContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  container: {
    marginHorizontal: 10,
    marginVertical: 0,
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    shadowColor: '#6B4AEA',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 4,
    alignItems: 'flex-start',
    position: 'relative',
  },
  mustDoContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    shadowColor: '#6B4AEA',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 4,
    alignItems: 'flex-start',
    position: 'relative',
  },
  checkIconWrapper: {
    width: 30,
    alignItems: 'center',
  },
  line: { width: 1, flex: 1 },
  lineBottom: {
    width: 1,
    flex: 1,
    backgroundColor: '#ccc',
  },
  iosShadow: {
    shadowColor: '#6B4AEA',
    shadowOffset: { width: 0, height: 5 }, // Vertical shadow only
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  androidShadow: {
    elevation: 8, // Android elevation (vertical shadow)
  },
  image: {
    width: 80,
    height: 80,
    margin: 8,
    borderRadius: 10,
  },
  imageSmall: {
    width: 60,
    height: 60,
    borderRadius: 10,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    position: 'relative',
  },
  title: {
    marginEnd: 80,
    fontWeight: '600',
    fontSize: 14,
    color: '#333',
    marginTop: 8,
    marginVertical: 2,
  },
  subTitle: {
    fontSize: 12,
    marginVertical: 2,
  },
  pointsBadges: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#F3EFFD',
    height: 55,
    width: 55,
    borderTopLeftRadius: 400,
    borderBottomRightRadius: 16,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  pointsBadgesMustDo: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#9B81FF',
    height: 55,
    width: 55,
    borderTopLeftRadius: 400,
    borderBottomRightRadius: 16,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  pointsBadgesTommorow: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#F4CABE',
    height: 55,
    width: 55,
    borderTopLeftRadius: 400,
    borderBottomRightRadius: 16,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  pointsText: {
    padding: 6,
    fontSize: 10,
    fontWeight: '600',
    color: '#6B4AEA',
    textAlign: 'right',
    lineHeight: 14,
    alignSelf: 'flex-end',
  },
  countdown: {
    fontSize: 24,
    color: '#fff',
    marginTop: 4,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  checkCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#D9D9D9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    flex: 1,
    minWidth: 0,
  },
  people: {
    fontSize: 12,
    color: '#ccc',
    marginTop: 4,
    marginBottom: 10,
  },
});

export default ScheduleTaskCard;
