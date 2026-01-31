export {};

declare module 'react' {
  interface CSSProperties {
    WebkitAppRegion?: 'drag' | 'no-drag';
  }
}

declare global {
  interface Window {
    electronAPI?: {
      widget?: {
        open: () => Promise<void>;
        close: () => Promise<void>;
        isOpen: () => Promise<boolean>;
      };
      writeLog?: (logData: unknown) => Promise<void>;
      getSystemTheme?: () => Promise<'light' | 'dark'>;
      notification: {
        requestPermission: () => Promise<NotificationPermission>;
        show: (
          title: string,
          options?: NotificationOptions | string,
        ) => Promise<void>;
      };
    };
  }
}
