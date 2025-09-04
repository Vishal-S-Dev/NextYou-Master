import { Ionicons } from '@expo/vector-icons';
import React, { memo } from 'react';
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { Font } from '@/lib';
import { type PastSession } from '@/types';

interface Props {
  item: PastSession;
  onPress: () => void;
}

const PastSessionsListCard: React.FC<Props> = ({ item, onPress }) => {
  const CardContent = (
    <>
      <ImageBackground
        source={item.image}
        style={styles.image}
        imageStyle={styles.imageStyle}
      >
        <View style={styles.favoriteIcon}>
          <Ionicons
            name="star"
            size={20}
            color={item.isFavorite ? '#EB8468' : '#ccc'}
          />
        </View>
        <TouchableOpacity style={styles.playButton}>
          <Ionicons name="play" size={14} color="#fff" />
        </TouchableOpacity>
      </ImageBackground>

      <View style={styles.textWrapper}>
        <Text style={styles.title}>{item.title}</Text>

        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Ionicons name="time-outline" size={12} color="#6C63FF" />
            <Text style={styles.infoText}>{item.duration} Minutes</Text>
          </View>

          <View style={styles.infoItem}>
            <Ionicons name="flame-outline" size={12} color="#6C63FF" />
            <Text style={styles.infoText}>{item.calories} Kcal</Text>
          </View>
        </View>
      </View>
    </>
  );

  return (
    <View style={{ padding: 8, paddingVertical: 16 }}>
      <Pressable onPress={onPress} android_ripple={{ color: '#ECECEC' }}>
        <View style={styles.container} children={CardContent} />
      </Pressable>
    </View>
  );
};

const CARD_WIDTH = 150;

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    flexDirection: 'column',
    borderRadius: 12,
    //padding: 12,
    backgroundColor: '#fff',
  },

  image: {
    width: '100%',
    height: CARD_WIDTH * 0.8,
    resizeMode: 'cover',
    borderRadius: 12,
    backgroundColor: 'gray',
  },

  imageStyle: {
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },

  title: {
    fontFamily: Font.IBMPlexSans_500Medium,
    fontSize: 14,
    color: '#000',
  },

  favoriteIcon: {
    alignSelf: 'flex-end',
    //backgroundColor: '#fff',
    borderRadius: 12,
    padding: 4,
  },
  textWrapper: {
    paddingHorizontal: 8,
    paddingBottom: 8,
    position: 'relative',
    gap: 4,
  },

  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  infoText: {
    fontSize: 11,
    color: '#555',
  },
  playButton: {
    position: 'absolute',
    bottom: -12,
    right: 8,
    backgroundColor: '#6C63FF',
    borderRadius: 20,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default memo(PastSessionsListCard);
