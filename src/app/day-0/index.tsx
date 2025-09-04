/* eslint-disable max-lines-per-function */
import { Ionicons } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { z } from 'zod';

import { useChallengeStartTrial } from '@/api/challenges';
import { useUpdateAllergyProfile } from '@/api/user';
import { ControlledPreferencePicker } from '@/components/screen.components/task-0';
import {
  Button,
  ControlledInput,
  ControlledSelectBox,
  ControlledSliderInput,
  FocusAwareStatusBar,
  showErrorMessage,
} from '@/components/ui';
import { colors, Font } from '@/lib';
import { Logger } from '@/lib/logger';
import { preferenceOptions } from '@/mock/preferences';
import { showAgreement } from '@/store/use-agreement-store';

const HealthFormSchema = z.object({
  healthDetails: z
    .string()
    .min(3, 'Health details must be at least 3 characters'),
  allergies: z.array(z.object({ id: z.string(), item: z.string() }).optional()),
  preference: z.string().min(1, 'Please select a dietary preference'),
  workHours: z.number().min(0).max(24, 'Work hours must be between 0 and 24'),
  sleepHours: z.number().min(4).max(24, 'Sleep hours must be between 4 and 24'),
});

type HealthFormValues = z.infer<typeof HealthFormSchema>;

type Params = {
  challengeId: string;
};

export default function HealthDetailsScreen() {
  const [loading, setLoading] = useState<boolean>(false);

  //const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const insets = useSafeAreaInsets();
  const {
    control,
    handleSubmit,
    clearErrors,
    formState: { isValid },
  } = useForm<HealthFormValues>({
    resolver: zodResolver(HealthFormSchema),
    defaultValues: {
      //healthDetails: '',
      allergies: [],
      //preference: '',
      //workHours: 0,
      //sleepHours: 0,
    },
    shouldFocusError: false,
  });

  const rawParams = useLocalSearchParams();
  const params: Params = {
    challengeId: String(rawParams.challengeId),
  };
  const { challengeId } = params;
  const updateAllergyProfile = useUpdateAllergyProfile();
  const challengeStartTrial = useChallengeStartTrial();
  const { mutate: startTrial } = challengeStartTrial();

  const isChallengeId =
    challengeId !== null &&
    challengeId !== undefined &&
    challengeId !== 'undefined' &&
    challengeId !== 'null';

  const startChallengeTrial = () => {
    startTrial(
      { challengeId },
      {
        onSuccess: (responseData) => {
          setLoading(false);
          const json = JSON.stringify(responseData, null, 2);
          Logger.log('challengeStartTrial ::', json);
          const timeout = setTimeout(() => router.replace('/'), 2000);
          return () => clearTimeout(timeout);
        },
        onError: (error) => {
          setLoading(false);
          const message = `challengeStartTrial failed, ${error.response?.data.message || error.message}`;
          console.error(error.response?.data);
          showErrorMessage(message);
        },
      }
    );
  };

  const updateHealthProfile = (data: HealthFormValues) => {
    setLoading(true);
    updateAllergyProfile.mutate(data, {
      onSuccess: (responseData) => {
        const json = JSON.stringify(responseData, null, 2);
        Logger.log('updateAllergyProfile ::', json);
        if (isChallengeId) {
          const timeout = setTimeout(() => startChallengeTrial(), 1000);
          return () => clearTimeout(timeout);
        } else {
          router.back();
        }
      },
      onError: (error) => {
        setLoading(false);
        const message = `failed, ${error.response?.data.message || error.message}`;
        Logger.error(error.response?.data);
        showErrorMessage(message);
      },
    });
  };

  const onSubmit = (data: HealthFormValues) => {
    // Logger.log('Form submitted:', data);
    if (!isChallengeId) {
      updateHealthProfile(data);
    } else {
      const timeout = setTimeout(() => {
        showAgreement(() => {
          updateHealthProfile(data);
        });
      }, 1000);
      return () => clearTimeout(timeout);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <FocusAwareStatusBar style="dark" />
      {/* Status Bar Background View */}
      {Platform.OS === 'android' && (
        <View
          style={{
            height: insets.top,
            backgroundColor: colors.bg,
          }}
        />
      )}

      {/* Navigation Header */}
      <View style={styles.navHeaderRow}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} />
        </TouchableOpacity>
        <View style={styles.dayBadge}>
          <Text style={styles.dayBadgeText}>Day 0</Text>
        </View>
      </View>

      {/*  Heading */}
      <View style={styles.headingContainer}>
        <Text style={styles.title}>Please fill up your details</Text>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled={true}
        >
          <View style={styles.contentWrapper}>
            {/* Health details */}
            <ControlledInput
              name="healthDetails"
              label="Health Details"
              control={control}
              clearErrors={clearErrors}
              placeholder="Enter details of your health"
              multiline
              styleOverrides={{
                container: 'mb-6',
                label: 'font-ibm-medium text-[#161616B3] mb-3 text-base',
              }}
            />

            {/* Allergies */}
            <ControlledSelectBox
              name="allergies"
              label="Your Allergies"
              placeholder="Select your allergies"
              control={control}
              containerStyle={{ marginBottom: 20 }}
              labelStyle={styles.sectionLabel}
            />

            {/* Preferences */}
            <ControlledPreferencePicker
              name="preference"
              control={control}
              label="Dietary Preference"
              options={preferenceOptions}
              labelStyle={styles.sectionLabel}
            />

            {/* Work Hours */}
            <ControlledSliderInput
              name="workHours"
              control={control}
              label="Work Hours"
            />

            {/* Sleep Hours */}
            <ControlledSliderInput
              name="sleepHours"
              control={control}
              label="Sleep Hours"
            />

            {/* Next Button */}
            <Button
              label="Next"
              testID="next-button"
              variant="login"
              size="login"
              onPress={handleSubmit(onSubmit)}
              disabled={!isValid}
              loading={loading}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const PADDING = 20;
const CARD_GAP = 14;

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  navHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 50,
  },
  dayBadge: {
    backgroundColor: '#6c4cff',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginLeft: 8,
  },
  dayBadgeText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 12,
  },
  headingContainer: {
    paddingHorizontal: PADDING,
    paddingVertical: 8,
  },
  title: {
    fontFamily: Font.IBMPlexSans_600SemiBold,
    fontSize: 22,
  },
  scrollContainer: {
    paddingBottom: 40,
  },
  contentWrapper: {
    flexGrow: 1,
    paddingHorizontal: PADDING,
  },
  sectionLabel: {
    fontFamily: Font.Inter_500Medium,
    fontSize: 15,
    color: '#161616B3',
    marginBottom: 12,
  },
  prefGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: CARD_GAP,
    marginBottom: 28,
  },
  sliderContainer: {
    marginBottom: 16,
  },
  sliderLabel: {
    width: 80,
    fontSize: 16,
    lineHeight: 24,
  },
  errorText: {
    color: 'red',
    fontSize: 13,
    marginTop: 4,
  },
});
