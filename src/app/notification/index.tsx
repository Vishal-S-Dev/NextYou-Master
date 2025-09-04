import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, SectionList, StyleSheet, Text } from 'react-native';

import { NotificationItem } from '@/components/screen.components/notification/notification-item';
import { FocusAwareStatusBar } from '@/components/ui';
import { colors } from '@/lib';
import { useNotificationStore } from '@/store/use-notification-store';
import { type Notification } from '@/types';

export default function NotificationListScreen() {
  // const [notifications, setNotifications] =
  // useState<Notification[]>(initialData);

  const { notifications, fetchNotifications } = useNotificationStore();

  const handleDelete = (_id: string) => {
    console.log('Delete');
    // setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  interface Section {
    title: string;
    data: Notification[];
  }

  const [sections, setSections] = useState<Section[]>([]);

  useEffect(() => {
    fetchNotifications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setSections([
      { title: 'Today', data: notifications },
      { title: 'Yesterday', data: notifications },
    ]);
  }, [notifications]);

  const renderItem = ({ item: notification }: { item: Notification }) => (
    <NotificationItem
      item={notification}
      onDelete={() => handleDelete(notification.id)}
      onPress={() => {
        if (
          typeof notification.type === 'undefined' ||
          notification.type === null
        )
          return;
        if (notification.type === 'health_data') {
          router.push('/day-0');
        }
      }}
    />
  );

  return (
    <>
      <FocusAwareStatusBar style="dark" />
      <SafeAreaView style={styles.container}>
        <SectionList
          sections={sections}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.sectionHeader}>{title}</Text>
          )}
          contentContainerStyle={{ paddingBottom: 24 }}
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  sectionHeader: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#7b61ff',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
});
