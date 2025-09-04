import { memo } from 'react';
import { Text, View } from 'react-native';

import { Button, EmptyList } from '@/components/ui';
import { Font } from '@/lib';
import { useTaskStore } from '@/store';
import { useSubscriptionStore } from '@/store/use-subscription-store';

import { TaskList } from './task-list';

const DashboardTaskView = () => {
  const { currentTaskDay, subscriptionActive } = useSubscriptionStore();
  const { getTasksForDay } = useTaskStore();

  const todayTasks = getTasksForDay(currentTaskDay);
  // .filter(
  //   (task) => task.status !== 'completed'
  // );
  const hasTodayTasks = todayTasks && todayTasks?.length > 0;
  const allDone =
    hasTodayTasks && todayTasks?.every((t) => t.status === 'completed');
  const showTodayTasks = currentTaskDay > 0 && currentTaskDay <= 7 && !allDone;
  const upcomingDay = currentTaskDay === 0 ? 1 : currentTaskDay + 1;
  const upcomingTasks = getTasksForDay(upcomingDay);
  const hasUpcomingTasks = upcomingTasks && upcomingTasks?.length > 0;
  // const { showSubscriptionAlert } = useSubscriptionAlert();

  // const showAlert = useCallback(() => {
  //   Alert.alert('Your subscription ended', 'Please subscribe to continue', [
  //     {
  //       text: 'Proceed to payment',
  //       onPress: () => {
  //         router.push('/challenges/plan-details');
  //       },
  //     },
  //     {
  //       text: 'Skip for Now',
  //       onPress: () => {},
  //       style: 'destructive',
  //     },
  //   ]);
  // }, []);

  // Subscription popup exactly on day 4
  // useEffect(() => {
  //   if (currentTaskDay >= 4 && !subscriptionActive) {
  //     const timeout = setTimeout(() => showSubscriptionAlert(), 2000);
  //     return () => clearTimeout(timeout);
  //   }
  // }, [showSubscriptionAlert, subscriptionActive, currentTaskDay]);

  // Logger.log('Upcoming Tasks:', upcomingTasks);
  return (
    <View style={{ padding: 0 }}>
      {/* Subscription Message */}
      {currentTaskDay >= 4 && !subscriptionActive && (
        <View
          style={{
            padding: 16,
          }}
        >
          <Text
            style={{
              fontFamily: Font.IBMPlexSans_600SemiBold,
              fontSize: 16,
              marginBottom: 4,
            }}
          >
            Your trial has expired. You're missing out your goal to be fit.
            Please make payment to continue
          </Text>
          <Button
            label="Make payment to Continue"
            onPress={() => {}}
            size="login"
          />
        </View>
      )}

      {/* Task Completion Message */}
      {allDone && (
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'green' }}>
            🎉 Well done! You have completed today's tasks.
          </Text>
        </View>
      )}

      {/* Task List */}
      {hasTodayTasks || hasUpcomingTasks ? (
        <>
          {/* Today's Tasks */}
          {hasTodayTasks ? (
            showTodayTasks && (
              <TaskList
                title={`Today's Tasks`}
                tasks={todayTasks}
                isTodayTask
              />
            )
          ) : (
            <EmptyList
              message="No tasks available for today."
              isLoading={false}
            />
          )}

          {/* Upcoming Tasks */}
          {hasUpcomingTasks
            ? !showTodayTasks && (
                <TaskList
                  title={`Upcoming Day ${upcomingDay} Tasks`}
                  tasks={upcomingTasks}
                />
              )
            : currentTaskDay < 7 && (
                <EmptyList
                  message="No tasks available for tomorrow."
                  isLoading={false}
                />
              )}
        </>
      ) : (
        <>
          {currentTaskDay < 7 && (
            <EmptyList message="No tasks available." isLoading={false} />
          )}
        </>
      )}
    </View>
  );
};

export default memo(DashboardTaskView);
