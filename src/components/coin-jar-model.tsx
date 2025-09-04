import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Image, Modal, StyleSheet, Text, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import { CoinBoxBG, coinJarImage } from '@/icons';
import { colors } from '@/lib';

import { Button } from './ui';

type Props = {
  visible: boolean;
  coins?: number;
  actionLabel?: string;
  onClose?: () => void;
};

export default function CoinJarPopupModal({
  visible,
  coins = 0,
  actionLabel = 'OK',
  onClose,
}: Props) {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      statusBarTranslucent
    >
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View style={styles.modal}>
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 0.9 }}
            colors={[colors.primary[500], colors.primary[500], '#2A1774']}
            style={styles.cardWrapper}
          >
            <CoinBoxBG />
            <View style={styles.container}>
              <Image source={coinJarImage} />
              <Text style={styles.title}>
                You Did it!{'\n'}
                <Text style={styles.points}>{coins} NYC</Text>
                <Text style={[styles.points, { color: '#fff' }]}> added</Text>
              </Text>
            </View>
            <Button
              label={actionLabel}
              variant="login"
              size="login"
              className="mb-6 w-[200]"
              onPress={onClose}
            />
          </LinearGradient>
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
  cardWrapper: {
    //flex: 1,
    backgroundColor: 'white',
    borderRadius: 20,
    //padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    width: '90%',
    height: '80%',
    overflow: 'hidden',
  },
  container: {
    flex: 1,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    color: '#fff',
  },
  points: {
    fontSize: 14,
    textAlign: 'center',
    color: '#FAA554',
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
