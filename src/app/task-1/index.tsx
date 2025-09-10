import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { zodResolver } from '@hookform/resolvers/zod';
import { ImageBackground } from 'expo-image';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import React, { useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { z } from 'zod';

import { useTaskUpdateStatus } from '@/api/challenges';
import { CoinJarPopupModal, VideoPopupModal } from '@/components';
import {
  ImagePickerButton,
  ToggleButtonGroup,
} from '@/components/screen.components/task-1';
import { Button, FocusAwareStatusBar, showErrorMessage } from '@/components/ui';
import ImagePickerBottomSheet, {
  type ImagePickerBottomSheetRef,
} from '@/components/ui/image-picker-bottom-sheet';
import { useUpdateTaskByDay } from '@/store';
import { useTaskStore } from '@/store/use-task-store';

export const task1Schema = z.object({
  imageUri: z.string({ required_error: 'Please take a picture of 1L water.' }),
  addedSalt: z.boolean({ required_error: 'Please select if you added salt.' }),
  addedLemon: z.boolean({
    required_error: 'Please select if you added lemon.',
  }),
});

export type Task1FormValues = z.infer<typeof task1Schema>;

const { width } = Dimensions.get('window');

export default function Task1Screen() {
  const bottomSheetRef = useRef<ImagePickerBottomSheetRef>(null);
  const onPickImageRef = useRef<(uri: string) => void>();

  const [visible, setVisible] = useState<boolean>(false);
  const [coinJarVisible, setCoinJarVisible] = useState<boolean>(false);

  const insets = useSafeAreaInsets();
  const statusBarHeight = insets.top;
  const navigation = useNavigation();

  const { day, taskId } = useLocalSearchParams<{
    day: string;
    taskId: string;
  }>();

  const { getCurrentDayTaskById } = useTaskStore();

  const task = getCurrentDayTaskById(taskId);

  const {
    control,
    handleSubmit,
    //watch,
    formState: { errors, isValid },
  } = useForm<Task1FormValues>({
    resolver: zodResolver(task1Schema),
    defaultValues: {
      //imageUri: '',
      //addedSalt: false,
      //addedLemon: false,
    },
  });

  // const imageUri = watch('imageUri');
  const updateTaskByDay = useUpdateTaskByDay();
  const taskUpdateStatus = useTaskUpdateStatus();
  const { mutate: updateTaskStatus } = taskUpdateStatus();

  const updateStatus = (taskId: string, data: Task1FormValues) => {
    updateTaskStatus(
      {
        taskId: taskId,
        day: day,
        status: 'completed',
        answers: data,
      },
      {
        onSuccess: (response) => {
          console.log('updateTaskStatus success:', response);
          updateTaskByDay();
          setCoinJarVisible(true);
          <CoinJarPopupModal
            visible={coinJarVisible}
            coins={task?.points}
            onClose={() => {
              setCoinJarVisible(false);
            }}
          />;
        },
        onError: (error) => {
          const message = `updateTaskStatus failed, ${error.response?.data.message || error.message}`;
          console.error(error.response?.data);
          showErrorMessage(message);
        },
      }
    );
  };

  const onSubmit = (data: Task1FormValues) => {
    console.log('Form submitted:', data);
    updateStatus(taskId, data);
  };

  return (
    <View style={{ flex: 1, backgroundColor: '#fff' }}>
      <FocusAwareStatusBar style="light" />
      <ScrollView contentContainerStyle={styles.container}>
        <ImageBackground
          source={{
            uri: 'https://as1.ftcdn.net/v2/jpg/15/95/44/06/1000_F_1595440617_aJFuSFRFblmqd0lKfHsLgmpSN5j2lzcS.jpg',
          }}
          style={styles.headerImage}
        >
          <Pressable
            style={[styles.backButton, { top: statusBarHeight }]}
            onPress={() => navigation.goBack()}
          >
            <Icon name="arrow-left" size={24} color="#fff" />
          </Pressable>
          <Pressable
            style={styles.playButton}
            onPress={() => {
              setVisible(true);
            }}
          >
            <Ionicons name="play-circle" size={34} color="white" />
          </Pressable>
        </ImageBackground>

        <View style={styles.card}>
          <Text style={styles.taskLabel}>Task {task?.type}</Text>
          <Text style={styles.taskTitle}>{task?.title}</Text>
          <Text style={styles.taskDescription}>{task?.description}</Text>

          {/* Image Picker */}
          <Controller
            control={control}
            name="imageUri"
            render={({ field: { value, onChange } }) => (
              <>
                <ImagePickerButton
                  imageUri={value}
                  pickImage={() => {
                    //onPickImageRef.current = (uri) => onChange(uri);
                    onPickImageRef.current = (uri) => {
                      console.log('📸 Picked Image URI:', uri);
                      onChange(uri);
                    };
                    bottomSheetRef.current?.open();
                  }}
                />
              </>
            )}
          />
          {errors.imageUri && (
            <Text style={styles.errorText}>{errors.imageUri.message}</Text>
          )}

          {/* Salt Toggle */}
          <View style={styles.toggleRow}>
            <Text style={styles.toggleLabel}>Did you add pinch of salt</Text>
            <Controller
              control={control}
              name="addedSalt"
              render={({ field: { value, onChange } }) => (
                <ToggleButtonGroup value={value} onChange={onChange} />
              )}
            />
          </View>
          {errors.addedSalt && (
            <Text style={styles.errorText}>{errors.addedSalt.message}</Text>
          )}

          {/* Lemon Toggle */}
          <View style={styles.toggleRow}>
            <Text style={styles.toggleLabel}>Did you add lemon</Text>
            <Controller
              control={control}
              name="addedLemon"
              render={({ field: { value, onChange } }) => (
                <ToggleButtonGroup value={value} onChange={onChange} />
              )}
            />
          </View>
          {errors.addedLemon && (
            <Text style={styles.errorText}>{errors.addedLemon.message}</Text>
          )}

          <Button
            testID="otp-button"
            className="mt-10"
            label="Check in to Complete Task"
            disabled={!isValid}
            variant="login"
            size="login"
            onPress={handleSubmit(onSubmit)}
            // loading={loading}
          />
        </View>
        <CoinJarPopupModal
          visible={coinJarVisible}
          coins={task?.points}
          onClose={() => {
            setCoinJarVisible(false);
          }}
        />
        <VideoPopupModal
          visible={visible}
          videoSource="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
          onClose={() => setVisible(false)}
        />
      </ScrollView>
      {/* Shared Bottom Sheet */}
      <ImagePickerBottomSheet
        ref={bottomSheetRef}
        onImagePicked={(uri) => onPickImageRef.current?.(uri)} // ✅ update RHF value
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 40,
  },
  headerImage: {
    height: width * 0.8,
    justifyContent: 'center',
    alignItems: 'center',
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
  playButton: {
    borderRadius: 32,
  },
  card: {
    flex: 1,
    marginTop: -24,
    borderRadius: 24,
    backgroundColor: '#fff',
    padding: 20,
  },
  taskLabel: {
    backgroundColor: '#ffe5df',
    color: '#a0522d',
    alignSelf: 'flex-start',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    fontWeight: 'bold',
    fontSize: 12,
  },
  taskTitle: {
    marginTop: 12,
    fontSize: 18,
    fontWeight: 'bold',
    color: '#5e30eb',
  },
  taskDescription: {
    marginTop: 8,
    color: '#777',
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
  ctaButton: {
    marginTop: 24,
    backgroundColor: '#6d4aff',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
  },
  ctaText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
