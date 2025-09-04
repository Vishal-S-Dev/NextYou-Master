// Header.tsx
import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Animated, {
  interpolate,
  type SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Font } from '@/lib';

interface Props {
  title?: string;
  scrollY?: SharedValue<number>;
}

export const Header: React.FC<Props> = ({ title, scrollY }) => {
  const insets = useSafeAreaInsets();
  const statusBarHeight = insets.top;

  const navigation = useNavigation();
  // Fade + slide up when the user scrolls past 60 px
  const rStyle = useAnimatedStyle(() => {
    const value = scrollY ? scrollY.value : 0;
    const opacity = interpolate(value, [0, 60], [0, 1], 'clamp');
    const translateY = interpolate(value, [0, 60], [-40, 0], 'clamp');
    return { opacity, transform: [{ translateY }] };
  });

  return (
    <Animated.View
      style={[
        styles.container,
        ...(scrollY ? [rStyle] : []),
        { ...(!scrollY && { backgroundColor: 'transparent' }) },
      ]}
    >
      <View style={[{ marginTop: statusBarHeight }, styles.header]}>
        <Pressable
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="arrow-left" size={24} color="#fff" />
        </Pressable>
        {title && <Text style={styles.title}>{title}</Text>}
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    //height: 76, // same height always—no layout jump
    backgroundColor: '#fff',
    zIndex: 10,
    elevation: 4,
  },
  header: {
    paddingHorizontal: 16,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  backButton: {
    position: 'absolute',
    //top: 20,
    left: 20,
    padding: 8,
    borderRadius: 24,
    backgroundColor: 'rgba(0,0,0,0.4)',
    zIndex: 10,
    shadowColor: 'rgba(0,0,0,0.4)',
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 3,
  },
  title: {
    fontFamily: Font.IBMPlexSans_600SemiBold,
    fontSize: 18,
    textAlign: 'center',
    width: '80%',
  },
});
