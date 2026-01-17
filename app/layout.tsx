import type { Metadata } from 'next';
import './globals.css';
import Sidebar from '@/components/Sidebar';
import TopBar from '@/components/TopBar';
import Player from '@/components/Player';
import KeyboardShortcutsProvider from '@/components/KeyboardShortcutsProvider';

export const metadata: Metadata = {
  title: 'EmPulse Music - Revolutionary Mood-Based Music Discovery',
  description: 'Discover music that matches your mood. Revolutionary mood-based music streaming with wellness integration',
  icons: {
    icon: '/empulseheart.png',
    shortcut: '/empulseheart.png',
    apple: '/empulseheart.png',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <KeyboardShortcutsProvider>
          <div className="flex h-screen bg-spotify-dark overflow-hidden">
            <Sidebar />
            <div className="flex-1 flex flex-col ml-64">
              <TopBar />
              <main className="flex-1 overflow-y-auto pt-16 pb-player-height">
                {children}
              </main>
            </div>
            <Player />
          </div>
        </KeyboardShortcutsProvider>
      </body>
    </html>
  );
}
