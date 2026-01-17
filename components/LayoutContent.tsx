'use client';

import { useUIStore } from '@/stores/uiStore';
import Sidebar from '@/components/Sidebar';
import TopBar from '@/components/TopBar';
import Player from '@/components/Player';
import RightSidebar from '@/components/RightSidebar';
import { cn } from '@/lib/utils';

export default function LayoutContent({ children }: { children: React.ReactNode }) {
  const { leftSidebarCollapsed, rightSidebarOpen } = useUIStore();
  
  return (
    <div className="flex h-screen bg-spotify-dark overflow-hidden">
      <Sidebar />
      <div 
        className={cn(
          "flex-1 flex flex-col transition-all duration-300 ease-in-out",
          leftSidebarCollapsed ? "ml-16" : "ml-64"
        )}
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
