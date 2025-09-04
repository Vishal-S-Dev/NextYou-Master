import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { ImagePath } from '@/api';
import { type HealthRecipe } from '@/api/recipes/types';

type RecipeCardProps = {
  item: HealthRecipe;
  onPress?: () => void;
  onFavoritePress?: () => void;
};

const HealthRecipeCard = ({
  item,
  onPress,
  onFavoritePress,
}: RecipeCardProps) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <View style={styles.card}>
        <Image
          source={{ uri: ImagePath(item.bannerImage) }}
          style={styles.image}
        />
        <View style={styles.overlay}>
          <Text style={styles.tag}>{item.type || 'Recipe'}</Text>
          <Text style={styles.title} numberOfLines={1}>
            {item.title}
          </Text>
          <TouchableOpacity
            style={styles.favoriteBtn}
            onPress={onFavoritePress}
          >
            <Ionicons name="heart-outline" size={18} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginRight: 12,
    width: 160,
    height: 200,
    borderRadius: 12,
    overflow: 'hidden',
  },
  image: { width: '100%', height: '100%' },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    padding: 8,
    backgroundColor: 'rgba(0,0,0,0.3)',
    height: '100%',
  },
  tag: { color: 'white', fontSize: 10, fontWeight: 'bold' },
  title: { color: 'white', fontSize: 12, marginTop: 2 },
  favoriteBtn: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
});

export default HealthRecipeCard;
