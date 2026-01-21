<<<<<<< HEAD
"use client";

import { useEffect } from "react";
import { useUIStore } from "@/stores/uiStore";
import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import Player from "@/components/Player";
import RightSidebar from "@/components/RightSidebar";
import Breadcrumbs from "@/components/Breadcrumbs";
import Footer from "@/components/Footer";
import { cn } from "@/lib/utils";

export default function LayoutContent({
  children,
}: {
  children: React.ReactNode;
}) {
  const {
    leftSidebarWidth,
    rightSidebarOpen,
    rightSidebarWidth,
    setLeftSidebarCollapsed,
    setRightSidebarOpen,
  } = useUIStore();

  // Handle narrow viewports (< 256px) - auto-collapse sidebars
  useEffect(() => {
    const handleResize = () => {
      const viewportWidth = window.innerWidth;

=======
'use client';

import { useEffect, useState, Suspense } from 'react';
import dynamic from 'next/dynamic';
import { useUIStore } from '@/stores/uiStore';
import Sidebar from '@/components/Sidebar';
import TopBar from '@/components/TopBar';
import RightSidebar from '@/components/RightSidebar';
import MobileNavDrawer from '@/components/MobileNavDrawer';
import Breadcrumbs from '@/components/Breadcrumbs';
import Footer from '@/components/Footer';
import { cn } from '@/lib/utils';

// Lazy load heavy components for better initial load performance
const Player = dynamic(() => import('@/components/Player'), {
  ssr: false,
  loading: () => (
    <div className="fixed bottom-0 left-0 right-0 bg-spotify-dark-gray border-t border-spotify-light-gray h-[90px] z-50" />
  ),
});

export default function LayoutContent({ children }: { children: React.ReactNode }) {
  const { leftSidebarWidth, rightSidebarOpen, rightSidebarWidth, setLeftSidebarCollapsed, setRightSidebarOpen } = useUIStore();
  const [isMobile, setIsMobile] = useState(false);
  
  // Handle narrow viewports (< 256px) - auto-collapse sidebars
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    
    const handleResize = () => {
      const viewportWidth = window.innerWidth;
      setIsMobile(viewportWidth < 768);
      
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      // If viewport is narrower than default sidebar width, auto-collapse
      if (viewportWidth < 256 && leftSidebarWidth >= 256) {
        setLeftSidebarCollapsed(true);
      }
<<<<<<< HEAD

=======
      
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      // Close right sidebar on very narrow viewports
      if (viewportWidth < 400 && rightSidebarOpen) {
        setRightSidebarOpen(false);
      }
    };
<<<<<<< HEAD

    // Check on mount
    handleResize();

    // Listen for resize events
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [
    leftSidebarWidth,
    rightSidebarOpen,
    setLeftSidebarCollapsed,
    setRightSidebarOpen,
  ]);

  return (
    <div className="flex h-screen bg-[#000000] overflow-hidden">
      <Sidebar />
      {/* TopBar - Fixed at top level, independent of scrollable content */}
      <TopBar />
      <div
        className="flex-1 flex flex-col transition-all duration-300 ease-in-out"
        style={{
          marginLeft: `${leftSidebarWidth + 1}px`,
          marginRight: rightSidebarOpen ? `${rightSidebarWidth + 1}px` : "1px",
          backgroundColor: "#121212",
        }}
      >
        {/* Skip to main content link for keyboard accessibility */}
        <a
          href="#main-content"
=======
    
    // Check on mount
    handleResize();
    
    // Listen for resize events
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [leftSidebarWidth, rightSidebarOpen, setLeftSidebarCollapsed, setRightSidebarOpen]);
  
  return (
    <div className="flex h-screen bg-[#000000] overflow-hidden">
      <Sidebar />
      <MobileNavDrawer />
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
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
          className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:bg-spotify-green focus:text-black focus:rounded-md focus:font-semibold focus:outline-none focus:ring-2 focus:ring-white"
          aria-label="Skip to main content"
        >
          Skip to main content
        </a>
<<<<<<< HEAD
        <main
          id="main-content"
          className="flex-1 flex flex-col overflow-y-auto bg-[#121212]"
          style={{ paddingTop: "56px", paddingBottom: "90px" }}
        >
=======
        <main id="main-content" className="flex-1 flex flex-col overflow-y-auto bg-[#121212]" style={{
          paddingTop: '56px',
          paddingBottom: isMobile ? '60px' : '90px'
        }}>
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
          <div className="flex-1 w-full">
            <Breadcrumbs />
            {children}
          </div>
          <Footer />
        </main>
      </div>
      <RightSidebar />
<<<<<<< HEAD
      <Player />
=======
      <Suspense fallback={<div className="fixed bottom-0 left-0 right-0 bg-spotify-dark-gray border-t border-spotify-light-gray h-[90px] z-50" />}>
        <Player />
      </Suspense>
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    </div>
  );
}
