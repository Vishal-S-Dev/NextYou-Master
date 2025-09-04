import { Linking } from 'react-native';
import type { StoreApi, UseBoundStore } from 'zustand';

export function openLinkInBrowser(url: string) {
  Linking.canOpenURL(url).then((canOpen) => canOpen && Linking.openURL(url));
}

type WithSelectors<S> = S extends { getState: () => infer T }
  ? S & { use: { [K in keyof T]: () => T[K] } }
  : never;

export const createSelectors = <S extends UseBoundStore<StoreApi<object>>>(
  _store: S
) => {
  let store = _store as WithSelectors<typeof _store>;
  store.use = {};
  for (let k of Object.keys(store.getState())) {
    (store.use as any)[k] = () => store((s) => s[k as keyof typeof s]);
  }

  return store;
};

export const isEmptyObject = (obj: {} | null) => {
  // Check if the object is null or undefined first to avoid errors
  if (obj === null || typeof obj === 'undefined') {
    return true;
  }
  // Check if the object has any enumerable properties
  return Object.keys(obj).length === 0;
};

export const isToday = (date: Date) => {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

export const getDateStatus = (dateString: string) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0); // Remove time portion

  const inputDate = new Date(dateString);
  inputDate.setHours(0, 0, 0, 0); // Remove time portion

  if (inputDate.getTime() === today.getTime()) {
    return 'today';
  } else if (inputDate.getTime() > today.getTime()) {
    return 'upcoming';
  } else {
    return 'past';
  }
};

// utils/timeAgo.ts
export function timeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();

  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (seconds < 60) return `${seconds} second${seconds !== 1 ? 's' : ''} ago`;
  if (minutes < 60) return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`;
  if (hours < 24) return `${hours} hour${hours !== 1 ? 's' : ''} ago`;
  if (days < 7) return `${days} day${days !== 1 ? 's' : ''} ago`;
  if (weeks < 5) return `${weeks} week${weeks !== 1 ? 's' : ''} ago`;
  if (months < 12) return `${months} month${months !== 1 ? 's' : ''} ago`;
  return `${years} year${years !== 1 ? 's' : ''} ago`;
}

export function formatTime(ms: number) {
  const totalSeconds = Math.max(Math.floor(ms / 1000), 0);
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(
    2,
    '0'
  );
  const seconds = String(totalSeconds % 60).padStart(2, '0');
  return `${hours}:${minutes}:${seconds}`;
}

export function buildTodayTime(timeString?: string) {
  if (!timeString) return null;

  const parsed = new Date(timeString);
  if (isNaN(parsed.getTime())) return null;

  const today = new Date();
  const withToday = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
    parsed.getHours(),
    parsed.getMinutes(),
    parsed.getSeconds(),
    parsed.getMilliseconds()
  );

  return withToday;
}
