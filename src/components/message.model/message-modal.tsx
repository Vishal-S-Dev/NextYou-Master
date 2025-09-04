import React, { useEffect } from 'react';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { type ViewStyle } from 'react-native';

interface MessageModalProps {
  visible: boolean;
  onClose: () => void;
  actionType?: 'yesno' | 'ok' | null;
  onYes?: () => void;
  onNo?: () => void;
  onOk?: () => void;
  yesLabel?: string;
  noLabel?: string;
  okLabel?: string;
  autoCloseDuration?: number;
  children: React.ReactNode;
  modelStyle?: ViewStyle;
}

const MessageModal: React.FC<MessageModalProps> = ({
  visible,
  onClose,
  actionType = null,
  modelStyle,
  onYes,
  onNo,
  onOk,
  yesLabel,
  noLabel,
  okLabel,
  autoCloseDuration = 3000,
  children,
}) => {
  useEffect(() => {
    if (!actionType && visible) {
      const timer = setTimeout(onClose, autoCloseDuration);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, actionType]);

  const renderActions = () => {
    if (actionType === 'yesno') {
      return (
        <View style={styles.actions}>
          <TouchableOpacity style={styles.button} onPress={onNo || onClose}>
            <Text style={styles.buttonText}>{noLabel || 'No'}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={onYes || onClose}>
            <Text style={styles.buttonText}>{yesLabel || 'Yes'}</Text>
          </TouchableOpacity>
        </View>
      );
    }
    if (actionType === 'ok') {
      return (
        <View style={styles.actions}>
          <TouchableOpacity style={styles.button} onPress={onOk || onClose}>
            <Text style={styles.buttonText}>{okLabel || 'OK'}</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return null;
  };

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      presentationStyle="overFullScreen"
      statusBarTranslucent
    >
      <View style={styles.absoluteOverlay}>
        <View style={[styles.modal, modelStyle]}>
          {children}
          {renderActions()}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  absoluteOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    alignItems: 'center',
  },
  actions: {
    marginTop: 20,
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#007bff',
    borderRadius: 6,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default React.memo(MessageModal);
