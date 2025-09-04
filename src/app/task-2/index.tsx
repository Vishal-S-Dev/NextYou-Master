import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useLocalSearchParams, useNavigation } from 'expo-router';
import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import ProfileStack from '@/components/profile-stack';
import { FocusAwareStatusBar } from '@/components/ui';
import { forest } from '@/icons';
import { colors } from '@/lib';

const images: string[] = [
  'https://avatar.iran.liara.run/public/31',
  'https://avatar.iran.liara.run/public/18',
  'https://avatar.iran.liara.run/public/37',
  'https://avatar.iran.liara.run/public/21',
];

type Params = {
  taskId: string;
};

const Task2 = () => {
  const insets = useSafeAreaInsets();
  const statusBarHeight = insets.top;
  const navigation = useNavigation();

  const { taskId } = useLocalSearchParams() as Params;
  // const task = useTaskStore((state) => state.getCurrentDayTaskById(taskId));

  return (
    <View style={styles.container}>
      <FocusAwareStatusBar hidden={true} />
      {/* Back Button */}
      <TouchableOpacity
        style={[styles.backButton, { top: statusBarHeight }]}
        onPress={() => navigation.goBack()}
      >
        <Icon name="arrow-left" size={24} color="#fff" />
      </TouchableOpacity>
      <ScrollView
        style={{ flex: 1, backgroundColor: colors.bg }}
        contentContainerStyle={{
          paddingBottom: 40,
        }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: colors.bg,
            // backgroundColor: '#fff',
            //alignItems: 'center',
          }}
        >
          <LinearGradient
            colors={['#4F2BDA', '#4F2BDA']}
            style={{
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              paddingTop: 50,
            }}
          >
            <View style={{ width: '100%', height: 140 }} />
            <View
              style={{
                width: '100%',
                height: 100,
                backgroundColor: colors.bg,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
              }}
            />
            <View style={styles.imageContainer}>
              <Image source={forest} style={styles.image} />
            </View>
          </LinearGradient>

          <View style={styles.textContainer}>
            <Text style={styles.taskText}>Task 1</Text>
            <View style={styles.taskBox}>
              <Text style={styles.leftText}>Easy</Text>
              <Text style={styles.rightText}>30 min</Text>
            </View>
            <Text style={styles.title}>Live session name/title</Text>
            <Text style={styles.subtitle}>
              Regular exercise is one of the best things. This is dummy text
              will be replaced
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.subtitle}>Starting in</Text>
            <Text style={styles.title}>00:10:01</Text>
            <ProfileStack peoples={images} />
            <Text style={styles.subtitle}>10 People Plan to Workout</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                router.push({
                  pathname: '/task-2/yoga-session',
                  params: {
                    taskId: taskId,
                  },
                });
              }}
            >
              <Text style={styles.buttonText}>Join</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  imageContainer: {
    position: 'absolute',
    backgroundColor: '#F1EFFF',
    borderRadius: 100,
    padding: 1,
    overflow: 'hidden',
    bottom: 10,
  },
  image: {
    width: 180,
    height: 180,
    borderRadius: 90,
  },
  textContainer: {
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
  },
  subtitle: {
    fontSize: 14,
    color: '#999',
    marginTop: 4,
    justifyContent: 'center',
    textAlign: 'center',
    marginBottom: 20,
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
  taskText: {
    marginTop: 4,
    color: 'black',
    fontWeight: '700',
    fontSize: 10,
    borderRadius: 4,
    backgroundColor: '#EB8468',
    paddingVertical: 4,
    paddingHorizontal: 16,
    marginBottom: 10,
  },
  taskBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  leftText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '400',
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    marginEnd: 1,
  },
  rightText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '400',
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
    marginStart: 1,
  },
  card: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 16,
    margin: 16,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    textAlign: 'center',
    marginTop: 6,
    alignItems: 'center',
    backgroundColor: '#6B4AEA',
    color: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 50,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
export default Task2;
