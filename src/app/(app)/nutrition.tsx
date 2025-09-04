import Ionicons from '@expo/vector-icons/Ionicons';
import { router, useFocusEffect } from 'expo-router';
import { setStatusBarStyle, type StatusBarStyle } from 'expo-status-bar';
import moment from 'moment';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import { type HealthRecipe } from '@/api/recipes/types';
import {
  HealthRecipeCard,
  NutritionListCard,
  WaterIntakeCard,
} from '@/components/screen.components/nutrition';
import SectionHeader from '@/components/section-header';
import {
  FocusAwareStatusBar,
  Loader,
  NavigationHeader,
  SafeAreaView,
} from '@/components/ui';
import ImagePickerBottomSheet, {
  type ImagePickerBottomSheetRef,
} from '@/components/ui/image-picker-bottom-sheet';
import { colors, Font } from '@/lib';
import { useRecipeStore } from '@/store';
import { useMealPlanStore } from '@/store/use-meal-plan-store';

const NutritionScreen = () => {
  const bottomSheetRef = useRef<ImagePickerBottomSheetRef>(null);

  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [waterCount, setWaterCount] = useState(4);

  // Fetch meal plans from the store
  const { loading, mealPlans, fetchMealPlans } = useMealPlanStore();

  const { recipes } = useRecipeStore();
  useEffect(() => {
    fetchMealPlans();
  }, [fetchMealPlans]);

  // Set status bar style when screen is focused
  useFocusEffect(
    useCallback(() => {
      setStatusBar('dark');
      return () => {};
    }, [])
  );
  const setStatusBar = (style: StatusBarStyle) => {
    setStatusBarStyle(style, true);
  };

  const formatDate = (d: Date) => {
    const dateFormatStr = 'MMM DD, YYYY';
    return moment(d).format(dateFormatStr); // customize format if needed
  };

  const hideDatePicker = () => {
    setShowPicker(false);
  };

  const handleConfirm = (date: Date) => {
    setDate(date);
    hideDatePicker();
  };

  const renderRecipeCard = ({ item }: { item: HealthRecipe }) => (
    <HealthRecipeCard item={item} />
  );

  const renderCalendarButton = () => (
    <TouchableOpacity
      style={styles.dateButton}
      onPress={() => setShowPicker(true)}
    >
      <Ionicons name="calendar-outline" size={16} color="#8a4bff" />
      <Text style={styles.dateText}>{formatDate(date)}</Text>
      <Ionicons name="chevron-down" size={16} color="#8a4bff" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: colors.bg }}
      edges={['top', 'left', 'right']}
    >
      <FocusAwareStatusBar style="dark" />
      {/* Header */}
      <NavigationHeader
        title="Nutrition"
        rightComponent={renderCalendarButton()}
        onBackPress={() => router.back()}
      />

      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Meal Plan */}
        <SectionHeader title="Today's Meal Plan" />
        {mealPlans.length === 0 ? (
          <Text>No meal plans available</Text>
        ) : (
          mealPlans.map((meal) => (
            <NutritionListCard
              key={meal._id}
              item={meal}
              onPressCamera={() => bottomSheetRef.current?.open()}
            />
          ))
        )}
        {/* Water Intake */}
        <WaterIntakeCard value={waterCount} onChange={setWaterCount} />

        {/* Healthy Recipes */}
        <SectionHeader
          title="Healthy Recipes"
          showSeeAll
          onSeeAllPress={() => {
            console.log('See All Pressed');
          }}
        />
        {/* Recipe List */}
        <FlatList
          data={recipes}
          keyExtractor={(item) => item._id}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={renderRecipeCard}
        />
      </ScrollView>
      <DateTimePickerModal
        date={date}
        minimumDate={new Date()}
        isVisible={showPicker}
        mode="date"
        display="inline"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
      <Loader visible={loading} />
      <ImagePickerBottomSheet
        ref={bottomSheetRef}
        onImagePicked={(uri) => {
          console.log('Image picked:', uri);
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  headerTitle: { fontSize: 18, fontWeight: 'bold', marginLeft: 8, flex: 1 },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 6,
    borderWidth: 1,
    borderColor: '#8a4bff',
    borderRadius: 6,
  },
  dateText: { color: '#8a4bff', marginHorizontal: 4 },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    height: 44,
  },
  sectionTitle: { fontFamily: Font.IBMPlexSans_600SemiBold, fontSize: 18 },
  seeAll: { fontSize: 14, color: '#ff4500' },
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
  mealImage: { width: 60, height: 60, borderRadius: 8, marginRight: 12 },
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
  waterCard: {
    backgroundColor: '#8a4bff',
    borderRadius: 12,
    padding: 16,
    marginVertical: 12,
  },
  waterTitle: { fontSize: 16, fontWeight: 'bold', color: 'white' },
  waterSubtitle: { fontSize: 12, color: 'white', marginBottom: 12 },
  glassRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  recipeCard: {
    marginRight: 12,
    width: 160,
    height: 200,
    borderRadius: 12,
    overflow: 'hidden',
  },
  recipeImage: { width: '100%', height: '100%' },
  recipeOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    padding: 8,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  recipeTag: { color: 'white', fontSize: 10, fontWeight: 'bold' },
  recipeTitle: { color: 'white', fontSize: 12 },
});

export default NutritionScreen;
