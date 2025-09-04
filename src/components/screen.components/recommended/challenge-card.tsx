// ChallengeCard.tsx
import { Feather, Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React, { memo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { ImagePath } from '@/api';
import { GradientWrapper } from '@/components/ui';
import { Font } from '@/lib';
import { type Challenge } from '@/types';
// import { type Challenge } from '@/types';

export const CARD_HEIGHT = 80;
const THUMB_SIZE = 48;

interface Props {
  item: Challenge;
  selected: boolean;
  onPress: () => void;
  onSelect: () => void;
}

const ChallengeCard: React.FC<Props> = ({
  item,
  selected,
  onPress,
  onSelect,
}) => {
  //console.log('image: ', ImagePath(item.banner));
  const CardContent = (
    <>
      {/* radio */}
      <View style={styles.radioWrapper}>
        <Ionicons
          name={selected ? 'radio-button-on' : 'radio-button-off'}
          size={24}
          color={selected ? '#FFFFFF' : '#C4C4C4'}
          onPress={onSelect}
        />
      </View>

      {/* thumbnail */}
      <Image
        source={{ uri: ImagePath(item.banner) }}
        placeholder={require('@assets/images/recommended/energy_booster.png')}
        contentFit="cover"
        style={styles.thumbnail}
      />

      {/* texts */}
      <View style={styles.textWrapper}>
        <Text style={[styles.title, selected && styles.selectedText]}>
          {item.title}
        </Text>
        <Text
          numberOfLines={2}
          style={[styles.subtitle, selected && styles.selectedSub]}
        >
          {item.description}
        </Text>
      </View>

      {/* price + arrow */}
      <View style={styles.priceWrapper}>
        <Feather
          name="arrow-up-right"
          size={18}
          color={selected ? '#FFFFFF' : '#6E32FF'}
        />
        <Text style={[styles.price, selected && styles.selectedText]}>
          ₹ {item.price}
        </Text>
      </View>
    </>
  );

  return (
    <Pressable onPress={onPress} android_ripple={{ color: '#ECECEC' }}>
      {selected ? (
        <GradientWrapper style={styles.gradient} children={CardContent} />
      ) : (
        <View style={styles.card} children={CardContent} />
      )}
    </Pressable>
  );
};

export default memo(
  ChallengeCard,
  (a, b) => a.selected === b.selected && a.item === b.item
);

const styles = StyleSheet.create({
  // plain white card
  card: {
    height: CARD_HEIGHT,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  // gradient wrapper uses same radius & layout
  gradient: {
    height: CARD_HEIGHT,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
  },

  radioWrapper: { width: 24, alignItems: 'center' },
  thumbnail: {
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: 8,
    marginLeft: 8,
    marginRight: 10,
    backgroundColor: 'gray',
  },
  textWrapper: { flex: 1 },
  title: {
    fontFamily: Font.IBMPlexSans_600SemiBold,
    fontSize: 14,
    color: '#000',
  },
  subtitle: {
    fontFamily: Font.IBMPlexSans_400Regular,
    fontSize: 11,
    color: '#888',
  },
  priceWrapper: { alignItems: 'flex-end' },
  price: {
    marginLeft: 6,
    fontFamily: Font.IBMPlexSans_500Medium,
    fontSize: 12,
    color: '#6E32FF',
  },

  /* selected overrides */
  selectedText: { color: '#FFFFFF' },
  selectedSub: { color: '#E4DAFF' },
});
