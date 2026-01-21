/**
 * Accessibility Utilities
<<<<<<< HEAD
 *
=======
 * 
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
 * Helper functions for accessibility features:
 * - Focus management
 * - Keyboard navigation
 * - ARIA announcements
 * - Screen reader utilities
 */

/**
 * Focus trap utility - Keeps focus within a container
 */
export function trapFocus(
  container: HTMLElement,
  options: {
    initialFocus?: HTMLElement;
    returnFocus?: HTMLElement;
    escapeCallback?: () => void;
<<<<<<< HEAD
  } = {},
): () => void {
  const { initialFocus, returnFocus, escapeCallback } = options;

  // Get all focusable elements within container
  const getFocusableElements = (): HTMLElement[] => {
    const selector = [
      "button:not([disabled])",
      "a[href]",
      "input:not([disabled])",
      "select:not([disabled])",
      "textarea:not([disabled])",
      '[tabindex]:not([tabindex="-1"])',
    ].join(", ");

    return Array.from(container.querySelectorAll<HTMLElement>(selector)).filter(
      (el) => el.offsetParent !== null, // Visible elements only
    );
  };

=======
  } = {}
): () => void {
  const { initialFocus, returnFocus, escapeCallback } = options;
  
  // Get all focusable elements within container
  const getFocusableElements = (): HTMLElement[] => {
    const selector = [
      'button:not([disabled])',
      'a[href]',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
    ].join(', ');
    
    return Array.from(container.querySelectorAll<HTMLElement>(selector)).filter(
      (el) => el.offsetParent !== null // Visible elements only
    );
  };
  
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  // Focus first focusable element
  const focusFirst = () => {
    const focusable = getFocusableElements();
    const target = initialFocus || focusable[0];
    if (target) {
      target.focus();
    }
  };
<<<<<<< HEAD

=======
  
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  // Focus last focusable element
  const focusLast = () => {
    const focusable = getFocusableElements();
    if (focusable.length > 0) {
      focusable[focusable.length - 1].focus();
    }
  };
<<<<<<< HEAD

  // Handle keyboard navigation
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape" && escapeCallback) {
      escapeCallback();
      return;
    }

    if (e.key !== "Tab") return;

    const focusable = getFocusableElements();
    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const active = document.activeElement as HTMLElement;

=======
  
  // Handle keyboard navigation
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && escapeCallback) {
      escapeCallback();
      return;
    }
    
    if (e.key !== 'Tab') return;
    
    const focusable = getFocusableElements();
    if (focusable.length === 0) return;
    
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    const active = document.activeElement as HTMLElement;
    
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    if (e.shiftKey) {
      // Shift + Tab (backwards)
      if (active === first || !container.contains(active)) {
        e.preventDefault();
        last.focus();
      }
    } else {
      // Tab (forwards)
      if (active === last || !container.contains(active)) {
        e.preventDefault();
        first.focus();
      }
    }
  };
<<<<<<< HEAD

  // Set up focus trap
  container.addEventListener("keydown", handleKeyDown);
  focusFirst();

  // Store return focus element
  const previousActive = document.activeElement as HTMLElement;

  // Cleanup function
  return () => {
    container.removeEventListener("keydown", handleKeyDown);

=======
  
  // Set up focus trap
  container.addEventListener('keydown', handleKeyDown);
  focusFirst();
  
  // Store return focus element
  const previousActive = document.activeElement as HTMLElement;
  
  // Cleanup function
  return () => {
    container.removeEventListener('keydown', handleKeyDown);
    
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    // Restore focus
    if (returnFocus) {
      returnFocus.focus();
    } else if (previousActive && previousActive instanceof HTMLElement) {
      previousActive.focus();
    }
  };
}

/**
 * Create live region for screen reader announcements
 */
export function createLiveRegion(
  options: {
<<<<<<< HEAD
    level?: "polite" | "assertive" | "off";
    atomic?: boolean;
  } = {},
=======
    level?: 'polite' | 'assertive' | 'off';
    atomic?: boolean;
  } = {}
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
): {
  announce: (message: string) => void;
  remove: () => void;
} {
<<<<<<< HEAD
  const { level = "polite", atomic = true } = options;

  const liveRegion = document.createElement("div");
  liveRegion.setAttribute("role", "status");
  liveRegion.setAttribute("aria-live", level);
  liveRegion.setAttribute("aria-atomic", String(atomic));
  liveRegion.className = "sr-only"; // Visually hidden but accessible to screen readers

  document.body.appendChild(liveRegion);

  const announce = (message: string) => {
    // Clear previous message
    liveRegion.textContent = "";

    // Trigger reflow for screen readers
    void liveRegion.offsetWidth;

    // Announce new message
    liveRegion.textContent = message;

    // Clear after announcement (for some screen readers)
    setTimeout(() => {
      liveRegion.textContent = "";
    }, 1000);
  };

=======
  const { level = 'polite', atomic = true } = options;
  
  const liveRegion = document.createElement('div');
  liveRegion.setAttribute('role', 'status');
  liveRegion.setAttribute('aria-live', level);
  liveRegion.setAttribute('aria-atomic', String(atomic));
  liveRegion.className = 'sr-only'; // Visually hidden but accessible to screen readers
  
  document.body.appendChild(liveRegion);
  
  const announce = (message: string) => {
    // Clear previous message
    liveRegion.textContent = '';
    
    // Trigger reflow for screen readers
    void liveRegion.offsetWidth;
    
    // Announce new message
    liveRegion.textContent = message;
    
    // Clear after announcement (for some screen readers)
    setTimeout(() => {
      liveRegion.textContent = '';
    }, 1000);
  };
  
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  const remove = () => {
    if (liveRegion.parentNode) {
      liveRegion.parentNode.removeChild(liveRegion);
    }
  };
<<<<<<< HEAD

=======
  
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  return { announce, remove };
}

/**
 * Announce to screen readers
 */
let globalLiveRegion: ReturnType<typeof createLiveRegion> | null = null;

<<<<<<< HEAD
export function announce(
  message: string,
  level: "polite" | "assertive" = "polite",
) {
=======
export function announce(message: string, level: 'polite' | 'assertive' = 'polite') {
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  if (!globalLiveRegion) {
    globalLiveRegion = createLiveRegion({ level });
  }
  globalLiveRegion.announce(message);
}

/**
 * Get next focusable element in document order
 */
export function getNextFocusable(
  current: HTMLElement,
<<<<<<< HEAD
  reverse = false,
): HTMLElement | null {
  const selector = [
    "button:not([disabled])",
    "a[href]",
    "input:not([disabled])",
    "select:not([disabled])",
    "textarea:not([disabled])",
    '[tabindex]:not([tabindex="-1"])',
  ].join(", ");

  const allFocusable = Array.from(
    document.querySelectorAll<HTMLElement>(selector),
  ).filter((el) => el.offsetParent !== null);

  if (allFocusable.length === 0) return null;

  const currentIndex = allFocusable.indexOf(current);

=======
  reverse = false
): HTMLElement | null {
  const selector = [
    'button:not([disabled])',
    'a[href]',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    '[tabindex]:not([tabindex="-1"])',
  ].join(', ');
  
  const allFocusable = Array.from(
    document.querySelectorAll<HTMLElement>(selector)
  ).filter((el) => el.offsetParent !== null);
  
  if (allFocusable.length === 0) return null;
  
  const currentIndex = allFocusable.indexOf(current);
  
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  if (reverse) {
    // Previous element
    return currentIndex > 0
      ? allFocusable[currentIndex - 1]
      : allFocusable[allFocusable.length - 1];
  } else {
    // Next element
    return currentIndex < allFocusable.length - 1
      ? allFocusable[currentIndex + 1]
      : allFocusable[0];
  }
}

/**
 * Scroll element into view and focus it
 */
export function focusElement(
  element: HTMLElement | string,
  options: {
    smooth?: boolean;
    block?: ScrollLogicalPosition;
    preventScroll?: boolean;
<<<<<<< HEAD
  } = {},
): void {
  const { smooth = true, block = "center", preventScroll = false } = options;

  const el =
    typeof element === "string" ? document.getElementById(element) : element;

  if (!el) return;

  // Make focusable if needed
  if (!el.hasAttribute("tabindex")) {
    el.setAttribute("tabindex", "-1");
  }

  // Scroll into view
  el.scrollIntoView({
    behavior: smooth ? "smooth" : "auto",
    block,
    inline: "nearest",
  });

  // Focus
  if (!preventScroll) {
    // Small delay to ensure scroll completes
    setTimeout(
      () => {
        el.focus();
      },
      smooth ? 300 : 0,
    );
  } else {
    el.focus();
  }

  // Clean up tabindex after blur (for non-focusable elements)
  const cleanup = () => {
    if (el.hasAttribute("tabindex")) {
      el.removeAttribute("tabindex");
    }
    el.removeEventListener("blur", cleanup);
  };
  el.addEventListener("blur", cleanup, { once: true });
=======
  } = {}
): void {
  const { smooth = true, block = 'center', preventScroll = false } = options;
  
  const el =
    typeof element === 'string'
      ? document.getElementById(element)
      : element;
  
  if (!el) return;
  
  // Make focusable if needed
  if (!el.hasAttribute('tabindex')) {
    el.setAttribute('tabindex', '-1');
  }
  
  // Scroll into view
  el.scrollIntoView({
    behavior: smooth ? 'smooth' : 'auto',
    block,
    inline: 'nearest',
  });
  
  // Focus
  if (!preventScroll) {
    // Small delay to ensure scroll completes
    setTimeout(() => {
      el.focus();
    }, smooth ? 300 : 0);
  } else {
    el.focus();
  }
  
  // Clean up tabindex after blur (for non-focusable elements)
  const cleanup = () => {
    if (el.hasAttribute('tabindex')) {
      el.removeAttribute('tabindex');
    }
    el.removeEventListener('blur', cleanup);
  };
  el.addEventListener('blur', cleanup, { once: true });
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
}

/**
 * Check if user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
<<<<<<< HEAD
  if (typeof window === "undefined") return false;

  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
=======
  if (typeof window === 'undefined') return false;
  
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
}

/**
 * Get safe animation duration (respects reduced motion preference)
 */
export function getSafeDuration(baseDuration: number): number {
  return prefersReducedMotion() ? 0 : baseDuration;
}

/**
 * Hide element from visual display but keep accessible to screen readers
 */
export function srOnly(): string {
<<<<<<< HEAD
  return "sr-only"; // Tailwind class
=======
  return 'sr-only'; // Tailwind class
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
}

/**
 * Ensure element is focusable for keyboard navigation
 */
export function ensureFocusable(element: HTMLElement): void {
<<<<<<< HEAD
  if (!element.hasAttribute("tabindex")) {
    element.setAttribute("tabindex", "0");
=======
  if (!element.hasAttribute('tabindex')) {
    element.setAttribute('tabindex', '0');
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  }
}
