import { Audio, type AVPlaybackStatus } from 'expo-av';
import { InterruptionModeAndroid, InterruptionModeIOS } from 'expo-av';
import { type Sound } from 'expo-av/build/Audio';
import { useEffect, useRef, useState } from 'react';
import { InteractionManager } from 'react-native';
interface UseAudioPlayerOptions {
  uri: string;
  onPlaybackStatusUpdate?: (status: AVPlaybackStatus) => void;
  shouldPlay?: boolean;
}

export function useAudioPlayer({
  uri,
  onPlaybackStatusUpdate,
  shouldPlay = false,
}: UseAudioPlayerOptions) {
  const [duration, setDuration] = useState<number | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const soundRef = useRef<Sound | null>(null);

  useEffect(() => {
    let isMounted = true;

    const setupAudio = async () => {
      try {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          playsInSilentModeIOS: true,
          staysActiveInBackground: false,
          interruptionModeIOS: InterruptionModeIOS.DoNotMix,
          shouldDuckAndroid: true,
          interruptionModeAndroid: InterruptionModeAndroid.DoNotMix,
          playThroughEarpieceAndroid: false,
        });

        const { sound } = await Audio.Sound.createAsync(
          { uri },
          { shouldPlay },
          onPlaybackStatusUpdate
        );

        if (!isMounted) {
          await sound.unloadAsync();
          return;
        }

        soundRef.current = sound;
        setIsLoaded(true);

        const status = await sound.getStatusAsync();
        if (status.isLoaded) {
          setDuration(status.durationMillis ?? null);
        }
      } catch (error) {
        console.warn('Error loading audio:', error);
      }
    };

    setupAudio();

    return () => {
      isMounted = false;
      const sound = soundRef.current;
      InteractionManager.runAfterInteractions(() => {
        sound?.unloadAsync().catch(console.warn);
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uri]);

  return {
    sound: soundRef.current,
    isLoaded,
    duration,
  };
}
