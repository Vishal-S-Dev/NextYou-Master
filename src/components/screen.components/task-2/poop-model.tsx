import { zodResolver } from '@hookform/resolvers/zod';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { z } from 'zod';

import { CoinJarPopupModal } from '@/components';
import SuggestionCard from '@/components/suggestion-card';
import TimerCard from '@/components/timer-card';
import { Button } from '@/components/ui';
import { colors } from '@/lib';

import { ToggleButtonGroup } from '../task-1';

const task2Schema = z.object({
  poop: z.boolean({
    required_error: 'Please select poop status.',
  }),
});

type Task2FormValues = z.infer<typeof task2Schema>;

interface Props {
  taskComplete: () => void;
}

export default function PoopModal({ taskComplete }: Props) {
  const [coinJarVisible, setCoinJarVisible] = useState<boolean>(false);

  const {
    control,
    handleSubmit,
    //watch,
    formState: { errors, isValid },
  } = useForm<Task2FormValues>({
    resolver: zodResolver(task2Schema),
  });

  // const imageUri = watch('imageUri');

  const onSubmit = (data: Task2FormValues) => {
    console.log('Form submitted:', data);
    // submit to API or proceed
    setCoinJarVisible(true);
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.container}>
        <View style={{ flex: 1, padding: 16 }}>
          <Text style={styles.taskLabel}>Task 3</Text>

          <Text style={styles.heading}>Have you done with your Poop?</Text>
          <View style={styles.divider} />

          {/* Poop Status */}
          <View style={styles.toggleRow}>
            <Text style={styles.toggleLabel}>Poop Status</Text>
            <Controller
              control={control}
              name="poop"
              render={({ field: { value, onChange } }) => (
                <ToggleButtonGroup value={value} onChange={onChange} />
              )}
            />
          </View>
          {errors.poop && (
            <Text style={styles.errorText}>{errors.poop.message}</Text>
          )}

          <Button
            testID="otp-button"
            className="mt-10"
            label="Check in to Complete Task"
            disabled={!isValid}
            variant="login"
            size="login"
            onPress={handleSubmit(onSubmit)}
            // loading={loading}
          />

          <View style={styles.card}>
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 0.9 }}
              colors={[colors.primary[500], colors.primary[500], '#2A1774']}
              style={styles.card}
            >
              <TimerCard
                imageSource="https://as1.ftcdn.net/v2/jpg/15/95/44/06/1000_F_1595440617_aJFuSFRFblmqd0lKfHsLgmpSN5j2lzcS.jpg"
                title="Upcoming Task 3"
                startTime="12:30 PM"
                endTime="2:30 PM"
              />

              <Text style={styles.taskNote}>
                Do not forget to have your breakfast based on diet requirements.
              </Text>

              <SuggestionCard
                imageSource="https://as1.ftcdn.net/v2/jpg/15/95/44/06/1000_F_1595440617_aJFuSFRFblmqd0lKfHsLgmpSN5j2lzcS.jpg"
                text="Do you want meal tracking for better results ?"
              />
              {/* <TouchableOpacity style={styles.ctaButton}>
                <Text style={styles.ctaText}>Upgrade to 90 days challenge</Text>
              </TouchableOpacity> */}
            </LinearGradient>
          </View>
        </View>
      </ScrollView>
      <CoinJarPopupModal
        visible={coinJarVisible}
        onClose={() => {
          setCoinJarVisible(false);
          taskComplete();
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    flex: 1,
    padding: 8,
  },
  taskLabel: {
    backgroundColor: '#fcded1',
    color: '#000',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    fontWeight: '600',
    marginBottom: 10,
  },
  heading: {
    fontSize: 18,
    fontWeight: '700',
    color: '#5A2BDA',
    marginBottom: 6,
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 12,
  },
  subheading: {
    fontSize: 14,
    color: '#333',
    marginBottom: 6,
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    alignItems: 'center',
  },
  toggleLabel: {
    flex: 1,
    color: '#333',
  },
  errorText: {
    marginTop: 4,
    color: 'red',
    fontSize: 12,
  },
  ctaButton: {
    marginTop: 24,
    backgroundColor: '#6d4aff',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  ctaText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  card: {
    borderRadius: 16,
    padding: 12,
  },

  taskNote: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '500',
    marginTop: 12,
  },
});
