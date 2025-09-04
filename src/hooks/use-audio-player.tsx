/* eslint-disable react-hooks/exhaustive-deps */
import { Audio, type AVPlaybackStatus } from 'expo-av';
import { InterruptionModeAndroid, InterruptionModeIOS } from 'expo-av';
import { type Sound } from 'expo-av/build/Audio';
import * as FileSystem from 'expo-file-system';
import { useEffect, useRef, useState } from 'react';
import { InteractionManager } from 'react-native';

import { storage } from '@/lib';

interface UseAudioPlayerOptions {
  uri: string; // Remote URL
  onPlaybackStatusUpdate?: (status: AVPlaybackStatus) => void;
  shouldPlay?: boolean;
  isStore?: boolean; // Enable caching
}

const AUDIO_KEY_PREFIX = 'audio:';

const getCachedOrRemoteUri = async (remoteUri: string): Promise<string> => {
  const key = `${AUDIO_KEY_PREFIX}${remoteUri}`;
  const cached = storage.getString(key);

  if (cached) {
    const info = await FileSystem.getInfoAsync(cached);
    if (info.exists) {
      return cached; // ✅ Use local file
    } else {
      storage.delete(key); // Clean up broken mapping
    }
  }

  return remoteUri; // 🔄 Fallback to remote stream
};

const cacheAudioInBackground = async (remoteUri: string): Promise<void> => {
  const key = `${AUDIO_KEY_PREFIX}${remoteUri}`;
  if (storage.getString(key)) return;

  try {
    const filename = remoteUri.split('/').pop() ?? `audio-${Date.now()}.mp3`;
    const localUri = FileSystem.documentDirectory + filename;

    const info = await FileSystem.getInfoAsync(localUri);
    if (info.exists) {
      storage.set(key, localUri);
      return;
    }

    await FileSystem.downloadAsync(remoteUri, localUri);
    storage.set(key, localUri);
  } catch (err) {
    console.warn('Background caching failed:', err);
  }
};

export function useAudioPlayer({
  uri,
  onPlaybackStatusUpdate,
  shouldPlay = false,
  isStore = false,
}: UseAudioPlayerOptions) {
  const [duration, setDuration] = useState<number | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const soundRef = useRef<Sound | null>(null);
  const [playUri, setPlayUri] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const setup = async () => {
      try {
        const resolvedUri = await getCachedOrRemoteUri(uri);
        if (!isMounted) return;
        setPlayUri(resolvedUri);
      } catch (err: any) {
        console.warn('Error resolving audio URI:', err);
        setError(err);
      }
    };

    setup();

    return () => {
      isMounted = false;
    };
  }, [uri]);

  useEffect(() => {
    if (!playUri) return;

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
          { uri: playUri },
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

        if (isStore && playUri === uri) {
          // If we're still playing from remote URI, cache it
          cacheAudioInBackground(uri);
        }
      } catch (err: any) {
        console.warn('Audio setup failed:', err);
        setError(err);
      }
    };

    setupAudio();

    return () => {
      isMounted = false;
      InteractionManager.runAfterInteractions(() => {
        soundRef.current?.unloadAsync().catch(console.warn);
      });
    };
  }, [playUri, shouldPlay]);

  return {
    sound: soundRef.current,
    isLoaded,
    duration,
    error,
    isUsingCache: playUri !== uri,
  };
}
