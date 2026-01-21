<<<<<<< HEAD
import type { Metadata } from "next";
import dynamic from "next/dynamic";
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
import Skeleton from "@/components/Skeleton";

// Dynamic imports for heavy components (code splitting)
const HeavyAnalytics = dynamic(() => import("@vercel/analytics/react"), {
  ssr: false,
});

const HeavySpeedInsights = dynamic(() => import("@vercel/speed-insights/next"), {
  ssr: false,
});

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
=======
import type { Metadata } from 'next';
import './globals.css';
import KeyboardShortcutsProvider from '@/components/KeyboardShortcutsProvider';
import LayoutContent from '@/components/LayoutContent';
import ErrorBoundary from '@/components/ErrorBoundary';
import GlobalErrorHandler from '@/components/GlobalErrorHandler';
import ServiceWorkerRegistration from '@/components/ServiceWorkerRegistration';

export const metadata: Metadata = {
  title: 'EmPulse Music - Revolutionary Mood-Based Music Discovery',
  description: 'Discover music that matches your mood. Revolutionary mood-based music streaming with wellness integration',
  icons: {
    icon: '/empulseheart.png',
    shortcut: '/empulseheart.png',
    apple: '/empulseheart.png',
  },
  viewport: {
    width: 'device-width',
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
<<<<<<< HEAD
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
=======
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
<<<<<<< HEAD
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
            <HeavyAnalytics />
            <HeavySpeedInsights />
          </QueryProvider>
        </SessionProvider>
=======
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#7209B7" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="EmPulse Music" />
      </head>
      <body suppressHydrationWarning>
        <ServiceWorkerRegistration />
        <GlobalErrorHandler>
          <ErrorBoundary>
            <KeyboardShortcutsProvider>
              <LayoutContent>
                {children}
              </LayoutContent>
            </KeyboardShortcutsProvider>
          </ErrorBoundary>
        </GlobalErrorHandler>
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      </body>
    </html>
  );
}
