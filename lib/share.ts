/**
 * Share utility functions for Spot Music
 * Supports Web Share API and fallback to clipboard
 */

export interface ShareOptions {
  title: string;
  text?: string;
  url: string;
  type: "track" | "playlist" | "album" | "artist";
}

/**
 * Share content using Web Share API or fallback to clipboard
 */
export async function shareContent(options: ShareOptions): Promise<boolean> {
  const { title, text, url, type } = options;

  const shareData: ShareData = {
    title,
    text: text || `Check out this ${type} on Spot Music`,
    url,
  };

  // Try Web Share API first (mobile/desktop with support)
  if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
    try {
      await navigator.share(shareData);
      return true;
    } catch (err) {
      // User cancelled or error occurred
      if ((err as Error).name !== "AbortError") {
        console.error("Error sharing:", err);
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
    console.error("Error copying to clipboard:", err);
    return false;
  }
}

/**
 * Generate share URL for content
 */
export function generateShareUrl(
  type: "track" | "playlist" | "album" | "artist",
  id: string,
): string {
  const baseUrl =
    typeof window !== "undefined"
      ? window.location.origin
      : "https://spot.music";
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
    console.error("Error copying link:", err);
    return false;
  }
}

/**
 * Generate embed code for playlists/albums
 */
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

  return `<iframe src="${url}?embed=true" width="${width}" height="${height}" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>`;
}
