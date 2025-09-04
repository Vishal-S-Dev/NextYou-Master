import { Ionicons, MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { ImageBackground } from 'expo-image';
import {
  useFocusEffect,
  useLocalSearchParams,
  useNavigation,
} from 'expo-router';
import React, { useCallback, useRef, useState } from 'react';
import { Alert, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ImagePath } from '@/api';
import { CoinJarPopupModal, VideoPopupModal } from '@/components';
import { PoopModal } from '@/components/screen.components/task-2';
import { Button } from '@/components/ui';
import { useTaskStore } from '@/store';
// const { width } = Dimensions.get('window');

type Params = {
  taskId: string;
};

const YogaSession = () => {
  const [poopCheckIn, setPoopCheckIn] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);
  const [coinJarVisible, setCoinJarVisible] = useState<boolean>(false);

  const insets = useSafeAreaInsets();
  const statusBarHeight = insets.top;
  const navigation = useNavigation();

  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const { taskId } = useLocalSearchParams() as Params;
  console.log('taskId', taskId);
  const task = useTaskStore((state) => state.getCurrentDayTaskById(taskId));
  console.log('task', task);
  // useEffect(() => {
  //   // Do something with taskId
  // }, [taskId]);

  // callbacks
  useFocusEffect(
    useCallback(() => {
      Alert.alert(
        'Ensure you get a yoga mat / thick towel for all the Yoga sessions'
      );
    }, [])
  );

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{
          uri: task?.bannerImage
            ? ImagePath(task.bannerImage)
            : 'https://as1.ftcdn.net/v2/jpg/15/95/44/06/1000_F_1595440617_aJFuSFRFblmqd0lKfHsLgmpSN5j2lzcS.jpg',
        }}
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      >
        {/* Back Button */}
        <TouchableOpacity
          style={[styles.backButton, { top: statusBarHeight }]}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" size={24} color="#fff" />
        </TouchableOpacity>

        {/* Play Button */}
        <Ionicons name="play-circle" size={50} color="white" />

        {/* Start Session */}
        <View style={{ position: 'absolute', bottom: 40 }}>
          <Button
            label="Start Session"
            variant="login"
            size="login"
            // loading={loading}
            onPress={() => setVisible(true)}
          />
        </View>
      </ImageBackground>

      <VideoPopupModal
        visible={visible}
        videoSource={
          'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
        }
        poopCheckIn={() => {
          setCoinJarVisible(true);
        }}
        onClose={() => {
          setVisible(false);
          if (poopCheckIn) {
            bottomSheetModalRef.current?.present();
          }
        }}
      />

      <CoinJarPopupModal
        visible={coinJarVisible}
        onClose={() => {
          setCoinJarVisible(false);
          if (!poopCheckIn) {
            setPoopCheckIn(true);
          }
        }}
      />
      <BottomSheetModal
        ref={bottomSheetModalRef}
        snapPoints={['80%']}
        enableDynamicSizing={false}
        enablePanDownToClose={false}
      >
        <PoopModal taskComplete={() => navigation.goBack()} />
      </BottomSheetModal>
    </View>
  );
};

export default YogaSession;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
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
  contentContainer: {
    flex: 1,
    //alignItems: 'center',
    backgroundColor: 'red',
  },
});
