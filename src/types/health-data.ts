// types.ts
export type HealthPermission = {
  id: string;
  label: string;
  granted: boolean | null; // null = unknown/not requested yet
};

export type PermissionStatus = 'unknown' | 'granted' | 'denied' | 'restricted';
