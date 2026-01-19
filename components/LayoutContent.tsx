'use client';

import { useEffect } from 'react';
import { useUIStore } from '@/stores/uiStore';
import Sidebar from '@/components/Sidebar';
import TopBar from '@/components/TopBar';
import Player from '@/components/Player';
import RightSidebar from '@/components/RightSidebar';
import Breadcrumbs from '@/components/Breadcrumbs';
import Footer from '@/components/Footer';
import { cn } from '@/lib/utils';

export default function LayoutContent({ children }: { children: React.ReactNode }) {
  const { leftSidebarWidth, rightSidebarOpen, rightSidebarWidth, setLeftSidebarCollapsed, setRightSidebarOpen } = useUIStore();
  
  // Handle narrow viewports (< 256px) - auto-collapse sidebars
  useEffect(() => {
    const handleResize = () => {
      const viewportWidth = window.innerWidth;
      
      // If viewport is narrower than default sidebar width, auto-collapse
      if (viewportWidth < 256 && leftSidebarWidth >= 256) {
        setLeftSidebarCollapsed(true);
      }
      
      // Close right sidebar on very narrow viewports
      if (viewportWidth < 400 && rightSidebarOpen) {
        setRightSidebarOpen(false);
      }
    };
    
    // Check on mount
    handleResize();
    
    // Listen for resize events
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [leftSidebarWidth, rightSidebarOpen, setLeftSidebarCollapsed, setRightSidebarOpen]);
  
  return (
    <div className="flex h-screen bg-[#000000] overflow-hidden">
      <Sidebar />
      {/* TopBar - Fixed at top level, independent of scrollable content */}
      <TopBar />
      <div 
        className="flex-1 flex flex-col transition-all duration-300 ease-in-out"
        style={{ 
          marginLeft: `${leftSidebarWidth + 1}px`, 
          marginRight: rightSidebarOpen ? `${rightSidebarWidth + 1}px` : '1px',
          backgroundColor: '#121212'
        }}
      >
        {/* Skip to main content link for keyboard accessibility */}
        <a 
          href="#main-content" 
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:bg-spotify-green focus:text-black focus:rounded-md focus:font-semibold focus:outline-none focus:ring-2 focus:ring-white"
          aria-label="Skip to main content"
        >
          Skip to main content
        </a>
        <main id="main-content" className="flex-1 flex flex-col overflow-y-auto bg-[#121212]" style={{
          paddingTop: '56px',
          paddingBottom: window.innerWidth < 768 ? '60px' : '90px'
        }}>
          <div className="flex-1 w-full">
            <Breadcrumbs />
            {children}
          </div>
          <Footer />
        </main>
      </div>
      <RightSidebar />
      <Player />
    </div>
  );
}
