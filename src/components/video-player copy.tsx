import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import { LinearGradient } from 'expo-linear-gradient';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Video from 'react-native-video';

const { width } = Dimensions.get('window');
const VIDEO_SOURCE =
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4';

const formatTime = (secs: number): string => {
  const minutes = Math.floor(secs / 60);
  const seconds = Math.floor(secs % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

const VideoPlayer = () => {
  const videoRef = useRef<any>(null);
  const hideTimerRef = useRef<NodeJS.Timeout | null>(null);

  const [paused, setPaused] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [buffering, setBuffering] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(true);

  const opacity = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const showControls = useCallback(() => {
    setControlsVisible(true);
    opacity.value = withTiming(1);
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    hideTimerRef.current = setTimeout(() => {
      runOnJS(setControlsVisible)(false);
      opacity.value = withTiming(0);
    }, 5000);
  }, [opacity]);

  useEffect(() => {
    showControls(); // Show initially
    return () => {
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, [showControls]);

  const toggleControls = () => {
    if (controlsVisible) {
      setControlsVisible(false);
      opacity.value = withTiming(0);
    } else {
      showControls();
    }
  };

  const onLoad = useCallback(({ duration }: { duration: number }) => {
    setDuration(duration);
  }, []);

  const onProgress = useCallback(({ currentTime }: { currentTime: number }) => {
    setCurrentTime(currentTime);
  }, []);

  const onBuffer = useCallback(({ isBuffering }: { isBuffering: boolean }) => {
    setBuffering(isBuffering);
  }, []);

  const seek = useCallback(
    (time: number) => {
      videoRef.current?.seek(time);
      showControls(); // Keep controls visible when interacting
    },
    [showControls]
  );

  const formattedTime = useMemo(
    () => `${formatTime(currentTime)} / ${formatTime(duration)}`,
    [currentTime, duration]
  );

  const handleVideoEnd = useCallback(() => {
    setPaused(true); // Pause the video
    setCurrentTime(duration); // Ensure progress is at end
    showControls(); // Show controls
    // You can also show a modal, restart, or navigate
  }, [duration, showControls]);

  return (
    <TouchableWithoutFeedback onPress={toggleControls}>
      <View style={styles.container}>
        <Video
          ref={videoRef}
          source={{ uri: VIDEO_SOURCE }}
          style={StyleSheet.absoluteFill}
          resizeMode="cover"
          paused={paused}
          onLoad={onLoad}
          onProgress={onProgress}
          onBuffer={onBuffer}
          repeat={false}
          onEnd={handleVideoEnd}
        />

        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.8)']}
          style={StyleSheet.absoluteFill}
        />

        <Animated.View style={[styles.controls, animatedStyle]}>
          <Text style={styles.timerText}>{formattedTime}</Text>

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

          <View style={styles.buttons}>
            <TouchableOpacity
              onPress={() => seek(Math.max(currentTime - 10, 0))}
            >
              <Ionicons name="play-back" size={36} color="white" />
            </TouchableOpacity>

            {buffering ? (
              <ActivityIndicator size="large" color="#fff" />
            ) : (
              <TouchableOpacity
                onPress={() => {
                  setPaused((prev) => !prev);
                  showControls();
                }}
              >
                <View style={[styles.playButton]}>
                  <Ionicons
                    name={paused ? 'play' : 'pause'}
                    size={30}
                    color="#9F79FF"
                  />
                </View>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              onPress={() => seek(Math.min(currentTime + 10, duration))}
            >
              <Ionicons name="play-forward" size={36} color="white" />
            </TouchableOpacity>
          </View>
        </Animated.View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default VideoPlayer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  controls: {
    position: 'absolute',
    bottom: 40,
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  timerText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  slider: {
    width: width - 48,
    height: 40,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 200,
    marginTop: 16,
  },
  playButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: '#9F79FF',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
