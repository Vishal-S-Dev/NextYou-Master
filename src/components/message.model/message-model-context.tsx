import React, {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useRef,
  useState,
} from 'react';
import { type ViewStyle } from 'react-native';

import MessageModal from './message-modal';

type ActionType = 'yesno' | 'ok' | null;

interface ModalOptions {
  content: ReactNode;
  actionType?: ActionType;
  modelStyle?: ViewStyle;
  onClose?: () => void;
  onYes?: () => void;
  onNo?: () => void;
  onOk?: () => void;
  yesLabel?: string;
  noLabel?: string;
  okLabel?: string;
  autoCloseDuration?: number;
}

interface ModalContextType {
  showModal: (options: ModalOptions) => void;
  hideModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useMessageModal = (): ModalContextType => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
};

export const ModalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [visible, setVisible] = useState(false);
  const modalOptionsRef = useRef<ModalOptions | null>(null);

  const showModal = useCallback((options: ModalOptions) => {
    modalOptionsRef.current = options;
    setVisible(true);
  }, []);

  const hideModal = useCallback(() => {
    setVisible(false);
    modalOptionsRef?.current?.onClose?.();
    modalOptionsRef.current = null;
  }, []);

  const modalOptions = modalOptionsRef.current;

  return (
    <ModalContext.Provider value={{ showModal, hideModal }}>
      {children}
      <MessageModal
        visible={visible}
        onClose={hideModal}
        actionType={modalOptions?.actionType}
        onYes={modalOptions?.onYes}
        onNo={modalOptions?.onNo}
        onOk={modalOptions?.onOk}
        yesLabel={modalOptions?.yesLabel}
        noLabel={modalOptions?.noLabel}
        okLabel={modalOptions?.okLabel}
        autoCloseDuration={modalOptions?.autoCloseDuration}
        modelStyle={modalOptions?.modelStyle}
      >
        {modalOptions?.content}
      </MessageModal>
    </ModalContext.Provider>
  );
};
