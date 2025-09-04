import { MaterialCommunityIcons as Icon } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { Button } from '@/components/ui';

import MoodSelectorCard, { moods } from './mood-select';

type Props = {
  visible: boolean;
  selectedIndex?: number;
  onClose?: () => void;
  onDone: (value: number, mood: string) => void;
};

export default function MoodPopupModal({
  visible,
  selectedIndex = 0,
  onClose,
  onDone,
}: Props) {
  const [selectedValue, setSelectedValue] = useState<number>(selectedIndex);
  const [selectedMood, setSelectedMood] = useState<string>(
    moods[selectedIndex].label
  );

  const onChange = (value: number, mood: string) => {
    setSelectedValue(value);
    setSelectedMood(mood);
  };

  return (
    <Modal
      transparent
      visible={visible}
      animationType="slide"
      statusBarTranslucent
    >
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View style={styles.modal}>
          <View style={styles.cardWrapper}>
            {/* Back Button */}
            <TouchableOpacity style={[styles.backButton]} onPress={onClose}>
              <Icon name="close" size={20} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.title}>How are you feeling today?</Text>
            <MoodSelectorCard
              selectedMood={selectedValue}
              sliderHeight={400}
              onChange={onChange}
            />
            <Button
              label="Done"
              variant="login"
              size="login"
              onPress={() => {
                onDone(selectedValue, selectedMood);
              }}
              className="w-[200]"
            />
          </View>
        </View>
      </GestureHandlerRootView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00000055',
  },
  backButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    padding: 4,
    borderRadius: 24,
    backgroundColor: 'rgba(0,0,0,0.4)',
    zIndex: 10,
  },
  cardWrapper: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    width: '90%',
    gap: 16,
  },
  title: {
    fontFamily: 'IBMPlexSans_700Bold',
    fontSize: 20,
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 24,
  },
  dismissArea: {
    marginTop: 16,
  },

  label: {
    fontSize: 18,
    marginBottom: 20,
  },

  doneButton: {
    marginTop: 24,
    backgroundColor: '#7028E4',
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 12,
    width: 200,
    alignItems: 'center',
  },
  doneText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
