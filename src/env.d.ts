/// <reference types="astro/client" />

interface Window {
  showToast?: (
    message: string,
    type?: 'success' | 'error' | 'info' | 'warning',
    duration?: number,
  ) => void;
  showConfirm?: (title: string, message: string) => Promise<boolean>;
}
