import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import React, { memo } from 'react';
import { StyleSheet, Text, View } from 'react-native';

type WaterIntakeCardProps = {
  value: number;
  onChange: (val: number) => void;
  totalGlasses?: number;
};

const WaterIntakeCard = ({
  value,
  onChange,
  totalGlasses = 8,
}: WaterIntakeCardProps) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Water Intake</Text>
      <Text style={styles.subtitle}>
        Recommended {totalGlasses} glass a day.
      </Text>

      {/* Glass icons */}
      <View style={styles.glassRow}>
        {Array.from({ length: totalGlasses }).map((_, i) => (
          <Ionicons
            key={i}
            name="water"
            size={28}
            color={i < value ? 'white' : 'rgba(255,255,255,0.5)'}
          />
        ))}
      </View>

      {/* Slider */}
      <Slider
        style={{ width: '100%' }}
        minimumValue={0}
        maximumValue={totalGlasses}
        step={1}
        value={value}
        onValueChange={onChange}
        minimumTrackTintColor="white"
        maximumTrackTintColor="rgba(255,255,255,0.5)"
        thumbTintColor="white"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#8a4bff',
    borderRadius: 12,
    padding: 16,
    marginVertical: 12,
  },
  title: { fontSize: 16, fontWeight: 'bold', color: 'white' },
  subtitle: { fontSize: 12, color: 'white', marginBottom: 12 },
  glassRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
});

export default memo(WaterIntakeCard);
