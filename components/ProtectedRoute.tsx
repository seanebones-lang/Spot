'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/stores/userStore';
import { Loader2 } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requireArtist?: boolean;
  requirePremium?: boolean;
  redirectTo?: string;
}

/**
 * ProtectedRoute Component
 * 
 * Protects routes based on authentication and subscription status.
 * 
 * @param requireAuth - If true, user must be authenticated
 * @param requireArtist - If true, user must have artist subscription
 * @param requirePremium - If true, user must have premium or artist subscription
 * @param redirectTo - Custom redirect path (defaults to /signin or /subscription)
 */
export default function ProtectedRoute({
  children,
  requireAuth = true,
  requireArtist = false,
  requirePremium = false,
  redirectTo,
}: ProtectedRouteProps) {
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useUserStore();

  useEffect(() => {
    if (isLoading) return;

    // Check authentication
    if (requireAuth && !isAuthenticated) {
      router.push(redirectTo || '/signin');
      return;
    }

    // Check premium subscription
    if (requirePremium && user) {
      const hasPremium = user.subscriptionTier === 'premium' || user.subscriptionTier === 'artist';
      if (!hasPremium) {
        router.push(redirectTo || '/subscription');
        return;
      }
    }

    // Check artist subscription
    if (requireArtist && user) {
      const isArtist = user.subscriptionTier === 'artist' && 
                      user.artistApplication && 
                      user.artistApplication.approvalStatus === 'approved';
      if (!isArtist) {
        router.push(redirectTo || '/artist/upgrade');
        return;
      }
    }
  }, [isAuthenticated, user, isLoading, requireAuth, requireArtist, requirePremium, redirectTo, router]);

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-spotify-green animate-spin" />
      </div>
    );
  }

  // Check if user meets requirements
  if (requireAuth && !isAuthenticated) {
    return null; // Will redirect
  }

  if (requirePremium && user) {
    const hasPremium = user.subscriptionTier === 'premium' || user.subscriptionTier === 'artist';
    if (!hasPremium) {
      return null; // Will redirect
    }
  }

  if (requireArtist && user) {
    const isArtist = user.subscriptionTier === 'artist' && 
                    user.artistApplication && 
                    user.artistApplication.approvalStatus === 'approved';
    if (!isArtist) {
      return null; // Will redirect
    }
  }

  return <>{children}</>;
}
