import { LinearGradient } from 'expo-linear-gradient';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { Font, TextAlign, TextSize } from '@/lib';

import { Text } from '../text';
import AnimatedCircularProgress from './animated-circular-progress';

const MAX_DURATION_MS = 2 * 60 * 1000;

interface TimerButtonProps {
  currentDuration: number; // in seconds
  onStart?: () => void;
  onStop: (duration: number) => void;
}

const TimerButton: React.FC<TimerButtonProps> = ({
  currentDuration,
  onStart,
  onStop,
}) => {
  const [pressed, setPressed] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [fill, setFill] = useState(0);
  const [elapsedSec, setElapsedSec] = useState(0);

  const frameRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);

  // Initialize fill and elapsed time from props
  useEffect(() => {
    const initialMs = currentDuration * 1000;
    setElapsedSec(currentDuration);
    setFill(Math.min((initialMs / MAX_DURATION_MS) * 100, 100));
  }, [currentDuration]);

  // Format mm:ss string
  const timerString = useMemo(() => {
    const iso = new Date(elapsedSec * 1000).toISOString();
    return iso.slice(14, 19); // "mm:ss"
  }, [elapsedSec]);

  // Gradient color based on running state
  const gradientColors = useMemo<[string, string]>(
    () => (isRunning ? ['#FFDCD2', '#FFDCD2'] : ['#4F2BDA', '#412A9C']),
    [isRunning]
  );

  // Animate progress via requestAnimationFrame
  const updateProgress = useCallback(() => {
    const now = Date.now();
    const elapsedMs = now - startTimeRef.current;
    const newElapsedSec = Math.floor(elapsedMs / 1000);

    setElapsedSec(newElapsedSec);
    setFill(Math.min((elapsedMs / MAX_DURATION_MS) * 100, 100));

    if (elapsedMs >= MAX_DURATION_MS) {
      stopTimer();
      return;
    }

    frameRef.current = requestAnimationFrame(updateProgress);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const startTimer = () => {
    setIsRunning(true);
    startTimeRef.current = Date.now();
    frameRef.current = requestAnimationFrame(updateProgress);
    onStart && onStart();
  };

  const stopTimer = () => {
    if (frameRef.current !== null) {
      cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    }
    setIsRunning(false);
    onStop(elapsedSec);
  };

  const handleToggle = () => {
    if (isRunning) {
      stopTimer();
    } else {
      startTimer();
    }
  };

  return (
    <View style={styles.container}>
      <View style={[styles.progressContainer, pressed && styles.pressed]}>
        <Pressable
          onPressIn={() => setPressed(true)}
          onPressOut={() => {
            setPressed(false);
            handleToggle();
          }}
          style={styles.pressableWrapper}
        >
          <LinearGradient
            colors={gradientColors}
            style={styles.gradientButton}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Text
              font={Font.IBMPlexSans_600SemiBold}
              size={TextSize['2xl']}
              textAlign={TextAlign.center}
              style={[{ color: isRunning ? '#161616' : '#fff' }]}
            >
              {isRunning ? 'Stop' : 'Start'}
            </Text>
          </LinearGradient>
          <AnimatedCircularProgress
            style={StyleSheet.absoluteFill}
            size={150}
            width={10}
            fill={fill}
            prefill={0}
            backgroundColor="transparent"
            linecap="round"
            gradientSteps={['#FFFFFF00', '#EB8468', '#D96141', '#D96141']}
            rotation={0}
          />
        </Pressable>
      </View>

      <Text font={Font.Inter_400Regular} className="mt-6">
        Total Duration
      </Text>

      <Text
        font={Font.IBMPlexSans_700Bold}
        size={TextSize['5xl']}
        className={timerString === '00:00' ? 'color-gray-400' : 'color-[#333]'}
      >
        {timerString}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  progressContainer: {
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 75,
    borderWidth: 0.2,
    borderColor: '#eee',
    //borderBottomWidth: 2,
    marginVertical: 10,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 5,
  },
  pressed: {
    transform: [{ translateY: 4 }],
    shadowOffset: { width: 1, height: 2 },
    shadowOpacity: 0.15,
    elevation: 4,
  },
  pressableWrapper: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradientButton: {
    flex: 1,
    width: '100%',
    borderRadius: 75,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TimerButton;
