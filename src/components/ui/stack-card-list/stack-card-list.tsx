import React, { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, TouchableOpacity, View } from 'react-native';

interface StackCardListProps {
  visibleItems?: number;
  stackType?: 'below' | 'above';
  data: any[];
  itemWidth: number;
  itemHeight: number;
  spacing?: number;
  closeButtonView?: React.ReactElement;
  renderItem: (props: {
    index: number;
    activeIndex: number;
    item: any;
  }) => React.ReactElement;
  onItemPress: (index: number, item: any) => void;
  onEmpty?: () => void;
}

export const StackCardList: React.FC<StackCardListProps> = ({
  visibleItems = 3,
  stackType = 'above',
  data,
  itemWidth,
  itemHeight,
  spacing = 8,
  closeButtonView,
  renderItem,
  onItemPress,
  onEmpty,
}) => {
  const [listIndex, setListIndex] = useState(0);
  const animValues = useRef<Animated.Value[]>(
    Array.from({ length: visibleItems }, () => new Animated.Value(0))
  ).current;

  useEffect(() => {
    animValues.forEach((val, i) => {
      Animated.timing(val, {
        toValue: 1,
        useNativeDriver: true,
        duration: 300,
        delay: i * 60,
      }).start();
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listIndex]);

  const handleNext = (index: number, item: any) => {
    // Animate top card out
    Animated.timing(animValues[0], {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
    }).start(() => {
      // Shift stack
      setListIndex((prev) => {
        const next = prev + 1;
        if (next >= data.length) onEmpty?.();
        return next;
      });

      // Reset all anim values for next round
      animValues.forEach((v) => v.setValue(0));
      onItemPress(index, item);
    });
  };

  const stackData = data.slice(listIndex, listIndex + visibleItems);

  return (
    <View style={[styles.container, { height: itemHeight }]}>
      {[...stackData].reverse().map((item, reversedIndex) => {
        const i = stackData.length - 1 - reversedIndex;
        const index = listIndex + i;
        const offsetDirection = stackType === 'below' ? 1 : -1;
        const targetOffset = offsetDirection * spacing * i;
        const startOffset = offsetDirection * spacing * (i + 1);
        const baseScale = 1 - i * 0.05;
        const baseOpacity = 1 - i * 0.15;

        const animatedStyle = {
          transform: [
            {
              translateY: animValues[i].interpolate({
                inputRange: [0, 1],
                outputRange: [startOffset, targetOffset],
              }),
            },
            {
              scale: animValues[i].interpolate({
                inputRange: [0, 1],
                outputRange: [0.9, baseScale],
              }),
            },
          ],
          opacity: animValues[i].interpolate({
            inputRange: [0, 1],
            outputRange: [0, baseOpacity],
          }),
        };

        const overlayOpacity = i === 0 ? 0 : 0.15 + i * 0.05;

        return (
          <Animated.View
            key={index}
            style={[
              styles.cardContainer,
              {
                width: itemWidth,
              },
              animatedStyle,
              {
                justifyContent:
                  stackType === 'below' ? 'flex-start' : 'flex-end',
              },
            ]}
          >
            <TouchableOpacity
              //activeOpacity={0.9}
              onPress={() => handleNext(index, item)}
            >
              <View>
                {renderItem({ index, activeIndex: listIndex, item })}
                {i > 0 && (
                  <View
                    pointerEvents="none"
                    style={[
                      StyleSheet.absoluteFillObject,
                      {
                        backgroundColor: 'black',
                        opacity: overlayOpacity,
                        borderRadius: 12,
                      },
                    ]}
                  />
                )}
                {i === 0 && closeButtonView && (
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => handleNext(index, item)}
                  >
                    {closeButtonView}
                  </TouchableOpacity>
                )}
              </View>
            </TouchableOpacity>
          </Animated.View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardContainer: {
    position: 'absolute',
    alignSelf: 'center',
    top: 0,
    bottom: 0,
    paddingVertical: 8,
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
});
