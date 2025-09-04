import * as Calendar from 'expo-calendar';
import { router, useFocusEffect } from 'expo-router';
import { setStatusBarStyle, type StatusBarStyle } from 'expo-status-bar';
import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import {
  DayTracker,
  ScheduleHeader,
  ScheduleTaskCard,
} from '@/components/screen.components/schedule-task';
import SectionHeader from '@/components/section-header';
import {
  FocusAwareStatusBar,
  NavigationHeader,
  SafeAreaView,
} from '@/components/ui';
import { colors } from '@/lib';
import { useSubscriptionStore, useTaskStore } from '@/store';

const events = [
  {
    title: 'Meeting with Vishal',
    startDate: new Date(),
    endDate: new Date(Date.now() + 60 * 60 * 1000),
    timeZone: 'Asia/Kolkata',
    location: 'Mumbai, India',
  },
  {
    title: 'Code Review Session',
    startDate: new Date(Date.now() + 2 * 60 * 60 * 1000),
    endDate: new Date(Date.now() + 3 * 60 * 60 * 1000),
    timeZone: 'Asia/Kolkata',
    location: 'Pune, India',
  },
];

async function getCalendarPermission() {
  const { status } = await Calendar.requestCalendarPermissionsAsync();
  if (status === 'granted') {
    console.log('Calendar permission granted');
  } else {
    console.log('Calendar permission denied');
  }
}

async function addEventToCalendar() {
  const { status } = await Calendar.requestCalendarPermissionsAsync();
  if (status !== 'granted') {
    alert('Permission not granted');
    return;
  }

  const calendars = await Calendar.getCalendarsAsync(
    Calendar.EntityTypes.EVENT
  );
  console.log('Available calendars:', calendars);

  // Try to find Google Calendar (Android) or default (iOS)
  const defaultCalendar =
    calendars.find(
      (c) =>
        c.allowsModifications &&
        c.source &&
        'name' in c.source &&
        typeof c.source.name === 'string' &&
        c.source.name.toLowerCase().includes('google')
    ) || calendars.find((c) => c.allowsModifications);

  if (!defaultCalendar) {
    console.log('No writable calendar found');
    return;
  }

  //Single events
  /*const eventId = await Calendar.createEventAsync(defaultCalendar.id, {
        title: 'Meeting with Vishal',
        startDate: new Date(),
        endDate: new Date(Date.now() + 60 * 60 * 1000),
        timeZone: 'Asia/Kolkata',
        location: 'Mumbai, India'
    });*/

  //Multiple events
  /*const createdEvents = [];
    for (const event of events) {
        try {
            const eventId = await Calendar.createEventAsync(defaultCalendar.id, {
                title: event.title,
                startDate: event.startDate,
                endDate: event.endDate,
                timeZone: event.timeZone || 'Asia/Kolkata',
                location: event.location || ''
            });
            createdEvents.push(eventId);
            console.log('Event created with ID:', eventId);
        } catch (e) {
            console.log(e);
        }
    }*/

  // Loop through each event and add if not already exists
  for (const event of events) {
    const start = new Date(event.startDate);
    const end = new Date(event.endDate);

    // Search existing events in that time range
    const existingEvents = await Calendar.getEventsAsync(
      [defaultCalendar.id],
      start,
      end
    );

    const isDuplicate = existingEvents.some(
      (e) => e.title.trim().toLowerCase() === event.title.trim().toLowerCase()
    );

    if (isDuplicate) {
      console.log(`Skipping duplicate: ${event.title}`);
      continue;
    }

    const eventId = await Calendar.createEventAsync(defaultCalendar.id, {
      title: event.title,
      startDate: start,
      endDate: end,
      timeZone: event.timeZone || 'Asia/Kolkata',
      location: event.location || '',
    });

    console.log(`Event created with ID: ${eventId}`);
  }
}

const MySchedule = () => {
  // const today = new Date();
  // const defaultDay =
  // days.find((d) => d.date.toDateString() === today.toDateString()) || days[0];
  const { currentTaskDay } = useSubscriptionStore();
  const { tasksByDay, getTasksForDay } = useTaskStore();

  const [selectedDay, setSelectedDay] = useState<number>(0);
  // const { todaysTask, upcomingTask, fetchTodaysTask, fetchUpcomingTask } =
  //   useTaskStore();

  // const todayTasks = getTasksForDay(currentTaskDay);

  const defaultDay = useCallback(() => {
    // console.log('Default Day:', currentTaskDay);
    if (
      tasksByDay.length > 0 &&
      currentTaskDay <= tasksByDay.length &&
      currentTaskDay
    ) {
      return currentTaskDay;
    } else {
      return 1;
    }
  }, [tasksByDay, currentTaskDay]);

  const setStatusBar = (style: StatusBarStyle) => {
    setStatusBarStyle(style, true);
  };

  // Track screen focus
  useFocusEffect(
    useCallback(() => {
      setStatusBar('dark');
      return () => {};
    }, [])
  );

  useEffect(() => {
    setSelectedDay(defaultDay());
  }, [defaultDay]);

  const dateStatus =
    selectedDay === currentTaskDay
      ? 'today'
      : selectedDay <= currentTaskDay
        ? 'past'
        : 'upcoming';
  const title = () => {
    switch (dateStatus) {
      case 'today':
        return 'Todays Tasks';
      case 'past':
        return 'Past Tasks';
      default:
        return 'Upcoming Tasks';
    }
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: colors.bg }}
      edges={['top', 'left', 'right']}
    >
      <FocusAwareStatusBar style="dark" />
      {/* Header */}
      <NavigationHeader
        title="My Schedule"
        showBack={true}
        onBackPress={() => router.back()}
      />
      {tasksByDay.length === 0 ? (
        <Text style={{ textAlign: 'center', marginTop: 20 }}>
          No tasks for this day
        </Text>
      ) : (
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingBottom: 40 }}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.card}>
            <DayTracker
              days={tasksByDay}
              taskDay={currentTaskDay}
              selectedDay={selectedDay}
              onDayPress={(task) => {
                setSelectedDay(task.day);
              }}
            />
          </View>

          <ScheduleHeader
            dateStatus={dateStatus}
            onDayPress={() => {
              getCalendarPermission();
              addEventToCalendar();
            }}
          />
          <View style={{ paddingHorizontal: 16 }}>
            <SectionHeader title={title()} />
          </View>
          {getTasksForDay(selectedDay).map((task, index) => (
            <ScheduleTaskCard
              key={`${task._id}-${index}`}
              dateStatus={dateStatus}
              task={task}
              index={index}
              total={getTasksForDay(selectedDay).length}
              onPress={(id) => console.log('Task pressed:', id)}
            />
          ))}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    flex: 1,
    minWidth: 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  headerTitle: { fontSize: 18, fontWeight: 'bold', marginLeft: 8, flex: 1 },
  card: {
    flex: 1,
    margin: 10,
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: 10,
    shadowColor: '#6B4AEA',
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 4,
  },
});
export default MySchedule;
