// /components/TaskList.js
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import { useTaskUpdateStatus } from '@/api/challenges';
import CoinJarPopupModal from '@/components/coin-jar-model';
import { showErrorMessage } from '@/components/ui';
import { Font } from '@/lib';
import { useSubscriptionAlert, useSubscriptionStore } from '@/store';
// import { tasks } from '@/mock/home-components-mock-data';
import { type TaskDetails } from '@/types';

import TaskListCard from '../../task-list-card';
import MoodPopupModal from './mood-popup-model';

type Props = {
  title: string;
  tasks: TaskDetails[];
  isTodayTask?: boolean;
};

export function TaskList({ title, tasks, isTodayTask }: Props) {
  const [visible, setVisible] = useState<boolean>(false);
  const [coinJarVisible, setCoinJarVisible] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<TaskDetails | null>(null);
  // const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();

  const { currentTaskDay, subscriptionActive } = useSubscriptionStore();
  const { showSubscriptionAlert } = useSubscriptionAlert();

  const taskUpdateStatus = useTaskUpdateStatus();
  const { mutate: updateTaskStatus } = taskUpdateStatus();

  const updateStatus = (
    taskId: string,
    mood: { index: number; mood: string }
  ) => {
    updateTaskStatus(
      {
        taskId: taskId,
        day: `${currentTaskDay}`,
        status: 'completed',
        answers: mood,
      },
      {
        onSuccess: (response) => {
          console.log('updateTaskStatus success:', response);
          setCoinJarVisible(true);
        },
        onError: (error) => {
          const message = `updateTaskStatus failed, ${error.response?.data.message || error.message}`;
          console.error(error.response?.data);
          showErrorMessage(message);
        },
      }
    );
  };

  const onMoodSelect = (value: number, mood: string) => {
    setVisible(false);
    if (selectedItem) {
      updateStatus(selectedItem._id, { index: value, mood });
    }
  };

  // const isPreviousTaskPerformed = (index: number) => {
  //   if (index === 0) return true; // First task is always performed
  //   const task = tasks[index - 1];
  //   return task ? task.status === 'completed' : false;
  // };

  const renderTaskListCard = ({
    item,
    // index,
  }: {
    item: TaskDetails;
    index: number;
  }) => (
    <TaskListCard
      item={item}
      isTodayTask={isTodayTask}
      onPress={() => {
        if (!isTodayTask) return;
        if (currentTaskDay >= 4 && !subscriptionActive) {
          showSubscriptionAlert();
          return;
        }
        // if (!isPreviousTaskPerformed(index)) {
        //   Alert.alert(
        //     'Previous task not completed',
        //     'Please complete the previous task first.'
        //   );
        //   return;
        // }

        if (item.status === 'completed') {
          Alert.alert('task already completed');
          return;
        }
        setSelectedItem(item);
        if (item.type === '1') {
          setVisible(true);
        } else if (item.type === '2') {
          router.push({
            pathname: '/task-1',
            params: {
              day: currentTaskDay,
              taskId: item._id,
            },
          });
        } else if (item.type === '3') {
          router.push({
            pathname: '/task-2',
            params: {
              day: currentTaskDay,
              taskId: item._id,
            },
          });
        } else if (item.type === '4') {
          router.push({
            pathname: '/task-3',
            params: {
              day: currentTaskDay,
              taskId: item._id,
            },
          });
        } else {
          router.push({
            pathname: '/task-4',
            params: {
              day: currentTaskDay,
              taskId: item._id,
            },
          });
        }
      }}
    />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>{title}</Text>
      <FlatList
        data={tasks}
        keyExtractor={(item, index) => {
          return `${item._id}-${index}`;
        }}
        renderItem={renderTaskListCard}
        showsHorizontalScrollIndicator={false}
        nestedScrollEnabled={false}
      />
      <MoodPopupModal
        visible={visible}
        onDone={onMoodSelect}
        onClose={() => {
          setVisible(false);
        }}
      />
      <CoinJarPopupModal
        visible={coinJarVisible}
        coins={selectedItem?.points || 0}
        onClose={() => {
          setCoinJarVisible(false);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    //backgroundColor: 'blue',
    //marginVertical: 16,
    paddingHorizontal: 8,
    //paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: Font.IBMPlexSans_600SemiBold,
    color: '#000',
    marginBottom: 16,
    marginHorizontal: 8,
  },
});
