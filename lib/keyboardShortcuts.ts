import { usePlayerStore } from '@/stores/playerStore';

export function setupKeyboardShortcuts() {
  if (typeof window === 'undefined') return;

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
    if (e.code === 'Space' && !e.ctrlKey && !e.metaKey) {
      e.preventDefault();
      const { isPlaying, setIsPlaying } = usePlayerStore.getState();
      setIsPlaying(!isPlaying);
    }

    // Left Arrow: Seek backward 10 seconds
    if (e.key === 'ArrowLeft' && !e.ctrlKey && !e.metaKey && !e.shiftKey) {
      e.preventDefault();
      const { currentTrack, progress, setProgress } = usePlayerStore.getState();
      if (currentTrack) {
        const currentTime = (progress / 100) * currentTrack.duration;
        const newTime = Math.max(0, currentTime - 10000);
        setProgress((newTime / currentTrack.duration) * 100);
      }
    }

    // Right Arrow: Seek forward 10 seconds
    if (e.key === 'ArrowRight' && !e.ctrlKey && !e.metaKey && !e.shiftKey) {
      e.preventDefault();
      const { currentTrack, progress, setProgress } = usePlayerStore.getState();
      if (currentTrack) {
        const currentTime = (progress / 100) * currentTrack.duration;
        const newTime = Math.min(currentTrack.duration, currentTime + 10000);
        setProgress((newTime / currentTrack.duration) * 100);
      }
    }

    // Up Arrow: Volume up
    if (e.key === 'ArrowUp' && !e.ctrlKey && !e.metaKey && !e.shiftKey) {
      e.preventDefault();
      const { volume, setVolume } = usePlayerStore.getState();
      setVolume(Math.min(100, volume + 5));
    }

    // Down Arrow: Volume down
    if (e.key === 'ArrowDown' && !e.ctrlKey && !e.metaKey && !e.shiftKey) {
      e.preventDefault();
      const { volume, setVolume } = usePlayerStore.getState();
      setVolume(Math.max(0, volume - 5));
    }

    // Ctrl/Cmd + K: Search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      const searchInput = document.querySelector('input[type="text"][placeholder*="play"]') as HTMLInputElement;
      if (searchInput) {
        searchInput.focus();
      }
    }

    // Ctrl/Cmd + Arrow Right: Next track
    if ((e.ctrlKey || e.metaKey) && e.key === 'ArrowRight') {
      e.preventDefault();
      const { playNext } = usePlayerStore.getState();
      playNext();
    }

    // Ctrl/Cmd + Arrow Left: Previous track
    if ((e.ctrlKey || e.metaKey) && e.key === 'ArrowLeft') {
      e.preventDefault();
      const { playPrevious } = usePlayerStore.getState();
      playPrevious();
    }
  };

  window.addEventListener('keydown', handleKeyDown);

  return () => {
    window.removeEventListener('keydown', handleKeyDown);
  };
}
