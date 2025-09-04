import { LinearGradient } from 'expo-linear-gradient';
import React, { useCallback, useState } from 'react';
import { type LayoutChangeEvent, StyleSheet, Text, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

import InspiredStoriesCard from '@/components/inspired-stories-card';
import { Font } from '@/lib';
import { useInspirationalStoryStore } from '@/store';

export function InspirationalStory() {
  const [contentWidth, setContentWidth] = useState(300);
  const [activeIndex, setActiveIndex] = useState(0);

  const { inspiredStories } = useInspirationalStoryStore();
  const stories = inspiredStories.slice(0, 3);
  // Layout handlers
  const onLayoutView = useCallback((e: LayoutChangeEvent) => {
    setContentWidth(e.nativeEvent.layout.width);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Inspirational Stories</Text>

      <View
        style={{
          flex: 1,
          width: '100%',
          alignItems: 'center',
        }}
        onLayout={onLayoutView}
      >
        <Carousel
          loop
          width={contentWidth * 0.98}
          height={180}
          autoPlay
          autoPlayInterval={4000}
          data={stories}
          scrollAnimationDuration={800}
          onSnapToItem={(index) => setActiveIndex(index)}
          style={{
            alignItems: 'center',
          }}
          renderItem={({ item }) => (
            <LinearGradient
              colors={['#5c61ffa9', '#f8acff69']}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={styles.testimonialCard}
            >
              <InspiredStoriesCard review={item} />
            </LinearGradient>
          )}
        />
        {/* Dot Indicators */}
        <View style={styles.dotsContainer}>
          {stories.map((_, i) => (
            <View
              key={i}
              style={[styles.dot, activeIndex === i && styles.activeDot]}
            />
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    //marginVertical: 16,
    gap: 16,
    padding: 16,
    paddingBottom: 80,
    backgroundColor: '#13093D',
  },
  slide: {
    flex: 1,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  dotsContainer: {
    flexDirection: 'row',
    marginTop: 15,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#fff',
    width: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: Font.IBMPlexSans_600SemiBold,
    color: '#fff',
    marginBottom: 8,
    //marginHorizontal: 16,
  },
  testimonialCard: {
    flex: 1,
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 4,
  },
  testimonialHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  testimonialAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 10,
  },
  testimonialName: {
    fontFamily: Font.Inter_600SemiBold,
    fontSize: 14,
    color: '#fff',
  },
  testimonialStars: {
    fontFamily: Font.Inter_600SemiBold,
    fontSize: 12,
    marginBottom: 8,
  },
  testimonialTime: {
    fontFamily: Font.Inter_400Regular,
    fontSize: 11,
    color: '#7e7e7e',
  },
  testimonialText: {
    fontFamily: Font.Inter_400Regular,
    fontSize: 13,
    lineHeight: 18,
    color: '#FFECEC',
  },
});
