import type { Metadata } from 'next';
import './globals.css';
import KeyboardShortcutsProvider from '@/components/KeyboardShortcutsProvider';
import LayoutContent from '@/components/LayoutContent';
import ErrorBoundary from '@/components/ErrorBoundary';
import GlobalErrorHandler from '@/components/GlobalErrorHandler';

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
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <GlobalErrorHandler>
          <ErrorBoundary>
            <KeyboardShortcutsProvider>
              <LayoutContent>
                {children}
              </LayoutContent>
            </KeyboardShortcutsProvider>
          </ErrorBoundary>
        </GlobalErrorHandler>
      </body>
    </html>
  );
}
