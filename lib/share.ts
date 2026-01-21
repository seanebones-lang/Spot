/**
<<<<<<< HEAD
 * Share utility functions for Spot Music
=======
 * Share utility functions for EmPulse Music
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
 * Supports Web Share API and fallback to clipboard
 */

export interface ShareOptions {
  title: string;
  text?: string;
  url: string;
<<<<<<< HEAD
  type: "track" | "playlist" | "album" | "artist";
=======
  type: 'track' | 'playlist' | 'album' | 'artist';
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
}

/**
 * Share content using Web Share API or fallback to clipboard
 */
export async function shareContent(options: ShareOptions): Promise<boolean> {
  const { title, text, url, type } = options;
<<<<<<< HEAD

  const shareData: ShareData = {
    title,
    text: text || `Check out this ${type} on Spot Music`,
=======
  
  const shareData: ShareData = {
    title,
    text: text || `Check out this ${type} on EmPulse Music`,
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    url,
  };

  // Try Web Share API first (mobile/desktop with support)
  if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
    try {
      await navigator.share(shareData);
      return true;
    } catch (err) {
      // User cancelled or error occurred
<<<<<<< HEAD
      if ((err as Error).name !== "AbortError") {
        console.error("Error sharing:", err);
=======
      if ((err as Error).name !== 'AbortError') {
        console.error('Error sharing:', err);
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      }
      return false;
    }
  }

  // Fallback: Copy to clipboard
  try {
    await navigator.clipboard.writeText(url);
    // You could show a toast notification here
    return true;
  } catch (err) {
<<<<<<< HEAD
    console.error("Error copying to clipboard:", err);
=======
    console.error('Error copying to clipboard:', err);
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    return false;
  }
}

/**
 * Generate share URL for content
 */
<<<<<<< HEAD
export function generateShareUrl(
  type: "track" | "playlist" | "album" | "artist",
  id: string,
): string {
  const baseUrl =
    typeof window !== "undefined"
      ? window.location.origin
      : "https://spot.music";
=======
export function generateShareUrl(type: 'track' | 'playlist' | 'album' | 'artist', id: string): string {
  const baseUrl = typeof window !== 'undefined' 
    ? window.location.origin 
    : 'https://empulse.music';
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  return `${baseUrl}/${type}/${id}`;
}

/**
 * Copy link to clipboard
 */
export async function copyLink(url: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(url);
    return true;
  } catch (err) {
<<<<<<< HEAD
    console.error("Error copying link:", err);
=======
    console.error('Error copying link:', err);
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    return false;
  }
}

/**
 * Generate embed code for playlists/albums
 */
<<<<<<< HEAD
export function generateEmbedCode(
  type: "track" | "playlist" | "album",
  id: string,
  width: number = 352,
  height: number = 152,
): string {
  const baseUrl =
    typeof window !== "undefined"
      ? window.location.origin
      : "https://spot.music";
  const url = `${baseUrl}/${type}/${id}`;

=======
export function generateEmbedCode(type: 'track' | 'playlist' | 'album', id: string, width: number = 352, height: number = 152): string {
  const baseUrl = typeof window !== 'undefined' 
    ? window.location.origin 
    : 'https://empulse.music';
  const url = `${baseUrl}/${type}/${id}`;
  
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  return `<iframe src="${url}?embed=true" width="${width}" height="${height}" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>`;
}
