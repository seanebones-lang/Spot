'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function Breadcrumbs() {
  const pathname = usePathname();
  
  // Don't show breadcrumbs on home page
  if (pathname === '/') return null;

  const segments = pathname.split('/').filter(Boolean);
  
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    ...segments.map((segment, index) => {
      const href = '/' + segments.slice(0, index + 1).join('/');
      return {
        label: segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' '),
        href,
      };
    }),
  ];

  return (
    <nav className="flex items-center gap-2 text-sm text-spotify-text-gray mb-4 px-8">
      {breadcrumbItems.map((item, index) => (
        <div key={item.href} className="flex items-center gap-2">
          {index > 0 && <ChevronRight size={16} className="text-spotify-text-gray" />}
          <Link
            href={item.href}
            className={cn(
              "hover:text-white transition-colors",
              index === breadcrumbItems.length - 1 && "text-white font-medium"
            )}
          >
            {index === 0 ? (
              <span className="flex items-center gap-1">
                <Home size={16} />
                {item.label}
              </span>
            ) : (
              item.label
            )}
          </Link>
        </div>
      ))}
    </nav>
  );
}
