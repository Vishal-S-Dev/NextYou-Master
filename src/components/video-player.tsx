import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import React, { useCallback, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Video from 'react-native-video';

import { Button } from './ui';
const { width } = Dimensions.get('window');

const formatTime = (secs: number): string => {
  const minutes = Math.floor(secs / 60);
  const seconds = Math.floor(secs % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

interface Props {
  videoSource: string;
  onEnd?: () => void;
  poopCheckIn?: () => void;
}

const VideoPlayer = ({ videoSource, poopCheckIn, onEnd }: Props) => {
  const videoRef = useRef<any>(null);

  const [paused, setPaused] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [buffering, setBuffering] = useState(false);
  const [showCheckPoop, setShowCheckPoop] = useState(false);

  const handleLoad = useCallback(({ duration }: { duration: number }) => {
    setDuration(duration);
  }, []);

  const handleProgress = useCallback(
    ({ currentTime }: { currentTime: number }) => {
      setCurrentTime(currentTime);

      const poopTriggerTime = (duration * 3) / 4;
      setShowCheckPoop(
        poopCheckIn !== undefined && currentTime >= poopTriggerTime
      );
    },
    [duration, poopCheckIn]
  );

  const handleBuffer = useCallback(
    ({ isBuffering }: { isBuffering: boolean }) => setBuffering(isBuffering),
    []
  );

  const seek = useCallback(
    (time: number) =>
      videoRef.current?.seek(Math.min(Math.max(time, 0), duration)),
    [duration]
  );

  return (
    <View style={styles.container}>
      <Video
        ref={videoRef}
        source={{ uri: videoSource }}
        style={StyleSheet.absoluteFill}
        resizeMode="cover"
        paused={paused}
        onLoad={handleLoad}
        onProgress={handleProgress}
        onBuffer={handleBuffer}
        onEnd={onEnd}
        repeat={false}
      />

      <View style={styles.controls}>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={duration}
          value={currentTime}
          onSlidingComplete={seek}
          minimumTrackTintColor="#9F79FF"
          maximumTrackTintColor="#888"
          thumbTintColor="#9F79FF"
        />

        <View style={styles.timeRow}>
          <Text style={styles.timeLabel}>{formatTime(currentTime)}</Text>
          <Text style={styles.timeLabel}>{formatTime(duration)}</Text>
        </View>

        <View style={styles.buttons}>
          <IconButton icon="play-back" onPress={() => seek(currentTime - 10)} />
          <View style={styles.playButtonHolder}>
            {buffering ? (
              <ActivityIndicator size="large" color="#fff" />
            ) : (
              <TouchableOpacity onPress={() => setPaused((prev) => !prev)}>
                <View style={styles.playButton}>
                  <Ionicons
                    name={paused ? 'play' : 'pause'}
                    size={32}
                    color="#9F79FF"
                    style={{ marginLeft: 4 }}
                  />
                </View>
              </TouchableOpacity>
            )}
          </View>
          <IconButton
            icon="play-forward"
            onPress={() => seek(currentTime + 10)}
          />
        </View>

        {showCheckPoop && poopCheckIn && (
          <Button
            className="mt-4"
            label="Poop check - in"
            variant="login"
            size="login"
            onPress={poopCheckIn}
          />
        )}
      </View>
    </View>
  );
};

export default VideoPlayer;

// --- Reusable IconButton Component ---
const IconButton = ({
  icon,
  onPress,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
}) => (
  <TouchableOpacity onPress={onPress}>
    <View style={styles.playBackButton}>
      <Ionicons name={icon} size={18} color="#9F79FF" />
    </View>
  </TouchableOpacity>
);

// --- Styles ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  controls: {
    position: 'absolute',
    bottom: 30,
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  slider: {
    width: width - 48,
    height: 40,
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 10,
  },
  timeLabel: {
    color: '#fff',
    fontSize: 12,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginTop: 16,
    paddingHorizontal: 10,
  },
  playButtonHolder: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#9F79FF',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  playBackButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
