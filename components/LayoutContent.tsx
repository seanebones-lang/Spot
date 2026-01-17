'use client';

import { useUIStore } from '@/stores/uiStore';
import Sidebar from '@/components/Sidebar';
import TopBar from '@/components/TopBar';
import Player from '@/components/Player';
import RightSidebar from '@/components/RightSidebar';
import { cn } from '@/lib/utils';

export default function LayoutContent({ children }: { children: React.ReactNode }) {
  const { leftSidebarWidth, rightSidebarOpen, rightSidebarWidth } = useUIStore();
  
  return (
    <div className="flex h-screen bg-spotify-dark overflow-hidden">
      <Sidebar />
      <div 
        className="flex-1 flex flex-col transition-all duration-300 ease-in-out"
        style={{ marginLeft: `${leftSidebarWidth}px`, marginRight: rightSidebarOpen ? `${rightSidebarWidth}px` : '0' }}
      >
        <TopBar />
        <main className="flex-1 overflow-y-auto pt-16 pb-player-height">
          {children}
        </main>
      </div>
      <RightSidebar />
      <Player />
    </div>
  );
}
