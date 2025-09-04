// /components/TaskList.js
import { Feather } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useEffect } from 'react';
import { Alert, Dimensions } from 'react-native';

import { StackCardList } from '@/components/ui/stack-card-list/stack-card-list';
import { useNotificationStore } from '@/store/use-notification-store';

import NotificationCard from './notification-card';

const { width } = Dimensions.get('screen');

const SPACING = 12;
const ITEM_WIDTH = width * 0.86;
const ITEM_HEIGHT = ITEM_WIDTH * 0.3;
const VISIBLE_ITEMS = 3;

export function NotificationList() {
  const [isShow, setIsShow] = React.useState(true);

  const { notifications, fetchNotifications } = useNotificationStore();

  useEffect(() => {
    fetchNotifications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderItem = (item: any) => {
    const { item: notification, index } = item;
    return <NotificationCard item={notification} index={index} />;
  };

  const handleItemPress = (index: number, item: any) => {
    //console.log('handleItemPress:', item);
    if (item.type === null) return;
    if (item.type === 'health_data') {
      router.push('/day-0');
    }
  };

  return isShow ? (
    <StackCardList
      data={notifications}
      visibleItems={VISIBLE_ITEMS}
      itemWidth={ITEM_WIDTH}
      itemHeight={ITEM_HEIGHT}
      closeButtonView={
        // <Icon name={'closeCircle'} color={'#ffffff'} size={20} />
        <Feather name="arrow-up-right" size={20} color="#000" />
      }
      stackType={'above'}
      spacing={SPACING}
      onEmpty={() => {
        setIsShow(false);
        Alert.alert('Notification empty', `Notification empty`, [
          {
            text: 'OK',
            onPress: () => {},
          },
        ]);
      }}
      onItemPress={handleItemPress}
      renderItem={renderItem}
    />
  ) : null;
}
