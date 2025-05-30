/**
 * Screen Wake Lock API utility for keeping the screen on
 * 
 * This module provides a simple interface to the Screen Wake Lock API
 * which prevents the screen from turning off due to inactivity.
 */

// Define the type for the WakeLock object returned by the API
export interface WakeLockSentinel {
  released: boolean;
  release(): Promise<void>;
  addEventListener(type: string, listener: EventListener): void;
  removeEventListener(type: string, listener: EventListener): void;
}

// Type guard to check if an object is a WakeLockSentinel
export function isWakeLockSentinel(obj: any): obj is WakeLockSentinel {
  return obj && typeof obj.release === 'function' && 'released' in obj;
}

/**
 * Request a wake lock to keep the screen on
 * @returns The wake lock sentinel or null if not supported/permitted
 */
export const requestWakeLock = async (): Promise<WakeLockSentinel | null> => {
  if (!('wakeLock' in navigator) || !navigator.wakeLock) {
    console.warn('Wake Lock API is not supported in this browser');
    return null;
  }

  try {
    // @ts-ignore - Ignore TypeScript errors with the wakeLock API
    const wakeLock = await navigator.wakeLock.request('screen');
    console.log('Wake Lock is active');
    return wakeLock as WakeLockSentinel;
  } catch (err) {
    console.error(`Failed to request Wake Lock: ${err}`);
    return null;
  }
};

/**
 * Release an active wake lock
 * @param wakeLock The wake lock to release
 * @returns Promise that resolves when the wake lock is released
 */
export const releaseWakeLock = async (
  wakeLock: WakeLockSentinel | null
): Promise<boolean> => {
  if (!wakeLock) return false;
  
  try {
    await wakeLock.release();
    console.log('Wake Lock released');
    return true;
  } catch (err) {
    console.error(`Failed to release Wake Lock: ${err}`);
    return false;
  }
};
