import { LinearGradient } from 'expo-linear-gradient';
import React, { memo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Font } from '@/lib';
import { type QuickAccess } from '@/types';

interface Props {
  item: QuickAccess;
  selected: boolean;
  onPress: () => void;
}

const QuickAccessListCard: React.FC<Props> = ({ item, selected, onPress }) => {
  const { icon: Icon, label } = item;
  const CardContent = () => {
    return (
      <>
        <Icon />
        <Text style={styles.label}>{label}</Text>
      </>
    );
  };
  return (
    <View style={{ padding: 8, borderRadius: 12 }}>
      <Pressable onPress={onPress}>
        {selected ? (
          <LinearGradient
            colors={['#5C61FF99', '#F8ACFF99']}
            style={[styles.container, styles.gradient]}
          >
            <CardContent />
          </LinearGradient>
        ) : (
          <View style={styles.container}>
            <CardContent />
          </View>
        )}
      </Pressable>
    </View>
  );
};

const CARD_HEIGHT = 90;

const styles = StyleSheet.create({
  container: {
    height: CARD_HEIGHT,
    width: CARD_HEIGHT,

    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',

    borderRadius: 12,
    padding: 8,
    paddingVertical: 12,

    backgroundColor: '#FFFFFF33',
    shadowOffset: { width: 0, height: 0 },
    shadowColor: '#000000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  // gradient wrapper uses same radius & layout of container
  gradient: {
    paddingHorizontal: 8, //update padding in default style padding set 12
  },
  // item: {
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   backgroundColor: '#FFFFFF33',
  //   marginVertical: 8,
  //   marginRight: 8,
  //   padding: 12,
  //   borderRadius: 8,
  // },
  label: {
    color: '#fff',
    fontFamily: Font.IBMPlexSans_500Medium,
    fontSize: 12,
    marginTop: 4,
  },
  selectedText: { color: '#FFFFFF' },
});

export default memo(
  QuickAccessListCard,
  (a, b) => a.selected === b.selected && a.item === b.item
);
