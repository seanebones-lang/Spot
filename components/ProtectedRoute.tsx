<<<<<<< HEAD
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/stores/userStore";
import { Loader2 } from "lucide-react";
=======
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/stores/userStore';
import { Loader2 } from 'lucide-react';
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAuth?: boolean;
  requireArtist?: boolean;
  requirePremium?: boolean;
  redirectTo?: string;
}

/**
 * ProtectedRoute Component
<<<<<<< HEAD
 *
 * Protects routes based on authentication and subscription status.
 *
=======
 * 
 * Protects routes based on authentication and subscription status.
 * 
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
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
<<<<<<< HEAD
      router.push(redirectTo || "/signin");
=======
      router.push(redirectTo || '/signin');
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      return;
    }

    // Check premium subscription
    if (requirePremium && user) {
<<<<<<< HEAD
      const hasPremium =
        user.subscriptionTier === "premium" ||
        user.subscriptionTier === "artist";
      if (!hasPremium) {
        router.push(redirectTo || "/subscription");
=======
      const hasPremium = user.subscriptionTier === 'premium' || user.subscriptionTier === 'artist';
      if (!hasPremium) {
        router.push(redirectTo || '/subscription');
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
        return;
      }
    }

    // Check artist subscription
    if (requireArtist && user) {
<<<<<<< HEAD
      const isArtist =
        user.subscriptionTier === "artist" &&
        user.artistApplication &&
        user.artistApplication.approvalStatus === "approved";
      if (!isArtist) {
        router.push(redirectTo || "/artist/upgrade");
        return;
      }
    }
  }, [
    isAuthenticated,
    user,
    isLoading,
    requireAuth,
    requireArtist,
    requirePremium,
    redirectTo,
    router,
  ]);
=======
      const isArtist = user.subscriptionTier === 'artist' && 
                      user.artistApplication && 
                      user.artistApplication.approvalStatus === 'approved';
      if (!isArtist) {
        router.push(redirectTo || '/artist/upgrade');
        return;
      }
    }
  }, [isAuthenticated, user, isLoading, requireAuth, requireArtist, requirePremium, redirectTo, router]);
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e

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
<<<<<<< HEAD
    const hasPremium =
      user.subscriptionTier === "premium" || user.subscriptionTier === "artist";
=======
    const hasPremium = user.subscriptionTier === 'premium' || user.subscriptionTier === 'artist';
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    if (!hasPremium) {
      return null; // Will redirect
    }
  }

  if (requireArtist && user) {
<<<<<<< HEAD
    const isArtist =
      user.subscriptionTier === "artist" &&
      user.artistApplication &&
      user.artistApplication.approvalStatus === "approved";
=======
    const isArtist = user.subscriptionTier === 'artist' && 
                    user.artistApplication && 
                    user.artistApplication.approvalStatus === 'approved';
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    if (!isArtist) {
      return null; // Will redirect
    }
  }

  return <>{children}</>;
}
