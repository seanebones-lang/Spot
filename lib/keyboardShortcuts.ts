import { usePlayerStore } from "@/stores/playerStore";
import { audioPlayer } from "./player";

export function setupKeyboardShortcuts() {
  if (typeof window === "undefined") return;

  const handleKeyDown = (e: KeyboardEvent) => {
    // Prevent shortcuts when typing in inputs
    if (
      e.target instanceof HTMLInputElement ||
      e.target instanceof HTMLTextAreaElement ||
      (e.target as HTMLElement).isContentEditable
    ) {
      return;
    }

    // Spacebar: Play/Pause
    if (e.code === "Space" && !e.ctrlKey && !e.metaKey) {
      e.preventDefault();
      const { isPlaying, setIsPlaying } = usePlayerStore.getState();
      setIsPlaying(!isPlaying);
    }

    // Left Arrow: Seek backward 10 seconds (Issue-2: Fix - now actually seeks audio)
    if (e.key === "ArrowLeft" && !e.ctrlKey && !e.metaKey && !e.shiftKey) {
      e.preventDefault();
      const { currentTrack, progress, setProgress } = usePlayerStore.getState();
      if (currentTrack) {
        const currentTime = (progress / 100) * currentTrack.duration;
        const newTime = Math.max(0, currentTime - 10000);
        const newProgress = (newTime / currentTrack.duration) * 100;
        setProgress(newProgress);
        // Actually seek the audio player (was missing before)
        audioPlayer.seek(newTime / 1000); // Convert milliseconds to seconds
      }
    }

    // Right Arrow: Seek forward 10 seconds (Issue-2: Fix - now actually seeks audio)
    if (e.key === "ArrowRight" && !e.ctrlKey && !e.metaKey && !e.shiftKey) {
      e.preventDefault();
      const { currentTrack, progress, setProgress } = usePlayerStore.getState();
      if (currentTrack) {
        const currentTime = (progress / 100) * currentTrack.duration;
        const newTime = Math.min(currentTrack.duration, currentTime + 10000);
        const newProgress = (newTime / currentTrack.duration) * 100;
        setProgress(newProgress);
        // Actually seek the audio player (was missing before)
        audioPlayer.seek(newTime / 1000); // Convert milliseconds to seconds
      }
    }

    // Up Arrow: Volume up
    if (e.key === "ArrowUp" && !e.ctrlKey && !e.metaKey && !e.shiftKey) {
      e.preventDefault();
      const { volume, setVolume } = usePlayerStore.getState();
      setVolume(Math.min(100, volume + 5));
    }

    // Down Arrow: Volume down
    if (e.key === "ArrowDown" && !e.ctrlKey && !e.metaKey && !e.shiftKey) {
      e.preventDefault();
      const { volume, setVolume } = usePlayerStore.getState();
      setVolume(Math.max(0, volume - 5));
    }

    // Ctrl/Cmd + K: Search (Issue-9: Fix - use data attribute or navigate to search)
    if ((e.ctrlKey || e.metaKey) && e.key === "k") {
      e.preventDefault();
      // Try to find search input by data attribute (more reliable)
      const searchInput = document.querySelector(
        "[data-search-input]",
      ) as HTMLInputElement;
      if (searchInput) {
        searchInput.focus();
      } else {
        // Fallback: Navigate to search page if input not found
        if (window.location.pathname !== "/search") {
          window.location.href = "/search";
        } else {
          // On search page, try generic search input selector
          const genericSearchInput = document.querySelector(
            'input[type="search"], input[type="text"]',
          ) as HTMLInputElement;
          if (genericSearchInput) {
            genericSearchInput.focus();
          }
        }
      }
    }

    // Ctrl/Cmd + Arrow Right: Next track
    if ((e.ctrlKey || e.metaKey) && e.key === "ArrowRight") {
      e.preventDefault();
      const { playNext } = usePlayerStore.getState();
      playNext();
    }

    // Ctrl/Cmd + Arrow Left: Previous track
    if ((e.ctrlKey || e.metaKey) && e.key === "ArrowLeft") {
      e.preventDefault();
      const { playPrevious } = usePlayerStore.getState();
      playPrevious();
    }
  };

  window.addEventListener("keydown", handleKeyDown);

  return () => {
    window.removeEventListener("keydown", handleKeyDown);
  };
}
