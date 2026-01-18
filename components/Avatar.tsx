'use client';

import { cn } from '@/lib/utils';

interface AvatarProps {
  src?: string;
  alt?: string;
  fallback?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  border?: boolean;
  glow?: boolean;
}

const sizeClasses = {
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
  className,
  border = false,
  glow = false,
}: AvatarProps) {
  const sizeClass = sizeClasses[size];
  const initials = fallback || '?';

  return (
    <div
      className={cn(
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
            target.style.display = 'none';
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
