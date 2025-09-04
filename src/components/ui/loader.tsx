import { memo } from 'react';
import { ActivityIndicator, Modal, StyleSheet, View } from 'react-native';

export const Loader = memo(({ visible }: { visible: boolean }) => {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      statusBarTranslucent
    >
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#fff" />
      </View>
    </Modal>
  );
});

const styles = StyleSheet.create({
  loaderContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000055',
  },
  loaderGradient: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
