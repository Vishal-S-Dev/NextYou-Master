// stores/useAudioSheetStore.ts
import { create } from 'zustand';

type AudioSheetState = {
  isOpen: boolean;
  snapIndex: number;
  openSheet: (index?: number) => void;
  closeSheet: () => void;
};

export const useAudioSheetStore = create<AudioSheetState>((set) => ({
  isOpen: false,
  snapIndex: 0,
  openSheet: (index = 1) => set({ isOpen: true, snapIndex: index }),
  closeSheet: () => set({ isOpen: false }),
}));
