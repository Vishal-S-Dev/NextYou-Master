import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Font, timeAgo } from '@/lib';
import { type ChallengeReview } from '@/types';

import { Rating } from './ui';

type Props = {
  color?: string;
  review: ChallengeReview;
};

export default function InspiredStoriesCard({ review, color = '#fff' }: Props) {
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.testimonialHeader}>
        <Image
          source={{ uri: 'https://i.pravatar.cc/50?img=12' }}
          style={styles.testimonialAvatar}
        />
        <View style={{ flex: 1 }}>
          <Text style={[styles.testimonialName, { color }]}>Sharon J</Text>
        </View>
        <Text style={[styles.testimonialTime, { color }]}>
          {timeAgo(review.createdAt)}
        </Text>
      </View>
      <Rating size={16} rating={review.rating} editable={false} />
      {/* Read-only */}
      <Text style={[styles.testimonialText, { color }]}>{review.review}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  testimonialCard: { marginTop: 24, borderRadius: 16, padding: 16 },
  testimonialHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
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
    color: '#1f1f1f',
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
    fontSize: 14,
    lineHeight: 18,
    color: '#444',
    marginTop: 8,
  },
});
