import { Feather } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React, { memo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { ImagePath } from '@/api';
import { GradientWrapper, ProgressBar } from '@/components/ui';
import { Font } from '@/lib';
import { type ChallengeDetails } from '@/types/user';

interface Props {
  item: ChallengeDetails;
  selected: boolean;
  onPress: () => void;
}

const SubscriptionPlansListCard: React.FC<Props> = ({
  item,
  selected,
  onPress,
}) => {
  const CardContent = (
    <>
      {/* Plan */}
      <View style={styles.plan}>
        {/* Image */}
        <Image
          source={{ uri: ImagePath(item.challenge.banner) }}
          placeholder={require('@assets/images/recommended/energy_booster.png')}
          style={styles.image}
        />
        {/* plan title + subtitle */}
        <View style={styles.textWrapper}>
          <Text style={[styles.title, selected && styles.selectedTitle]}>
            {item.challenge.title}
          </Text>
          <Text
            style={[styles.subtitle, selected && styles.selectedSub]}
            numberOfLines={3}
          >
            {item.challenge.description}
          </Text>
        </View>
        {/* price + arrow */}
        <View style={styles.arrowWrapper}>
          <Feather
            name="arrow-up-right"
            size={18}
            color={selected ? '#FFFFFF' : '#6E32FF'}
          />
        </View>
      </View>
      {/* Slider Progress */}
      <View>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'space-between',
            marginBottom: 8,
          }}
        >
          <Text
            style={[
              styles.totalAttendanceText,
              selected && styles.selectedTitle,
            ]}
          >
            Total Attendance
          </Text>
          <Text
            style={[
              styles.totalAttendanceValue,
              selected && styles.selectedTitle,
            ]}
          >
            {0}/{7}
          </Text>
        </View>
        <ProgressBar initialProgress={0} />
      </View>
    </>
  );

  return (
    <View style={{ padding: 8 }}>
      <Pressable onPress={onPress} android_ripple={{ color: '#ECECEC' }}>
        {selected ? (
          <GradientWrapper
            style={[styles.container, styles.gradient]}
            children={CardContent}
          />
        ) : (
          <View style={styles.container} children={CardContent} />
        )}
      </Pressable>
    </View>
  );
};

// const CARD_HEIGHT = 160;
const CARD_WIDTH = 280;

const THUMB_SIZE = 50;

const styles = StyleSheet.create({
  container: {
    //height: CARD_HEIGHT,
    width: CARD_WIDTH,
    flexDirection: 'column',
    alignItems: 'center',
    gap: 8,

    borderRadius: 12,
    padding: 12,

    backgroundColor: '#FFFFFF',
    shadowOffset: { width: 0, height: 0 },
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  // gradient wrapper uses same radius & layout
  gradient: {
    paddingHorizontal: 12, //update padding in default style padding set 12
  },
  plan: {
    flexDirection: 'row',
  },
  image: {
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: 12,
    marginRight: 12,
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
  /* selected overrides */
  selectedTitle: { color: '#FFFFFF' },
  selectedSub: { color: '#E4DAFF' },
  arrowWrapper: { alignItems: 'flex-end' },
  totalAttendanceText: {
    fontFamily: Font.IBMPlexSans_700Bold,
    fontSize: 11,
    color: '#000',
  },
  totalAttendanceValue: {
    fontFamily: Font.IBMPlexSans_500Medium,
    fontSize: 11,
    color: '#000',
  },
});

// export default SubscriptionPlansListCard;

export default memo(
  SubscriptionPlansListCard,
  (a, b) => a.selected === b.selected && a.item === b.item
);
