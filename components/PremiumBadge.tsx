<<<<<<< HEAD
"use client";

import { Crown } from "lucide-react";
import { cn } from "@/lib/utils";

interface PremiumBadgeProps {
  size?: "sm" | "md" | "lg";
=======
'use client';

import { Crown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PremiumBadgeProps {
  size?: 'sm' | 'md' | 'lg';
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  className?: string;
  showText?: boolean;
}

<<<<<<< HEAD
export default function PremiumBadge({
  size = "md",
  className,
  showText = false,
}: PremiumBadgeProps) {
  const sizes = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
=======
export default function PremiumBadge({ size = 'md', className, showText = false }: PremiumBadgeProps) {
  const sizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  };

  return (
    <div className={cn("flex items-center gap-1.5", className)}>
<<<<<<< HEAD
      <div
        className={cn(
          "bg-spotify-green rounded-full flex items-center justify-center",
          sizes[size],
        )}
      >
        <Crown className={cn("text-black", sizes[size])} />
      </div>
      {showText && (
        <span className="text-xs font-semibold text-spotify-green">
          Premium
        </span>
=======
      <div className={cn("bg-spotify-green rounded-full flex items-center justify-center", sizes[size])}>
        <Crown className={cn("text-black", sizes[size])} />
      </div>
      {showText && (
        <span className="text-xs font-semibold text-spotify-green">Premium</span>
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      )}
    </div>
  );
}
