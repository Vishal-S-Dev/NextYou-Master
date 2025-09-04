// /components/Header.js
import { FontAwesome } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { Link } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { type User } from '@/types/user';

type Props = {
  user?: User | null;
};

export function HomeNavHeader({ user }: Props) {
  const insets = useSafeAreaInsets();
  const statusBarHeight = insets.top;
  return (
    <View style={[styles.container, { marginTop: statusBarHeight }]}>
      <View style={styles.row}>
        <Image
          source={{ uri: 'https://i.pravatar.cc/40' }}
          style={styles.avatar}
        />
        <View>
          <Text style={styles.greeting}>Hi, {user?.name ?? 'User'} 👋</Text>
          <Text style={styles.subtitle}>
            It's time to evaluate your limits!
          </Text>
        </View>
        <Link href="/notification" style={styles.icon}>
          <FontAwesome name="bell" size={24} color="#fff" />
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    //backgroundColor: '#2e135a',
    padding: 16,
    //paddingTop: 48,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  greeting: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  subtitle: {
    color: '#ccc',
    fontSize: 12,
  },
  icon: {
    marginLeft: 'auto',
  },
});
