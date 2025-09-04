import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { useKeepAwake } from 'expo-keep-awake';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from 'expo-router';
import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ToggleButtonGroup } from '@/components/screen.components/task-1';
import { AudioPlayer } from '@/components/screen.components/task-4/audio-player';
import { FocusAwareStatusBar } from '@/components/ui';
import { forest } from '@/icons';

export default function AudioPlayerScreen() {
  const audioUri =
    'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3';

  const [zenMode, setZenMode] = useState<boolean>(false);
  const [alarm, setAlarm] = useState<boolean>(false);

  const insets = useSafeAreaInsets();
  const statusBarHeight = insets.top;
  const navigation = useNavigation();

  useKeepAwake(); // Prevent screen from dimming
  return (
    <View style={styles.container}>
      <FocusAwareStatusBar hidden={true} />
      {/* Back Button */}
      <TouchableOpacity
        style={[styles.backButton, { top: statusBarHeight }]}
        onPress={() => navigation.goBack()}
      >
        <Icon name="arrow-left" size={24} color="#fff" />
      </TouchableOpacity>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingBottom: 40,
        }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: '#fff',
            //alignItems: 'center',
          }}
        >
          <LinearGradient
            colors={['#4F2BDA', '#4F2BDA']}
            style={{
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              paddingTop: 50,
            }}
          >
            <View style={{ width: '100%', height: 140 }} />
            <View
              style={{
                width: '100%',
                height: 100,
                backgroundColor: '#fff',
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
              }}
            />
            <View style={styles.imageContainer}>
              <Image source={forest} style={styles.image} />
            </View>
          </LinearGradient>
          <View style={styles.textContainer}>
            <Text style={styles.title}>Painting Forest</Text>
            <Text style={styles.subtitle}>By: Painting with Passion</Text>
          </View>

          <AudioPlayer audioUri={audioUri} progressColor="#4F2BDA" />

          <View style={{ padding: 16, gap: 16 }}>
            {/* Zen Toggle */}
            <View style={styles.toggleRow}>
              <Text style={styles.toggleLabel}>
                Have you put your phone on zen mode
              </Text>
              <ToggleButtonGroup
                value={zenMode}
                onChange={(val) => setZenMode(val)}
              />
            </View>
            {/* Alarm Toggle */}
            <View style={styles.toggleRow}>
              <Text style={styles.toggleLabel}>
                Have you set alarm for next day
              </Text>
              <ToggleButtonGroup
                value={alarm}
                onChange={(val) => setAlarm(val)}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  imageContainer: {
    position: 'absolute',
    backgroundColor: 'white',
    borderRadius: 100,
    padding: 1,
    overflow: 'hidden',
    bottom: 10,
  },
  image: {
    width: 180,
    height: 180,
    borderRadius: 90,
  },
  textContainer: {
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#999',
    marginTop: 4,
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
});
