// components/Rating.tsx
import { Ionicons } from '@expo/vector-icons';
import React, { memo, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

interface RatingProps {
  maxStars?: number;
  rating?: number;
  size?: number;
  color?: string;
  emptyColor?: string;
  editable?: boolean; // NEW: enable/disable
  onChange?: (rating: number) => void;
}

export const Rating = memo(
  ({
    maxStars = 5,
    rating: initialRating = 0,
    size = 32,
    color = '#FFD700',
    emptyColor = '#ccc',
    editable = true, // default to editable
    onChange,
  }: RatingProps) => {
    const [rating, setRating] = useState(initialRating);

    const handlePress = (value: number) => {
      if (!editable) return; // ignore taps if disabled
      setRating(value);
      onChange?.(value);
    };

    return (
      <View style={styles.container}>
        {Array.from({ length: maxStars }, (_, index) => {
          const starValue = index + 1;
          const isFilled = starValue <= rating;
          return (
            <TouchableOpacity
              key={index}
              activeOpacity={0.7}
              onPress={() => handlePress(starValue)}
              disabled={!editable}
            >
              <Ionicons
                name={isFilled ? 'star' : 'star-outline'}
                size={size}
                color={isFilled ? color : emptyColor}
              />
            </TouchableOpacity>
          );
        })}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
});
