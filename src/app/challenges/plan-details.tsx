import { Image } from 'expo-image';
import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ImagePath } from '@/api';
import { useChallengeSubscribe } from '@/api/challenges';
import {
  FocusAwareStatusBar,
  NavigationHeader,
  showErrorMessage,
} from '@/components/ui';
import { colors } from '@/lib';
import { Logger } from '@/lib/logger';
import { useActiveChallenge } from '@/store';
const PlanDetailsScreen = () => {
  const activeChallenge = useActiveChallenge();
  const challenge = activeChallenge?.challenge;

  const challengeSubscribe = useChallengeSubscribe();
  const { mutate: subscribe } = challengeSubscribe();

  const restoreSubscription = () => {
    // Subscription logic here
    if (!challenge) {
      showErrorMessage('No challenge found to subscribe');
      return;
    }

    subscribe(
      { challengeId: challenge._id },
      {
        onSuccess: (responseData) => {
          const json = JSON.stringify(responseData, null, 2);
          Logger.log('challengeSubscribe ::', json);
          showMessage({ message: 'Subscription restored successfully!' });
          const timeout = setTimeout(() => router.replace('/'), 2000);
          return () => clearTimeout(timeout);
        },
        onError: (error) => {
          const message = `challengeSubscribe failed, ${error.response?.data.message || error.message}`;
          console.error(error.response?.data);
          showErrorMessage(message);
        },
      }
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.bg }}>
      <FocusAwareStatusBar style="dark" />
      {/* Header */}
      <NavigationHeader
        title="Plan Details"
        onBackPress={() => router.back()}
      />

      <View style={styles.container}>
        {/* Plan Card */}
        {challenge && (
          <View style={styles.planCard}>
            <Image
              source={{ uri: ImagePath(challenge.banner) }}
              style={styles.planImage}
            />
            <View style={styles.planInfo}>
              <Text style={styles.planTitle}>{challenge.title}</Text>
              <Text style={styles.planSubtitle}>{challenge.subTitle}</Text>
            </View>
            <View style={styles.planRight}>
              <Text style={styles.planPrice}>₹ {challenge.price}</Text>
            </View>
          </View>
        )}

        {activeChallenge && (
          <>
            {/* Trial Start Date */}
            <View style={styles.row}>
              <Text style={styles.label}>Trial Start Date</Text>
              <Text style={styles.value}>{activeChallenge.trialStartDate}</Text>
            </View>

            {/* Expiration Date */}
            <View style={styles.row}>
              <Text style={styles.label}>Expiration Date</Text>
              <Text style={styles.value}>-:-</Text>
            </View>

            {/* Manage Subscription */}
            <View style={styles.row}>
              <Text style={styles.label}>Manage my subscription</Text>
              <TouchableOpacity>
                <Text style={styles.link}>View details</Text>
              </TouchableOpacity>
            </View>

            {/* Restore Purchase */}
            <View style={styles.row}>
              <Text style={styles.label}>Restore Purchase</Text>
              <TouchableOpacity onPress={restoreSubscription}>
                <Text style={styles.link}>Restore</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

export default PlanDetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    gap: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
  },
  backButton: {
    padding: 8,
    borderRadius: 24,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  planCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6C63FF',
    borderRadius: 12,
    padding: 12,
    marginBottom: 24,
  },
  planImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    backgroundColor: '#E0E0E0',
  },
  planInfo: {
    flex: 1,
    marginLeft: 12,
  },
  planTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  planSubtitle: {
    fontSize: 13,
    color: '#E0E0E0',
    marginTop: 2,
  },
  planRight: {
    alignItems: 'flex-end',
    justifyContent: 'center',
    gap: 4,
  },
  planPrice: {
    fontSize: 15,
    fontWeight: '600',
    color: '#fff',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#E5E7EB',
  },
  label: {
    fontSize: 15,
    color: '#111827',
  },
  value: {
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
  },
  link: {
    fontSize: 15,
    fontWeight: '600',
    textDecorationLine: 'underline',
    color: '#111827',
  },
});
