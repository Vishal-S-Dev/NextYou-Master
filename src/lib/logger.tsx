// utils/logger.ts
import { Platform } from 'react-native';

type LogLevel = 'log' | 'warn' | 'error' | 'info';

const log = (level: LogLevel, ...args: any[]) => {
  const prefix = `[${Platform.OS.toUpperCase()}]`;
  switch (level) {
    case 'warn':
      console.warn(prefix, ...args);
      break;
    case 'error':
      console.error(prefix, ...args);
      break;
    case 'info':
      console.info(prefix, ...args);
      break;
    default:
      console.log(prefix, ...args);
  }
};

// Export helpers
export const Logger = {
  log: (...args: any[]) => log('log', ...args),
  warn: (...args: any[]) => log('warn', ...args),
  error: (...args: any[]) => log('error', ...args),
  info: (...args: any[]) => log('info', ...args),
};
