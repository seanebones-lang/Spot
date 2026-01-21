<<<<<<< HEAD
"use client";

import { cn } from "@/lib/utils";
=======
'use client';

import { cn } from '@/lib/utils';
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e

interface AvatarProps {
  src?: string;
  alt?: string;
  fallback?: string;
<<<<<<< HEAD
  size?: "sm" | "md" | "lg" | "xl";
=======
  size?: 'sm' | 'md' | 'lg' | 'xl';
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  className?: string;
  border?: boolean;
  glow?: boolean;
}

const sizeClasses = {
<<<<<<< HEAD
  sm: "w-12 h-12 text-sm",
  md: "w-16 h-16 text-base",
  lg: "w-24 h-24 text-xl",
  xl: "w-32 h-32 text-2xl",
};

export default function Avatar({
  src,
  alt = "Avatar",
  fallback,
  size = "md",
=======
  sm: 'w-12 h-12 text-sm',
  md: 'w-16 h-16 text-base',
  lg: 'w-24 h-24 text-xl',
  xl: 'w-32 h-32 text-2xl',
};

export default function Avatar({ 
  src, 
  alt = 'Avatar', 
  fallback, 
  size = 'md',
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  className,
  border = false,
  glow = false,
}: AvatarProps) {
  const sizeClass = sizeClasses[size];
<<<<<<< HEAD
  const initials = fallback || "?";
=======
  const initials = fallback || '?';
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e

  return (
    <div
      className={cn(
<<<<<<< HEAD
        "relative rounded-full overflow-hidden flex-shrink-0",
        "bg-gradient-to-br from-gray-700 to-gray-800",
        "flex items-center justify-center",
        "text-white font-bold",
        sizeClass,
        border && "border-4 border-spotify-green",
        glow && "hover:shadow-[0_0_20px_#1DB954]",
        "transition-all duration-300",
        className,
      )}
      style={{
        boxShadow: glow ? "0 8px 24px rgba(0, 0, 0, 0.5)" : undefined,
=======
        'relative rounded-full overflow-hidden flex-shrink-0',
        'bg-gradient-to-br from-gray-700 to-gray-800',
        'flex items-center justify-center',
        'text-white font-bold',
        sizeClass,
        border && 'border-4 border-spotify-green',
        glow && 'hover:shadow-[0_0_20px_#7209B7]',
        'transition-all duration-300',
        className
      )}
      style={{
        boxShadow: glow ? '0 8px 24px rgba(0, 0, 0, 0.5)' : undefined,
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      }}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          onError={(e) => {
            // Fallback to initials if image fails to load
            const target = e.currentTarget;
<<<<<<< HEAD
            target.style.display = "none";
=======
            target.style.display = 'none';
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
            const parent = target.parentElement;
            if (parent) {
              parent.innerHTML = `<span class="text-white font-bold ${sizeClass} flex items-center justify-center">${initials.slice(0, 2).toUpperCase()}</span>`;
            }
          }}
        />
      ) : (
        <span className="text-white font-bold flex items-center justify-center">
          {initials.slice(0, 2).toUpperCase()}
        </span>
      )}
    </div>
  );
}
