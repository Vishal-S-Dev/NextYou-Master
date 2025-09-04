import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';

import { TitleSubTitleText } from '@/components';
import { FocusAwareStatusBar } from '@/components/ui';
import { Button } from '@/components/ui';
import { CoinBox, CoinBoxBG } from '@/icons';
import { colors } from '@/lib';

export default function AssessmentStart() {
  const router = useRouter();

  const handleStart = () => {
    router.push('/assessment/take-assessment');
  };

  return (
    <View style={{ flex: 1 }}>
      <FocusAwareStatusBar style="light" />
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 0.9 }}
        colors={[
          colors.primary[500],
          colors.primary[500],
          'rgba(0, 0, 0, 0.92)',
        ]}
        style={styles.bgGradient}
      >
        <SafeAreaView style={{ flex: 1 }}>
          <View className="flex-1 items-center justify-center">
            <CoinBoxBG />
            <CoinBox style={{ position: 'absolute' }} />
          </View>
          <View className="justify-center p-8">
            <TitleSubTitleText
              title="Start getting rewarded now"
              subText="3 minutes quiz .  8 questions, Big clarity."
              titleClassName="text-2xl text-white"
              subTextClassName="text-white"
            />
            {/* <View className="flex-row gap-4"> */}
            <Button
              label="Take Assessment"
              variant="login"
              size="login"
              onPress={handleStart}
            />
            {/* <Button
                label="Skip"
                variant="login"
                size="login"
                className="bg-gray-500"
                onPress={() => console.log('tets')}
              /> */}
            {/* </View> */}
          </View>
        </SafeAreaView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  bgGradient: {
    flex: 1,
  },
});
