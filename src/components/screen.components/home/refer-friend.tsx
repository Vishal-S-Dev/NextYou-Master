import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { referFriendBG } from '@/icons';

export function ReferFriend() {
  const onPress = () => {
    Alert.alert('Refer a Friend clicked!');
  };
  return (
    <LinearGradient
      colors={['#13093D', '#753AFF']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.container}
    >
      <View style={styles.card}>
        <Image source={referFriendBG} style={styles.image} />
        <View style={styles.textSection}>
          <Text style={styles.title}>Want To Earn Extra Reward Points ?</Text>
          <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>Refer a Friend</Text>
            <Ionicons name="arrow-forward-outline" color="#fff" size={16} />
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  card: {
    justifyContent: 'center',
    borderRadius: 20,
    overflow: 'hidden',
    height: 140,
  },
  image: {
    position: 'absolute',
    width: '100%',
  },
  textSection: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 24,
    marginBottom: 10,
    width: 200,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
    marginRight: 4,
  },
});
