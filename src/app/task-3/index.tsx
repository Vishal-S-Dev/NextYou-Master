import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ImageBackground } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from 'expo-router';
import React, { useState } from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { CoinJarPopupModal, VideoPopupModal } from '@/components';
import SuggestionCard from '@/components/suggestion-card';
import TimerCard from '@/components/timer-card';
import { Button, FocusAwareStatusBar } from '@/components/ui';
import { colors } from '@/lib';

const { width } = Dimensions.get('window');

export default function Task3Screen() {
  const [visible, setVisible] = useState<boolean>(false);
  const [coinJarVisible, setCoinJarVisible] = useState<boolean>(false);
  const [isVideoEnd, setIsVideoEnd] = useState<boolean>(false);

  const insets = useSafeAreaInsets();
  const statusBarHeight = insets.top;
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <FocusAwareStatusBar style="light" />
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingBottom: 40,
        }}
      >
        <ImageBackground
          source={{
            uri: 'https://as1.ftcdn.net/v2/jpg/15/95/44/06/1000_F_1595440617_aJFuSFRFblmqd0lKfHsLgmpSN5j2lzcS.jpg',
          }}
          style={styles.headerImage}
        >
          <TouchableOpacity
            style={[styles.backButton, { top: statusBarHeight }]}
            onPress={() => navigation.goBack()}
          >
            <Icon name="arrow-left" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.playButton}
            onPress={() => {
              setVisible(true);
            }}
          >
            <Ionicons name="play-circle" size={34} color="white" />
          </TouchableOpacity>
        </ImageBackground>

        <View style={styles.card}>
          <Text style={styles.taskLabel}>Task 3</Text>
          <Text style={styles.taskTitle}>
            Wet towel rub on tummy before lunch and benefits
          </Text>
          <Text style={styles.taskDescription}>
            This is dummy text will be replace. This is dummy text will be
            replaced with original content. This is dummy text will be replaced
            with original content.
          </Text>

          <Button
            testID="otp-button"
            className="mt-10"
            label="Check in to Complete Task"
            disabled={!isVideoEnd}
            variant="login"
            size="login"
            onPress={() => {
              setCoinJarVisible(true);
            }}
            // loading={loading}
          />
          <View style={styles.taskCard}>
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 0.9 }}
              colors={[colors.primary[500], colors.primary[500], '#2A1774']}
              style={styles.taskCard}
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
            </LinearGradient>
          </View>
        </View>
      </ScrollView>
      <VideoPopupModal
        visible={visible}
        videoSource="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
        onClose={() => setVisible(false)}
        onEnd={() => {
          setVisible(false);
          setIsVideoEnd(true);
        }}
      />
      <CoinJarPopupModal
        visible={coinJarVisible}
        onClose={() => {
          setCoinJarVisible(false);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 40,
  },
  headerImage: {
    height: width * 0.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    padding: 8,
    borderRadius: 24,
    backgroundColor: 'rgba(0,0,0,0.4)',
    zIndex: 10,
  },
  playButton: {
    borderRadius: 32,
  },
  card: {
    //flex: 1,
    marginTop: -24,
    borderRadius: 24,
    padding: 20,
    backgroundColor: '#fff',
  },
  taskLabel: {
    backgroundColor: '#ffe5df',
    color: '#a0522d',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    fontWeight: 'bold',
    fontSize: 12,
  },
  taskTitle: {
    marginTop: 12,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#5e30eb',
  },
  taskDescription: {
    marginTop: 8,
    color: '#777',
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
  errorText: {
    marginTop: 4,
    color: 'red',
    fontSize: 12,
  },
  taskNote: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '500',
    marginTop: 12,
  },
  taskCard: {
    borderRadius: 16,
    padding: 12,
  },
});
