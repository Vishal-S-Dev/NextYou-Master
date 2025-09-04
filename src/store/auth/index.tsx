import { create } from 'zustand';

import { createSelectors } from '@/lib';

import { getToken, removeToken, setToken, type TokenType } from './utils';

interface AuthState {
  token: TokenType | null;
  status: 'idle' | 'signOut' | 'signIn';
  signIn: (data: TokenType, isTemp: boolean) => void;
  updateToken: (data: TokenType) => void;
  signOut: () => void;
  hydrate: () => void;
}

const _useAuth = create<AuthState>((set, get) => ({
  status: 'idle',
  token: null,
  signIn: (token, isTemp) => {
    set({ status: 'signIn', token });
    if (!isTemp) {
      setToken(token);
    }
  },
  updateToken: (token) => {
    set({ token });
    setToken(token);
  },

  signOut: () => {
    removeToken();
    set({ status: 'signOut', token: null });
  },
  hydrate: () => {
    try {
      const userToken = getToken();
      if (userToken !== null) {
        get().signIn(userToken, false);
      } else {
        get().signOut();
      }
    } catch (e) {
      // catch error here
      // Maybe sign_out user!
      get().signOut();
    }
  },
}));

export const useAuth = createSelectors(_useAuth);

export const signOut = () => _useAuth.getState().signOut();
export const signIn = (token: TokenType, isTemp: boolean) =>
  _useAuth.getState().signIn(token, isTemp);
export const updateToken = (token: TokenType) =>
  _useAuth.getState().updateToken(token);
export const hydrateAuth = () => _useAuth.getState().hydrate();

export * from './utils';
