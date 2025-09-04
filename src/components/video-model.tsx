import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Modal, Pressable, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import VideoPlayer from './video-player';

type Props = {
  visible: boolean;
  videoSource: string;
  poopCheckIn?: () => void;
  onClose?: () => void;
  onEnd?: () => void;
};

export default function VideoPopupModal({
  visible,
  videoSource,
  poopCheckIn,
  onClose,
  onEnd,
}: Props) {
  const insets = useSafeAreaInsets();
  const statusBarHeight = insets.top;
  return (
    <Modal
      transparent
      visible={visible}
      animationType="slide"
      statusBarTranslucent
    >
      {/* Back Button */}
      <Pressable
        style={[styles.backButton, { top: statusBarHeight }]}
        onPress={onClose}
      >
        <Ionicons name="close" size={24} color="white" />
      </Pressable>
      <VideoPlayer
        videoSource={videoSource}
        poopCheckIn={poopCheckIn}
        onEnd={onEnd}
      />
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  modal: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00000055',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    padding: 8,
    borderRadius: 24,
    backgroundColor: 'rgba(0,0,0,0.4)',
    zIndex: 10,
  },
});
