import Colors from './colors';

export { Colors };

/* ------------------------------------------------------------------
 * Constants
 * ----------------------------------------------------------------*/
export const hitSlop = { top: 14, bottom: 14, left: 14, right: 14 } as const;
export const MAX_DROPDOWN_HEIGHT = 260;
export const normalize = (s: string) => s.trim().toLowerCase();
