import { Image } from 'expo-image';
import React, { memo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { ImagePath } from '@/api';
import { Font } from '@/lib';
import { type Challenge } from '@/types';

interface Props {
  item: Challenge;
  //selected: boolean;
  onPress: () => void;
}

const OtherChallengesListCard: React.FC<Props> = ({ item, onPress }) => {
  const CardContent = () => {
    return (
      <>
        {/* thumbnail */}
        <Image
          contentFit="cover"
          source={{ uri: ImagePath(item.banner) }}
          placeholder={require('@assets/images/recommended/energy_booster.png')}
          style={styles.thumbnail}
        />

        {/* texts */}
        <View style={styles.textWrapper}>
          <Text style={[styles.title]} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={[styles.price]}>₹{item.price}</Text>
        </View>
      </>
    );
  };
  return (
    <View style={{ padding: 8, borderRadius: 12 }}>
      <Pressable onPress={onPress}>
        <View style={styles.container}>
          <CardContent />
        </View>
      </Pressable>
    </View>
  );
};

//const CARD_WIDTH = 110;
const THUMB_SIZE = 120;

const styles = StyleSheet.create({
  container: {
    width: THUMB_SIZE,
    paddingVertical: 12,
  },

  thumbnail: {
    width: THUMB_SIZE,
    height: THUMB_SIZE * 1.2,
    borderRadius: 8,
    marginBottom: 8,
    marginRight: 12,
    //backgroundColor: 'gray',
    resizeMode: 'contain',
  },
  textWrapper: {
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: Font.IBMPlexSans_500Medium,
    fontSize: 11,
    color: '#FFFFFF',
  },
  price: {
    fontFamily: Font.IBMPlexSans_500Medium,
    fontSize: 10,
    color: '#EB8468',
  },
});

export default memo(OtherChallengesListCard);
