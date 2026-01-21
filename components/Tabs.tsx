<<<<<<< HEAD
"use client";

import React, { useState, useId } from "react";
import { cn } from "@/lib/utils";

/**
 * Tabs Component - Tabbed navigation with keyboard support and URL hash integration
 *
=======
'use client';

import React, { useState, useId } from 'react';
import { cn } from '@/lib/utils';

/**
 * Tabs Component - Tabbed navigation with keyboard support and URL hash integration
 * 
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
 * Design System Specifications:
 * - Horizontal and vertical variants
 * - Keyboard navigation (Arrow keys, Home, End)
 * - Optional URL hash support for deep linking
 * - Active tab indicator with smooth transition
 * - Accessibility: ARIA tabs pattern compliant
<<<<<<< HEAD
 *
=======
 * 
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
 * @example
 * ```tsx
 * <Tabs defaultValue="tab1">
 *   <Tabs.List>
 *     <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
 *     <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
 *   </Tabs.List>
 *   <Tabs.Content value="tab1">Content 1</Tabs.Content>
 *   <Tabs.Content value="tab2">Content 2</Tabs.Content>
 * </Tabs>
 * ```
 */

<<<<<<< HEAD
export type TabsOrientation = "horizontal" | "vertical";
=======
export type TabsOrientation = 'horizontal' | 'vertical';
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e

export interface Tab {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface TabsContextValue {
  activeTab: string;
  setActiveTab: (value: string) => void;
  orientation: TabsOrientation;
  tabsId: string;
}

<<<<<<< HEAD
const TabsContext = React.createContext<TabsContextValue | undefined>(
  undefined,
);
=======
const TabsContext = React.createContext<TabsContextValue | undefined>(undefined);
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e

export interface TabsProps {
  /**
   * Default active tab value
   */
  defaultValue?: string;
<<<<<<< HEAD

=======
  
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  /**
   * Controlled active tab value
   */
  value?: string;
<<<<<<< HEAD

=======
  
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  /**
   * Change handler (controlled mode)
   */
  onValueChange?: (value: string) => void;
<<<<<<< HEAD

=======
  
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  /**
   * Tab orientation
   * @default 'horizontal'
   */
  orientation?: TabsOrientation;
<<<<<<< HEAD

=======
  
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  /**
   * Enable URL hash support (updates URL hash when tab changes)
   * @default false
   */
  hashSupport?: boolean;
<<<<<<< HEAD

=======
  
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  /**
   * Tabs content (children)
   */
  children: React.ReactNode;
<<<<<<< HEAD

=======
  
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  /**
   * Container className
   */
  className?: string;
}

/**
 * Tabs Root Component
 */
const TabsRoot: React.FC<TabsProps> = ({
  defaultValue,
  value: controlledValue,
  onValueChange,
<<<<<<< HEAD
  orientation = "horizontal",
=======
  orientation = 'horizontal',
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  hashSupport = false,
  children,
  className,
}) => {
  const tabsId = useId();
<<<<<<< HEAD
  const [internalValue, setInternalValue] = useState(defaultValue || "");

  // Use controlled or uncontrolled value
  const activeTab =
    controlledValue !== undefined ? controlledValue : internalValue;

=======
  const [internalValue, setInternalValue] = useState(defaultValue || '');
  
  // Use controlled or uncontrolled value
  const activeTab = controlledValue !== undefined ? controlledValue : internalValue;
  
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  const setActiveTab = (newValue: string) => {
    if (controlledValue === undefined) {
      setInternalValue(newValue);
    }
    onValueChange?.(newValue);
<<<<<<< HEAD

    // Update URL hash if enabled
    if (hashSupport && typeof window !== "undefined") {
      window.history.replaceState(null, "", `#${newValue}`);
    }
  };

  // Initialize from URL hash if hashSupport is enabled
  React.useEffect(() => {
    if (hashSupport && typeof window !== "undefined") {
=======
    
    // Update URL hash if enabled
    if (hashSupport && typeof window !== 'undefined') {
      window.history.replaceState(null, '', `#${newValue}`);
    }
  };
  
  // Initialize from URL hash if hashSupport is enabled
  React.useEffect(() => {
    if (hashSupport && typeof window !== 'undefined') {
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      const hash = window.location.hash.slice(1);
      if (hash && !controlledValue && !defaultValue) {
        setActiveTab(hash);
      }
    }
  }, [hashSupport]);
<<<<<<< HEAD

=======
  
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  return (
    <TabsContext.Provider
      value={{
        activeTab,
        setActiveTab,
        orientation,
        tabsId,
      }}
    >
      <div
        className={cn(
<<<<<<< HEAD
          "w-full",
          orientation === "vertical" && "flex gap-4",
          className,
=======
          'w-full',
          orientation === 'vertical' && 'flex gap-4',
          className
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
        )}
      >
        {children}
      </div>
    </TabsContext.Provider>
  );
};

/**
 * Tabs List - Container for tab triggers
 */
export interface TabsListProps {
  children: React.ReactNode;
  className?: string;
}

const TabsList: React.FC<TabsListProps> = ({ children, className }) => {
  const context = React.useContext(TabsContext);
  if (!context) {
<<<<<<< HEAD
    throw new Error("Tabs.List must be used within Tabs");
  }

  const { orientation, tabsId } = context;

  return (
    <div
      role="tablist"
      aria-orientation={
        orientation === "horizontal" ? "horizontal" : "vertical"
      }
      id={`${tabsId}-list`}
      className={cn(
        "flex gap-1",
        orientation === "horizontal" ? "flex-row" : "flex-col",
        "border-b border-white/10",
        orientation === "vertical" && "border-b-0 border-r pr-4 min-w-[200px]",
        className,
=======
    throw new Error('Tabs.List must be used within Tabs');
  }
  
  const { orientation, tabsId } = context;
  
  return (
    <div
      role="tablist"
      aria-orientation={orientation === 'horizontal' ? 'horizontal' : 'vertical'}
      id={`${tabsId}-list`}
      className={cn(
        'flex gap-1',
        orientation === 'horizontal' ? 'flex-row' : 'flex-col',
        'border-b border-white/10',
        orientation === 'vertical' && 'border-b-0 border-r pr-4 min-w-[200px]',
        className
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      )}
    >
      {children}
    </div>
  );
};

/**
 * Tab Trigger - Individual tab button
 */
export interface TabsTriggerProps {
  value: string;
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
}

const TabsTrigger: React.FC<TabsTriggerProps> = ({
  value,
  children,
  disabled = false,
  className,
}) => {
  const context = React.useContext(TabsContext);
  if (!context) {
<<<<<<< HEAD
    throw new Error("Tabs.Trigger must be used within Tabs");
  }

=======
    throw new Error('Tabs.Trigger must be used within Tabs');
  }
  
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  const { activeTab, setActiveTab, orientation, tabsId } = context;
  const isActive = activeTab === value;
  const triggerId = `${tabsId}-trigger-${value}`;
  const panelId = `${tabsId}-panel-${value}`;
<<<<<<< HEAD

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;

    const triggers = Array.from(
      document.querySelectorAll<HTMLElement>(
        `[role="tab"][id^="${tabsId}-trigger"]:not([aria-disabled="true"])`,
      ),
    );
    const currentIndex = triggers.findIndex((t) => t.id === triggerId);

    let nextIndex = currentIndex;

    switch (e.key) {
      case "ArrowRight":
      case "ArrowDown":
        e.preventDefault();
        nextIndex = (currentIndex + 1) % triggers.length;
        break;
      case "ArrowLeft":
      case "ArrowUp":
        e.preventDefault();
        nextIndex = currentIndex === 0 ? triggers.length - 1 : currentIndex - 1;
        break;
      case "Home":
        e.preventDefault();
        nextIndex = 0;
        break;
      case "End":
=======
  
  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    
    const triggers = Array.from(
      document.querySelectorAll<HTMLElement>(
        `[role="tab"][id^="${tabsId}-trigger"]:not([aria-disabled="true"])`
      )
    );
    const currentIndex = triggers.findIndex((t) => t.id === triggerId);
    
    let nextIndex = currentIndex;
    
    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowDown':
        e.preventDefault();
        nextIndex = (currentIndex + 1) % triggers.length;
        break;
      case 'ArrowLeft':
      case 'ArrowUp':
        e.preventDefault();
        nextIndex = currentIndex === 0 ? triggers.length - 1 : currentIndex - 1;
        break;
      case 'Home':
        e.preventDefault();
        nextIndex = 0;
        break;
      case 'End':
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
        e.preventDefault();
        nextIndex = triggers.length - 1;
        break;
    }
<<<<<<< HEAD

    if (nextIndex !== currentIndex) {
      const nextTrigger = triggers[nextIndex];
      const nextValue = nextTrigger.getAttribute("data-value");
=======
    
    if (nextIndex !== currentIndex) {
      const nextTrigger = triggers[nextIndex];
      const nextValue = nextTrigger.getAttribute('data-value');
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      if (nextValue) {
        setActiveTab(nextValue);
        nextTrigger.focus();
      }
    }
  };
<<<<<<< HEAD

=======
  
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  return (
    <button
      id={triggerId}
      role="tab"
      type="button"
<<<<<<< HEAD
      aria-selected={isActive ? "true" : "false"}
      aria-controls={panelId}
      aria-disabled={disabled ? "true" : "false"}
=======
      aria-selected={isActive ? 'true' : 'false'}
      aria-controls={panelId}
      aria-disabled={disabled ? 'true' : 'false'}
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      disabled={disabled}
      onClick={() => !disabled && setActiveTab(value)}
      onKeyDown={handleKeyDown}
      data-value={value}
      className={cn(
<<<<<<< HEAD
        "px-4 py-2 text-sm font-medium rounded-t-lg",
        "transition-all duration-200 ease-in-out",
        "border-b-2 border-transparent",
        "focus:outline-none focus:ring-2 focus:ring-spotify-green focus:ring-offset-2 focus:ring-offset-spotify-dark",
        disabled
          ? "opacity-50 cursor-not-allowed text-spotify-text-gray"
          : isActive
            ? "text-white border-spotify-green bg-spotify-light-gray/30"
            : "text-spotify-text-gray hover:text-white hover:bg-spotify-light-gray/20",
        className,
=======
        'px-4 py-2 text-sm font-medium rounded-t-lg',
        'transition-all duration-200 ease-in-out',
        'border-b-2 border-transparent',
        'focus:outline-none focus:ring-2 focus:ring-spotify-green focus:ring-offset-2 focus:ring-offset-spotify-dark',
        disabled
          ? 'opacity-50 cursor-not-allowed text-spotify-text-gray'
          : isActive
          ? 'text-white border-spotify-green bg-spotify-light-gray/30'
          : 'text-spotify-text-gray hover:text-white hover:bg-spotify-light-gray/20',
        className
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      )}
    >
      {children}
    </button>
  );
};

/**
 * Tab Content - Tab panel content
 */
export interface TabsContentProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

const TabsContent: React.FC<TabsContentProps> = ({
  value,
  children,
  className,
}) => {
  const context = React.useContext(TabsContext);
  if (!context) {
<<<<<<< HEAD
    throw new Error("Tabs.Content must be used within Tabs");
  }

=======
    throw new Error('Tabs.Content must be used within Tabs');
  }
  
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  const { activeTab, tabsId } = context;
  const isActive = activeTab === value;
  const triggerId = `${tabsId}-trigger-${value}`;
  const panelId = `${tabsId}-panel-${value}`;
<<<<<<< HEAD

  if (!isActive) return null;

=======
  
  if (!isActive) return null;
  
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  return (
    <div
      id={panelId}
      role="tabpanel"
      aria-labelledby={triggerId}
      tabIndex={0}
      className={cn(
<<<<<<< HEAD
        "outline-none focus:ring-2 focus:ring-spotify-green focus:ring-offset-2 focus:ring-offset-spotify-dark rounded",
        className,
=======
        'outline-none focus:ring-2 focus:ring-spotify-green focus:ring-offset-2 focus:ring-offset-spotify-dark rounded',
        className
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      )}
    >
      {children}
    </div>
  );
};

// Export Tabs component with subcomponents
export const Tabs = Object.assign(TabsRoot, {
  List: TabsList,
  Trigger: TabsTrigger,
  Content: TabsContent,
});

export default Tabs;
