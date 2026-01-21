<<<<<<< HEAD
import { type ClassValue, clsx } from "clsx";
=======
import { type ClassValue, clsx } from 'clsx';
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatDuration(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
<<<<<<< HEAD
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
=======
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
}

export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toString();
}
