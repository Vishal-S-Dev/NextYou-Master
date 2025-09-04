import React, { memo, useMemo } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

import { Font } from '@/lib';

type ProfileStackProps = {
  peoples: string[];
  visibleCount?: number;
  size?: number;
  overlap?: number;
};

const ProfileStack = ({
  peoples = [],
  visibleCount = 3,
  size = 30,
  overlap = 8,
}: ProfileStackProps) => {
  const hasExtra = peoples.length > visibleCount;

  const displayItems = useMemo(
    () => peoples.slice(0, visibleCount),
    [peoples, visibleCount]
  );

  const avatarStyle = useMemo(
    () => ({
      width: size,
      height: size,
      borderRadius: size / 2,
      borderWidth: 2,
      borderColor: '#fff',
    }),
    [size]
  );

  return (
    <View style={[styles.container, { height: size }]}>
      {displayItems.map((uri, index) => (
        <Image
          key={index}
          source={{ uri }}
          style={[
            avatarStyle,
            {
              marginLeft: index === 0 ? 0 : -overlap,
              // zIndex: displayItems.length - index,
              zIndex: index + 1,
            },
          ]}
        />
      ))}

      {hasExtra && (
        <View
          style={[
            avatarStyle,
            styles.countAvatar,
            { marginLeft: -overlap / 2, zIndex: 0 },
          ]}
        >
          <Text style={styles.countText}>+{peoples.length - visibleCount}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  countAvatar: {
    backgroundColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center',
  },
  countText: {
    color: '#fff',
    fontFamily: Font.Inter_600SemiBold,
    fontSize: 12,
  },
});

export default memo(ProfileStack);
