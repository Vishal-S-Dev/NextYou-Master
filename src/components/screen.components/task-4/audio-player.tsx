/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable max-lines-per-function */
/* eslint-disable react-hooks/rules-of-hooks */
import { Ionicons } from '@expo/vector-icons';
import { type AVPlaybackStatus } from 'expo-av';
import React, { useCallback, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { runOnJS, useSharedValue } from 'react-native-reanimated';

import { WaveformVisualizer } from '@/components/ui/audio-wave/waveform-visualizer';
import { useAudioPlayer } from '@/hooks';

type Props = {
  audioUri: string;
  barWidth?: number;
  gap?: number;
  color?: string;
  progressColor?: string;
  height?: number;
  onPlay?: () => void;
  onPause?: () => void;
  onSeek?: (positionMillis: number) => void;
};

export const AudioPlayer: React.FC<Props> = ({
  audioUri,
  barWidth = 3,
  gap = 2,
  color = '#ccc',
  progressColor = '#4db6ac',
  height = 30,

  onPlay,
  onPause,
  onSeek,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const progress = useSharedValue(0);
  const dummyWaveform = Array.from({ length: 80 }, () => Math.random());
  const onPlaybackStatusUpdate = useCallback(
    (status: AVPlaybackStatus) => {
      if (!status.isLoaded) return;
      runOnJS(setPosition)(status.positionMillis);
      progress.value = status.positionMillis / (status.durationMillis || 1);
      if (status.didJustFinish) runOnJS(setIsPlaying)(false);
    },
    [progress]
  );

  const { sound, isLoaded, duration } = useAudioPlayer({
    uri: audioUri,
    shouldPlay: false,
    onPlaybackStatusUpdate: (st) => {
      onPlaybackStatusUpdate(st);
    },
  });

  const togglePlayPause = async () => {
    if (!sound || isTransitioning) return;
    setIsTransitioning(true);

    try {
      const status = await sound.getStatusAsync();

      if (status.isLoaded) {
        const hasFinished =
          status.didJustFinish ||
          (status.positionMillis ?? 0) >= (status.durationMillis ?? 0);
        if (hasFinished) await sound.setPositionAsync(0);

        if (status.isPlaying) {
          setIsPlaying(false);
          await sound.pauseAsync();
          onPause?.();
        } else {
          setIsPlaying(true);
          await sound.playAsync();
          onPlay?.();
        }
      }
    } catch (err) {
      console.warn('Playback error:', err);
    } finally {
      setIsTransitioning(false);
    }
  };

  const handleSeek = async (seekMillis: number) => {
    if (!sound || !duration) return;
    setIsTransitioning(true);
    await sound.setPositionAsync(seekMillis);
    progress.value = seekMillis / duration;
    onSeek?.(seekMillis);
    setIsTransitioning(false);
  };

  return (
    <View style={styles.container}>
      <View style={{ width: '80%', gap: 8 }}>
        <WaveformVisualizer
          waveform={dummyWaveform}
          barWidth={barWidth}
          gap={gap}
          color={color}
          progressColor={progressColor}
          height={height}
          progress={progress}
          duration={duration}
          position={position}
          durationTextStyle={styles.duration}
          onSeek={handleSeek}
        />

        {/* Controls */}
        <View style={styles.controlsContainer}>
          <Ionicons name="shuffle" size={24} color="#888" />
          <Ionicons name="play-skip-back" size={24} color="#888" />
          <TouchableOpacity
            style={styles.playButton}
            onPress={togglePlayPause}
            disabled={!isLoaded || isTransitioning}
          >
            <Ionicons
              name={isPlaying ? 'pause' : 'play'}
              size={32}
              color="white"
            />
          </TouchableOpacity>
          <Ionicons name="play-skip-forward" size={24} color="#888" />
          <Ionicons name="repeat" size={24} color="#888" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    width: '100%',
    paddingVertical: 12,
  },
  footer: {
    marginTop: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  playButton: {
    backgroundColor: '#5F35F5',
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  control: {
    fontSize: 22,
    color: '#fff',
  },
  time: {
    fontSize: 14,
    color: '#555',
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  duration: {
    fontSize: 12,
    color: '#000',
  },
});
