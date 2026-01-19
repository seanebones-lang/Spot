'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  User, 
  Settings, 
  LogOut, 
  CreditCard, 
  HelpCircle, 
  ChevronRight,
  Check,
  Music
} from 'lucide-react';
import PremiumBadge from '@/components/PremiumBadge';
import { useUserStore } from '@/stores/userStore';
import { cn } from '@/lib/utils';

interface UserMenuProps {
  userName?: string;
  userEmail?: string;
  subscriptionTier?: 'Free' | 'Premium' | 'Artist';
}

export default function UserMenu({ 
  userName,
  userEmail,
  subscriptionTier
}: UserMenuProps) {
  const { user, isAuthenticated, logout } = useUserStore();
  
  // Use props if provided, otherwise use store values
  const displayName = userName || user?.name || 'User';
  const displayEmail = userEmail || user?.email || 'user@example.com';
  const displayTier = subscriptionTier || 
    (user?.subscriptionTier === 'artist' ? 'Artist' : 
     user?.subscriptionTier === 'premium' ? 'Premium' : 'Free');
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const router = useRouter();

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        buttonRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  // Build menu items dynamically based on user state
  const menuItems = [
    {
      label: 'Profile',
      icon: User,
      href: '/profile',
      separator: false,
    },
    {
      label: 'Account',
      icon: Settings,
      href: '/settings/account',
      separator: false,
    },
    // Show artist upgrade if approved but not upgraded
    ...(user?.artistApplication?.approvalStatus === 'approved' && displayTier !== 'Artist' ? [{
      label: 'Upgrade to Artist',
      icon: Music,
      href: '/artist/upgrade',
      separator: false,
      highlight: true,
    }] : []),
    // Show artist dashboard if artist
    ...(displayTier === 'Artist' ? [{
      label: 'Artist Dashboard',
      icon: Music,
      href: '/dashboard/artist',
      separator: false,
    }] : []),
    // Show subscription option
    {
      label: displayTier === 'Free' ? 'Upgrade to Premium' : 'Subscription',
      icon: CreditCard,
      href: '/subscription',
      separator: true,
      badge: displayTier === 'Free' ? 'Free' : displayTier,
    },
    {
      label: 'Settings',
      icon: Settings,
      href: '/settings',
      separator: false,
    },
    {
      label: 'Help',
      icon: HelpCircle,
      href: '/help',
      separator: true,
    },
    {
      label: 'Chat Support',
      icon: HelpCircle,
      href: '/support',
      separator: false,
    },
    {
      label: 'Log out',
      icon: LogOut,
      href: '/logout',
      separator: false,
      danger: true,
    },
  ];

  const handleItemClick = (href: string) => {
    setIsOpen(false);
    if (href === '/logout') {
      logout();
      router.push('/');
    } else {
      router.push(href);
    }
  };

  return (
    <div className="relative">
      {/* Profile Button */}
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-3 px-2 py-1.5 rounded-full transition-all duration-200",
          "hover:bg-spotify-light-gray active:bg-[#3e3e3e]",
          isOpen && "bg-spotify-light-gray"
        )}
        aria-label="User menu"
        aria-expanded={isOpen ? 'true' : 'false'}
        aria-haspopup="true"
      >
        {/* Avatar */}
        {user?.profilePicture ? (
          <img 
            src={user.profilePicture} 
            alt={displayName}
            className="w-8 h-8 rounded-full flex-shrink-0 object-cover"
          />
        ) : (
          <div className="w-8 h-8 bg-gradient-to-br from-empulse-purple to-empulse-blue rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-white text-xs font-medium">
              {displayName.charAt(0).toUpperCase()}
            </span>
          </div>
        )}
        
        {/* User Name */}
        <span className="text-sm font-medium text-white whitespace-nowrap max-w-[120px] truncate">
          {displayName}
        </span>

        {/* Chevron Icon - Spotify uses down arrow when open */}
        <ChevronRight 
          className={cn(
            "w-4 h-4 text-spotify-text-gray transition-transform duration-200",
            isOpen && "transform -rotate-90"
          )}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div
          ref={menuRef}
          className="absolute top-full right-0 mt-2 w-56 bg-[#282828] rounded-md shadow-2xl overflow-hidden z-50"
          style={{
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.5)',
          }}
        >
          {/* User Info Header */}
          <div className="px-4 py-3 border-b border-white/10">
            <div className="flex items-center gap-3 mb-2">
              {user?.profilePicture ? (
                <img 
                  src={user.profilePicture} 
                  alt={displayName}
                  className="w-10 h-10 rounded-full flex-shrink-0 object-cover"
                />
              ) : (
                <div className="w-10 h-10 bg-gradient-to-br from-empulse-purple to-empulse-blue rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm font-medium">
                    {displayName.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-white truncate">
                  {displayName}
                </div>
                <div className="text-xs text-spotify-text-gray truncate">
                  {displayEmail}
                </div>
              </div>
            </div>
          </div>

          {/* Menu Items */}
          <div className="py-1">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              const showSeparator = item.separator && index > 0;

              return (
                <div key={item.label}>
                  {showSeparator && (
                    <div className="h-px bg-white/10 my-1 mx-2" />
                  )}
                  <button
                    onClick={() => handleItemClick(item.href)}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors",
                      "hover:bg-white/10 active:bg-white/15",
                      item.danger && "hover:bg-red-500/20 hover:text-red-400",
                      !item.danger && "text-white"
                    )}
                  >
                    <Icon 
                      className={cn(
                        "w-5 h-5 flex-shrink-0",
                        item.danger ? "text-red-400" : "text-spotify-text-gray"
                      )} 
                    />
                    <span className={cn(
                      "text-sm font-medium flex-1",
                      item.danger && "text-red-400"
                    )}>
                      {item.label}
                    </span>
                    {item.badge && (
                      <span className={cn(
                        "text-xs px-2 py-0.5 rounded-full font-medium",
                        displayTier === 'Free' 
                          ? "bg-spotify-light-gray text-spotify-text-gray"
                          : displayTier === 'Premium'
                          ? "bg-spotify-green text-black"
                          : "bg-empulse-purple text-white"
                      )}>
                        {item.badge}
                      </span>
                    )}
                    {(item as any).highlight && (
                      <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-spotify-green/20 text-spotify-green">
                        New
                      </span>
                    )}
                    {item.label === 'Subscription' && displayTier !== 'Free' && (
                      <Check className="w-4 h-4 text-spotify-green flex-shrink-0" />
                    )}
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
