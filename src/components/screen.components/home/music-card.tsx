import { MaterialIcons } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import { ImagePath } from '@/api';
import { type HealthAudio } from '@/api/meditation/types';
import { HomeAudioPlayer } from '@/components/home-audio-player';
import { meditationImage } from '@/icons';

type Props = {
  meditation: HealthAudio;
};

export default function MusicCard({ meditation }: Props) {
  const audioUri =
    ImagePath(meditation.audio) ??
    require('@assets/audio/meditation_sound.mp3');
  // console.log('audioUri :--', audioUri);
  return (
    <View style={styles.container}>
      <Image
        source={meditationImage} // Replace with your image
        style={styles.thumbnail}
      />
      <View style={styles.content}>
        <Text style={styles.title}>{meditation.title}</Text>
        <Text style={styles.subtitle}>{meditation.subTitle}</Text>

        <HomeAudioPlayer
          audioUri={audioUri}
          playIcon={<MaterialIcons name="play-arrow" size={28} color="#fff" />}
          pauseIcon={<MaterialIcons name="pause" size={28} color="#fff" />}
          progressColor="#EB8468"
          playPauseBtnStyle={styles.playButton}
          durationTextStyle={styles.duration}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF33',
    padding: 16,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  thumbnail: {
    width: 64,
    height: 64,
    borderRadius: 12,
    marginRight: 12,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  subtitle: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 4,
  },
  waveform: {
    height: 40,
    marginVertical: 4,
  },
  durationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  duration: {
    fontSize: 12,
    color: '#fff',
  },
  playButton: {
    backgroundColor: '#5A4BDA',
    borderRadius: 32,
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
});
