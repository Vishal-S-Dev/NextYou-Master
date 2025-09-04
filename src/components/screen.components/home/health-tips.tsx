import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { ImagePath } from '@/api';
import { type HealthRecipe } from '@/api/recipes/types';
import { Font } from '@/lib';
// import { healthTip } from '@/mock/home-components-mock-data';

type Props = {
  recipe: HealthRecipe;
};

export const HealthTipCard = ({ recipe }: Props) => {
  return (
    <LinearGradient
      start={{ x: 1, y: 0 }}
      end={{ x: 1, y: 1 }}
      colors={['#4A3AFF', '#753AFF']}
      style={styles.container}
    >
      <Text style={styles.sectionTitle}>Health Tips of the day</Text>

      <View style={styles.card}>
        <Image
          placeholder={require('@assets/images/health_recipe/health_recipes.jpg')}
          source={{ uri: ImagePath(recipe.bannerImage) }}
          contentFit="cover"
          style={styles.image}
        />
        <View style={styles.recipeTag}>
          <Text style={styles.recipeText}>Recipe of the day</Text>
        </View>

        <View style={styles.infoOverlay}>
          <Text style={styles.title} numberOfLines={1}>
            {recipe.title}
          </Text>
          <View style={styles.meta}>
            <Ionicons name="time-outline" size={14} color="#fff" />
            <Text style={styles.metaText}>{recipe.minute} Minutes</Text>
            <Ionicons
              name="flame-outline"
              size={14}
              color="#fff"
              style={{ marginLeft: 12 }}
            />
            <Text style={styles.metaText}>{recipe.calories} Cal</Text>
            <Ionicons
              name="heart-outline"
              size={18}
              color="#fff"
              style={styles.bookmarkIcon}
            />
          </View>
        </View>
      </View>

      <TouchableOpacity>
        <Text style={styles.footerText}>
          Want to get custom meal plan from our top dietician ?
        </Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: Font.IBMPlexSans_600SemiBold,
    color: '#fff',
    marginBottom: 8,
    //marginHorizontal: 16,
  },
  card: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 8,
    backgroundColor: '#000',
  },
  image: {
    height: 180,
    width: '100%',
  },
  recipeTag: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#ff744e',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  recipeText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  infoOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingTop: 4,
    paddingBottom: 8,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  title: {
    color: '#fff',
    fontFamily: Font.IBMPlexSans_500Medium,
    fontSize: 14,
    marginBottom: 4,
    //lineHeight: 24,
  },
  meta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  metaText: {
    color: '#fff',
    fontSize: 12,
    marginLeft: 4,
  },
  bookmarkIcon: {
    marginLeft: 'auto',
  },
  footerText: {
    color: '#fff',
    fontFamily: Font.IBMPlexSans_500Medium,
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'left',
  },
});
