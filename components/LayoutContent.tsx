'use client';

import { useUIStore } from '@/stores/uiStore';
import Sidebar from '@/components/Sidebar';
import TopBar from '@/components/TopBar';
import Player from '@/components/Player';
import RightSidebar from '@/components/RightSidebar';
import Breadcrumbs from '@/components/Breadcrumbs';
import Footer from '@/components/Footer';
import { cn } from '@/lib/utils';

export default function LayoutContent({ children }: { children: React.ReactNode }) {
  const { leftSidebarWidth, rightSidebarOpen, rightSidebarWidth } = useUIStore();
  
  return (
    <div className="flex h-screen bg-[#000000] overflow-hidden">
      <Sidebar />
      <div 
        className="flex-1 flex flex-col transition-all duration-300 ease-in-out"
        style={{ 
          marginLeft: `${leftSidebarWidth + 1}px`, 
          marginRight: rightSidebarOpen ? `${rightSidebarWidth + 1}px` : '1px',
          backgroundColor: '#121212'
        }}
      >
        <TopBar />
        {/* Skip to main content link for keyboard accessibility */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:bg-spotify-green focus:text-black focus:rounded-md focus:font-semibold focus:outline-none focus:ring-2 focus:ring-white"
          aria-label="Skip to main content"
        >
          Skip to main content
        </a>
        <main id="main-content" className="flex-1 flex flex-col overflow-y-auto bg-[#121212]" style={{ paddingTop: '56px', paddingBottom: '90px' }}>
          <div className="flex-1 min-h-0">
            <Breadcrumbs />
            <div className="pb-8">
              {children}
            </div>
          </div>
          <Footer />
        </main>
      </div>
      <RightSidebar />
      <Player />
    </div>
  );
}
