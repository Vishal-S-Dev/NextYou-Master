import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useCallback } from 'react';
import { StyleSheet, useWindowDimensions, type ViewToken } from 'react-native';
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';

import {
  ListItem,
  PageButton,
  PageItem,
  Pagination,
} from '@/components/screen.components/onboarding';
import { FocusAwareStatusBar, View } from '@/components/ui';
import { useIsFirstTime } from '@/hooks';
import { data } from '@/mock/onboarding';
import { type DataItem } from '@/types';

//Reference
// https://medium.com/@gm_99/building-a-beautiful-onboarding-section-with-react-native-reanimated-39b7eec94892
// https://github.com/Rakha112/react-native-animation/tree/main/season1/src/08-React-Native-Onboarding-Screen
export default function Onboarding() {
  const [_, setIsFirstTime] = useIsFirstTime();

  const { width: SCREEN_WIDTH } = useWindowDimensions();
  const flatListRef = useAnimatedRef<Animated.FlatList<DataItem>>();
  const x = useSharedValue(0);
  const flatListIndex = useSharedValue(0);

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0 && viewableItems[0]?.index != null) {
        flatListIndex.value = viewableItems[0].index ?? 0;
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  const onScroll = useAnimatedScrollHandler({
    onScroll: (event) => {
      x.value = event.contentOffset.x;
    },
  });

  const renderItem = useCallback(
    ({ item, index }: { item: DataItem; index: number }) => {
      return <ListItem item={item} index={index} x={x} />;
    },
    [x]
  );

  const router = useRouter();
  const getStarted = () => {
    setIsFirstTime(false);
    router.replace('/auth/login');
  };

  return (
    <View className="flex-1 bg-black">
      <FocusAwareStatusBar style="light" />
      <Animated.FlatList
        ref={flatListRef}
        onScroll={onScroll}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        scrollEventThrottle={16}
        horizontal={true}
        bounces={false}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{
          minimumViewTime: 300,
          viewAreaCoveragePercentThreshold: 10,
        }}
      />
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 0.39 }}
        colors={['rgba(0, 0, 0, 0.0)', 'rgba(0, 0, 0, 0.9)']}
        style={styles.bottomContainer}
        className="absolute bottom-0 w-full justify-center px-14 pb-6"
      >
        <PageItem
          data={data}
          x={x}
          flatListIndex={flatListIndex}
          screenWidth={SCREEN_WIDTH}
        />
        <Pagination data={data} x={x} screenWidth={SCREEN_WIDTH} />
        <PageButton
          flatListRef={flatListRef}
          flatListIndex={flatListIndex}
          dataLength={data.length}
          getStarted={getStarted}
        />
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  bottomContainer: {
    justifyContent: 'center',
    paddingBottom: 30,
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingHorizontal: 30,
  },
});
