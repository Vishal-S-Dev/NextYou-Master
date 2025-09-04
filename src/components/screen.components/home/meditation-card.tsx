import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { type HealthAudio } from '@/api/meditation/types';
import { Font } from '@/lib';

import MusicCard from './music-card';

type Props = {
  meditation: HealthAudio;
};

export function MeditationCard({ meditation }: Props) {
  // const openSheet = useAudioSheetStore((state) => state.openSheet);

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Meditation</Text>
      <MusicCard meditation={meditation} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: 16,
    padding: 16,
    backgroundColor: '#13093D',
  },
  sectionTitle: {
    fontSize: 18,
    fontFamily: Font.IBMPlexSans_600SemiBold,
    color: '#fff',
    marginBottom: 8,
    //marginHorizontal: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    borderRadius: 10,
    alignItems: 'center',
    overflow: 'hidden',
    columnGap: 8,
    paddingHorizontal: 8,
    backgroundColor: 'red',
  },
  playBackControlPressable: {
    height: 30,
    width: 30,
    justifyContent: 'center',
  },
  buttonImage: {
    height: 22,
    width: 22,
    tintColor: 'white',
    alignSelf: 'flex-end',
  },
  stopButton: {
    height: 22,
    width: 22,
    alignSelf: 'center',
  },
  staticWaveformView: {
    flex: 1,
    height: 75,
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  card: {
    backgroundColor: '#3e2a6f',
    padding: 16,
    borderRadius: 12,
  },
  text: {
    color: '#fff',
  },
});
