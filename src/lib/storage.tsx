import { MMKV } from 'react-native-mmkv';

export const storage = new MMKV();

export function getItem<T>(key: string): T {
  const value = storage.getString(key);
  if (!value) throw new Error(`Key "${key}" not found`);
  return JSON.parse(value) as T;
}

export async function setItem<T>(key: string, value: T) {
  storage.set(key, JSON.stringify(value));
}

export async function removeItem(key: string) {
  storage.delete(key);
}

export const zustandMMKVStorage = {
  getItem: (key: string): string | null => {
    try {
      return getItem<string>(key);
    } catch {
      return null;
    }
  },
  setItem: (key: string, value: string): void => {
    setItem(key, value);
  },
  removeItem: (key: string): void => {
    removeItem(key);
  },
};
