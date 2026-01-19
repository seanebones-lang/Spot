"use client";

import React from "react";
import { cn } from "@/lib/utils";

/**
 * SkipLinks Component - Keyboard navigation shortcuts
 *
 * Provides skip-to navigation links for keyboard users.
 * Appears when focused (Tab key) for accessibility.
 *
 * Design System Specifications:
 * - Hidden by default, visible on focus
 * - Positions at top of page
 * - High contrast styling
 * - Multiple skip targets (main content, navigation, search)
 *
 * @example
 * ```tsx
 * <SkipLinks />
 *
 * // In layout:
 * <main id="main-content">...</main>
 * <nav id="navigation">...</nav>
 * ```
 */

export interface SkipLink {
  /**
   * Link label (visible text)
   */
  label: string;

  /**
   * Target ID (without #)
   */
  targetId: string;

  /**
   * Optional description
   */
  description?: string;
}

export interface SkipLinksProps {
  /**
   * Custom skip links (defaults to standard set)
   */
  links?: SkipLink[];

  /**
   * Additional className
   */
  className?: string;
}

/**
 * Default skip links (standard patterns)
 */
const defaultSkipLinks: SkipLink[] = [
  {
    label: "Skip to main content",
    targetId: "main-content",
    description: "Skip navigation and go to main content",
  },
  {
    label: "Skip to navigation",
    targetId: "navigation",
    description: "Skip to main navigation menu",
  },
  {
    label: "Skip to search",
    targetId: "search",
    description: "Skip to search functionality",
  },
];

const SkipLinks: React.FC<SkipLinksProps> = ({
  links = defaultSkipLinks,
  className,
}) => {
  const handleClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    targetId: string,
  ) => {
    e.preventDefault();
    const target = document.getElementById(targetId);
    if (target) {
      // Focus the target element
      target.focus();
      target.scrollIntoView({ behavior: "smooth", block: "start" });

      // For elements that aren't naturally focusable, add tabIndex temporarily
      if (!target.hasAttribute("tabindex")) {
        target.setAttribute("tabindex", "-1");
        target.addEventListener(
          "blur",
          () => target.removeAttribute("tabindex"),
          { once: true },
        );
      }
    }
  };

  return (
    <div
      className={cn(
        "sr-only focus-within:not-sr-only focus-within:absolute focus-within:z-[9999]",
        "focus-within:top-4 focus-within:left-4",
        "focus-within:flex focus-within:flex-col focus-within:gap-2",
        className,
      )}
      role="navigation"
      aria-label="Skip navigation"
    >
      {links.map((link) => (
        <a
          key={link.targetId}
          href={`#${link.targetId}`}
          onClick={(e) => handleClick(e, link.targetId)}
          className={cn(
            "inline-flex items-center px-4 py-2",
            "bg-spotify-green text-black",
            "rounded-lg font-semibold text-sm",
            "shadow-lg border-2 border-spotify-green",
            "transition-all duration-200",
            "hover:bg-[#8a1dd0] hover:scale-105",
            "focus:outline-none focus:ring-2 focus:ring-spotify-green focus:ring-offset-2 focus:ring-offset-spotify-dark",
            "active:bg-[#5a0789] active:scale-100",
            "whitespace-nowrap",
          )}
          aria-label={link.description || link.label}
        >
          {link.label}
        </a>
      ))}
    </div>
  );
};

export default SkipLinks;
