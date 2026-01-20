"use client";

import { Spotify } from "lucide-react";
import { signIn, useSession } from "next-auth/react";

/**
 * Spotify Login Button Component
 * Uses NextAuth Spotify provider for OAuth authentication
 */
export function SpotifyLogin() {
  const { data: session } = useSession();

  const handleLogin = () => {
    signIn("spotify", {
      callbackUrl: "/",
    });
  };

  if (session) {
    return (
      <div className="flex items-center gap-2 text-white">
        <span className="text-sm">Signed in as {session.user?.name || session.user?.email}</span>
      </div>
    );
  }

  return (
    <button
      onClick={handleLogin}
      className="bg-spotify-green hover:bg-[#1ed760] text-black font-semibold px-6 py-3 rounded-full transition-colors flex items-center gap-2"
    >
      <Spotify className="h-5 w-5" />
      Sign in with Spotify
    </button>
  );
}
