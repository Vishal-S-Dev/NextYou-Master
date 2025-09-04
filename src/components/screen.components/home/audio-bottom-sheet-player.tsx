// components/AudioBottomSheetPlayer.tsx
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import React, { useEffect, useMemo, useRef } from 'react';
import { StyleSheet, View } from 'react-native';

import { useAudioSheetStore } from '@/hooks';

export function AudioBottomSheetPlayer() {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['15%', '40%'], []);

  const { isOpen, snapIndex, closeSheet } = useAudioSheetStore();

  useEffect(() => {
    if (isOpen) {
      bottomSheetRef.current?.snapToIndex(snapIndex);
    } else {
      bottomSheetRef.current?.close();
    }
  }, [isOpen, snapIndex]);

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={snapPoints}
      onClose={closeSheet}
      enablePanDownToClose
    >
      <BottomSheetView>
        <View style={styles.sheetContent}>{/* <MusicCard /> */}</View>
      </BottomSheetView>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  sheetContent: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  slider: {
    width: '100%',
    marginTop: 20,
  },
  time: {
    marginTop: 10,
    marginBottom: 20,
    color: '#555',
  },
});
