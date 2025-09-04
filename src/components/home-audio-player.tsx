/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable max-lines-per-function */
/* eslint-disable react-hooks/rules-of-hooks */
import { type AVPlaybackStatus } from 'expo-av';
import React, { useCallback, useState } from 'react';
import {
  type StyleProp,
  StyleSheet,
  Text,
  type TextStyle,
  TouchableOpacity,
  View,
  type ViewStyle,
} from 'react-native';
import { runOnJS, useSharedValue } from 'react-native-reanimated';

import { useAudioPlayer } from '@/hooks';

import { WaveformVisualizer } from './ui/audio-wave/waveform-visualizer';

type Props = {
  audioUri: string;
  barWidth?: number;
  gap?: number;
  color?: string;
  progressColor?: string;
  height?: number;
  playIcon?: React.ReactNode;
  pauseIcon?: React.ReactNode;
  playPauseBtnStyle?: StyleProp<ViewStyle>;
  durationTextStyle?: StyleProp<TextStyle>;
  onPlay?: () => void;
  onPause?: () => void;
  onSeek?: (positionMillis: number) => void;
};

export const HomeAudioPlayer: React.FC<Props> = ({
  audioUri,
  barWidth = 3,
  gap = 2,
  color = '#ccc',
  progressColor = '#4db6ac',
  height = 30,
  playIcon = <Text style={styles.control}>▶️</Text>,
  pauseIcon = <Text style={styles.control}>⏸️</Text>,
  playPauseBtnStyle,
  durationTextStyle,
  onPlay,
  onPause,
  onSeek,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const progress = useSharedValue(0);
  const dummyWaveform = Array.from({ length: 75 }, () => Math.random());

  const onPlaybackStatusUpdate = useCallback(
    (status: AVPlaybackStatus) => {
      if (!status.isLoaded) return;
      runOnJS(setPosition)(status.positionMillis);
      progress.value = status.positionMillis / (status.durationMillis || 1);
      if (status.didJustFinish) runOnJS(setIsPlaying)(false);
    },
    [progress]
  );

  const { sound, isLoaded, duration, error } = useAudioPlayer({
    uri: audioUri,
    shouldPlay: false,
    onPlaybackStatusUpdate: (st) => {
      onPlaybackStatusUpdate(st);
    },
  });

  const togglePlayPause = async () => {
    if (!sound || isTransitioning || error) return;
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
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
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
          durationTextStyle={durationTextStyle}
          onSeek={handleSeek}
        />
        <TouchableOpacity
          style={[styles.playButton, playPauseBtnStyle]}
          onPress={togglePlayPause}
          disabled={!isLoaded || isTransitioning}
          //android_ripple={{ color: '#ECECEC' }}
        >
          {isPlaying ? pauseIcon : playIcon}
        </TouchableOpacity>
      </View>
      {error && <Text style={styles.error}>{error.message}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingVertical: 12,
  },
  footer: {
    marginTop: 6,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  playButton: {
    backgroundColor: '#00796b',
    borderRadius: 6,
    padding: 10,
  },
  control: {
    fontSize: 22,
    color: '#fff',
  },
  time: {
    fontSize: 14,
    color: '#555',
  },
  error: {
    fontSize: 14,
    color: '#f44336',
  },
});
