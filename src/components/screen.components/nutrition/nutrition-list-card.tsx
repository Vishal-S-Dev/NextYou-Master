import { MaterialIcons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React, { memo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { ImagePath } from '@/api';
import { type MealPlan } from '@/api/nutrition/type';

interface Props {
  item: MealPlan;
  onPressCamera?: () => void;
}

const NutritionListCard: React.FC<Props> = ({ item, onPressCamera }) => {
  return (
    <View key={item._id} style={styles.mealCard}>
      <Image
        source={{ uri: ImagePath(item.bannerImage) }}
        style={styles.mealImage}
      />
      <View style={{ flex: 1 }}>
        <Text style={styles.mealTitle}>{item.title}</Text>
        <Text style={styles.mealDescription}>{item.description}</Text>
      </View>
      {!item.mealImage && (
        <TouchableOpacity style={styles.cameraButton} onPress={onPressCamera}>
          <MaterialIcons name="photo-camera" size={20} color="white" />
        </TouchableOpacity>
      )}
      {item.mealImage && (
        <Image source={{ uri: item.mealImage }} style={styles.image} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mealCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,

    shadowOffset: { width: 0, height: 0 },
    shadowColor: '#00000099',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  mealImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
    backgroundColor: '#f0f0f0',
  },
  mealTitle: { fontSize: 14, fontWeight: 'bold' },
  mealDescription: { fontSize: 12, color: '#777' },
  cameraButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#8a4bff',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  image: {
    width: 48,
    height: 48,
    borderRadius: 8,
  },
});

export default memo(NutritionListCard);
