<<<<<<< HEAD
"use client";

import { useState, useRef, useEffect } from "react";
import { Info } from "lucide-react";
import { cn } from "@/lib/utils";
=======
'use client';

import { useState, useRef, useEffect } from 'react';
import { Info } from 'lucide-react';
import { cn } from '@/lib/utils';
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e

interface TooltipProps {
  text: string;
  children: React.ReactNode;
<<<<<<< HEAD
  position?: "top" | "bottom" | "left" | "right";
=======
  position?: 'top' | 'bottom' | 'left' | 'right';
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  showOnHover?: boolean;
  showInfoIcon?: boolean;
  className?: string;
}

export default function Tooltip({
  text,
  children,
<<<<<<< HEAD
  position = "top",
=======
  position = 'top',
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  showOnHover = true,
  showInfoIcon = false,
  className,
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!showOnHover) {
      setIsVisible(true);
      setIsMounted(true);
      return;
    }
  }, [showOnHover]);

  const handleMouseEnter = () => {
    if (showOnHover) {
      // Spotify-style delay before showing tooltip
      timeoutRef.current = setTimeout(() => {
        setIsMounted(true);
        // Trigger animation on next frame
        requestAnimationFrame(() => {
          setIsVisible(true);
        });
      }, 300);
    }
  };

  const handleMouseLeave = () => {
    if (showOnHover) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      setIsVisible(false);
      // Delay unmounting for smooth fade-out
      setTimeout(() => {
        setIsMounted(false);
      }, 200);
    }
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const getPositionClasses = () => {
    switch (position) {
<<<<<<< HEAD
      case "top":
        return "bottom-full left-1/2 transform -translate-x-1/2 mb-2";
      case "bottom":
        return "top-full left-1/2 transform -translate-x-1/2 mt-2";
      case "left":
        return "right-full top-1/2 transform -translate-y-1/2 mr-2";
      case "right":
        return "left-full top-1/2 transform -translate-y-1/2 ml-2";
      default:
        return "bottom-full left-1/2 transform -translate-x-1/2 mb-2";
=======
      case 'top':
        return 'bottom-full left-1/2 transform -translate-x-1/2 mb-2';
      case 'bottom':
        return 'top-full left-1/2 transform -translate-x-1/2 mt-2';
      case 'left':
        return 'right-full top-1/2 transform -translate-y-1/2 mr-2';
      case 'right':
        return 'left-full top-1/2 transform -translate-y-1/2 ml-2';
      default:
        return 'bottom-full left-1/2 transform -translate-x-1/2 mb-2';
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    }
  };

  const getArrowClasses = () => {
    switch (position) {
<<<<<<< HEAD
      case "top":
        return "top-full left-1/2 transform -translate-x-1/2 border-t-spotify-dark-gray border-l-transparent border-r-transparent border-b-transparent";
      case "bottom":
        return "bottom-full left-1/2 transform -translate-x-1/2 border-b-spotify-dark-gray border-l-transparent border-r-transparent border-t-transparent";
      case "left":
        return "left-full top-1/2 transform -translate-y-1/2 border-l-spotify-dark-gray border-t-transparent border-b-transparent border-r-transparent";
      case "right":
        return "right-full top-1/2 transform -translate-y-1/2 border-r-spotify-dark-gray border-t-transparent border-b-transparent border-l-transparent";
      default:
        return "top-full left-1/2 transform -translate-x-1/2 border-t-spotify-dark-gray border-l-transparent border-r-transparent border-b-transparent";
=======
      case 'top':
        return 'top-full left-1/2 transform -translate-x-1/2 border-t-spotify-dark-gray border-l-transparent border-r-transparent border-b-transparent';
      case 'bottom':
        return 'bottom-full left-1/2 transform -translate-x-1/2 border-b-spotify-dark-gray border-l-transparent border-r-transparent border-t-transparent';
      case 'left':
        return 'left-full top-1/2 transform -translate-y-1/2 border-l-spotify-dark-gray border-t-transparent border-b-transparent border-r-transparent';
      case 'right':
        return 'right-full top-1/2 transform -translate-y-1/2 border-r-spotify-dark-gray border-t-transparent border-b-transparent border-l-transparent';
      default:
        return 'top-full left-1/2 transform -translate-x-1/2 border-t-spotify-dark-gray border-l-transparent border-r-transparent border-b-transparent';
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    }
  };

  return (
    <div
      ref={triggerRef}
<<<<<<< HEAD
      className={cn("relative inline-block", className)}
=======
      className={cn('relative inline-block', className)}
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {showInfoIcon ? (
        <div className="flex items-center gap-2">
          {children}
          <Info
            size={14}
            className="text-spotify-text-gray hover:text-white transition-colors cursor-help"
            aria-label={`Tooltip: ${text}`}
          />
        </div>
      ) : (
        children
      )}

      {isMounted && (
        <div
          ref={tooltipRef}
          className={cn(
<<<<<<< HEAD
            "absolute z-50 px-3 py-2 bg-spotify-dark-gray text-white text-xs rounded-lg shadow-2xl whitespace-nowrap pointer-events-none",
            "border border-white/20 transition-opacity duration-200 ease-out",
            getPositionClasses(),
            isVisible ? "opacity-100" : "opacity-0",
          )}
          style={{
            transition: "opacity 200ms cubic-bezier(0.3, 0, 0.1, 1)",
=======
            'absolute z-50 px-3 py-2 bg-spotify-dark-gray text-white text-xs rounded-lg shadow-2xl whitespace-nowrap pointer-events-none',
            'border border-white/20 transition-opacity duration-200 ease-out',
            getPositionClasses(),
            isVisible ? 'opacity-100' : 'opacity-0'
          )}
          style={{
            transition: 'opacity 200ms cubic-bezier(0.3, 0, 0.1, 1)'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
          }}
          role="tooltip"
        >
          {text}
          {/* Arrow */}
<<<<<<< HEAD
          <div className={cn("absolute w-0 h-0 border-4", getArrowClasses())} />
=======
          <div
            className={cn(
              'absolute w-0 h-0 border-4',
              getArrowClasses()
            )}
          />
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
        </div>
      )}
    </div>
  );
}
