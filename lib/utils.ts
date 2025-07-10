import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const downloadBlob = (blob: Blob) => {
  const downloadLink = document.createElement('a');
  downloadLink.href = URL.createObjectURL(blob);
  downloadLink.download = `Audio_${new Date().getMilliseconds()}.mp3`;
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
};

export const blobToAudio = (blob?: Blob) => {
  if (!blob) return;
  const url = URL.createObjectURL(blob);
  return url;
};

export const padWithLeadingZeros = (num: number, length: number): string => {
  return String(num).padStart(length, '0');
};
