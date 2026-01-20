import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import KeyboardShortcutsProvider from "@/components/KeyboardShortcutsProvider";
import LayoutContent from "@/components/LayoutContent";
import ErrorBoundary from "@/components/ErrorBoundary";
import GlobalErrorHandler from "@/components/GlobalErrorHandler";
import { QueryProvider } from "@/components/providers/QueryProvider";
import { SessionProvider } from "@/components/providers/SessionProvider";
import { WebVitals } from "@/components/WebVitals";

export const metadata: Metadata = {
  title: "Spot Music - Your Music Streaming Platform",
  description:
    "Listen to millions of songs. Spotify-like music streaming with playlists, search, and more.",
  icons: {
    icon: "/empulseheart.png",
    shortcut: "/empulseheart.png",
    apple: "/empulseheart.png",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
  manifest: "/manifest.json",
  themeColor: "#1DB954",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Spot Music",
  },
  openGraph: {
    title: "Spot Music - Your Music Streaming Platform",
    description: "Listen to millions of songs. Spotify-like music streaming.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Spot Music",
    description: "Listen to millions of songs.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://api.spotify.com" />
        <link rel="dns-prefetch" href="https://i.scdn.co" />
      </head>
      <body suppressHydrationWarning>
        <SessionProvider>
          <QueryProvider>
            <GlobalErrorHandler>
              <ErrorBoundary>
                <KeyboardShortcutsProvider>
                  <LayoutContent>{children}</LayoutContent>
                </KeyboardShortcutsProvider>
              </ErrorBoundary>
            </GlobalErrorHandler>
            <WebVitals />
            <Analytics />
            <SpeedInsights />
          </QueryProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
