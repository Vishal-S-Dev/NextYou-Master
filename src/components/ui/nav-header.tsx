import { Ionicons } from '@expo/vector-icons';
import React, { memo } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { Font } from '@/lib';

type NavigationHeaderProps = {
  title?: string;
  showBack?: boolean;
  onBackPress?: () => void;
  rightComponent?: React.ReactNode; // optional (calendar, settings, etc.)
};

export const NavigationHeader = memo(
  ({
    title,
    showBack = true,
    onBackPress,
    rightComponent,
  }: NavigationHeaderProps) => {
    return (
      <View style={styles.container}>
        {/* Back button */}
        {showBack ? (
          <TouchableOpacity onPress={onBackPress} style={styles.iconButton}>
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
        ) : (
          <View style={styles.iconPlaceholder} />
        )}

        {/* Title */}
        {title && <Text style={styles.title}>{title}</Text>}

        {/* Right-side action (optional) */}
        {rightComponent && <View style={styles.right}>{rightComponent}</View>}
      </View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  iconButton: {
    padding: 4,
  },
  iconPlaceholder: {
    width: 24,
    height: 24,
  },
  title: {
    fontFamily: Font.IBMPlexSans_600SemiBold,
    fontSize: 18,
    marginLeft: 8,
    flex: 1,
  },
  right: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
