import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

type Props = {
  value: boolean | null;
  onChange: (val: boolean) => void;
};

export default function ToggleButtonGroup({ value, onChange }: Props) {
  return (
    <View style={styles.container}>
      <Pressable
        style={[styles.button, value === true && styles.selected]}
        onPress={() => onChange(true)}
      >
        <Text style={[styles.text, value === true && styles.selectedText]}>
          Yes
        </Text>
      </Pressable>
      <Pressable
        style={[styles.button, value === false && styles.selected]}
        onPress={() => onChange(false)}
      >
        <Text style={[styles.text, value === false && styles.selectedText]}>
          No
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderRadius: 8,
    padding: 4,
    gap: 8,
    backgroundColor: '#F1F5F9',
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  text: {
    fontWeight: '600',
    color: '#444',
  },
  selected: {
    backgroundColor: '#fff',
  },
  selectedText: {
    color: '#6d4aff',
  },
});
