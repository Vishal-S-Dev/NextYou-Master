// stores/useAgreementStore.ts
import { router } from 'expo-router';
import { create } from 'zustand';

type AgreementStore = {
  onAgree?: () => void;
  onDisagree?: () => void;
  setCallbacks: (params: {
    onAgree?: () => void;
    onDisagree?: () => void;
  }) => void;
  clearCallbacks: () => void;
};

export const useAgreementStore = create<AgreementStore>((set) => ({
  onAgree: undefined,
  onDisagree: undefined,
  setCallbacks: ({ onAgree, onDisagree }) => set({ onAgree, onDisagree }),
  clearCallbacks: () => set({ onAgree: undefined, onDisagree: undefined }),
}));

export const showAgreement = (onAgree: () => void) => {
  useAgreementStore.getState().setCallbacks({
    onAgree: () => {
      //console.log('User agreed ✅');
      onAgree();
    },
    onDisagree: () => {
      //console.log('User disagreed ❌');
    },
  });

  router.push('/app-agreement');
};
