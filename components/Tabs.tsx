'use client';

import React, { useState, useId } from 'react';
import { cn } from '@/lib/utils';

/**
 * Tabs Component - Tabbed navigation with keyboard support and URL hash integration
 * 
 * Design System Specifications:
 * - Horizontal and vertical variants
 * - Keyboard navigation (Arrow keys, Home, End)
 * - Optional URL hash support for deep linking
 * - Active tab indicator with smooth transition
 * - Accessibility: ARIA tabs pattern compliant
 * 
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

export type TabsOrientation = 'horizontal' | 'vertical';

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

const TabsContext = React.createContext<TabsContextValue | undefined>(undefined);

export interface TabsProps {
  /**
   * Default active tab value
   */
  defaultValue?: string;
  
  /**
   * Controlled active tab value
   */
  value?: string;
  
  /**
   * Change handler (controlled mode)
   */
  onValueChange?: (value: string) => void;
  
  /**
   * Tab orientation
   * @default 'horizontal'
   */
  orientation?: TabsOrientation;
  
  /**
   * Enable URL hash support (updates URL hash when tab changes)
   * @default false
   */
  hashSupport?: boolean;
  
  /**
   * Tabs content (children)
   */
  children: React.ReactNode;
  
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
  orientation = 'horizontal',
  hashSupport = false,
  children,
  className,
}) => {
  const tabsId = useId();
  const [internalValue, setInternalValue] = useState(defaultValue || '');
  
  // Use controlled or uncontrolled value
  const activeTab = controlledValue !== undefined ? controlledValue : internalValue;
  
  const setActiveTab = (newValue: string) => {
    if (controlledValue === undefined) {
      setInternalValue(newValue);
    }
    onValueChange?.(newValue);
    
    // Update URL hash if enabled
    if (hashSupport && typeof window !== 'undefined') {
      window.history.replaceState(null, '', `#${newValue}`);
    }
  };
  
  // Initialize from URL hash if hashSupport is enabled
  React.useEffect(() => {
    if (hashSupport && typeof window !== 'undefined') {
      const hash = window.location.hash.slice(1);
      if (hash && !controlledValue && !defaultValue) {
        setActiveTab(hash);
      }
    }
  }, [hashSupport]);
  
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
          'w-full',
          orientation === 'vertical' && 'flex gap-4',
          className
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
    throw new Error('Tabs.Trigger must be used within Tabs');
  }
  
  const { activeTab, setActiveTab, orientation, tabsId } = context;
  const isActive = activeTab === value;
  const triggerId = `${tabsId}-trigger-${value}`;
  const panelId = `${tabsId}-panel-${value}`;
  
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
        e.preventDefault();
        nextIndex = triggers.length - 1;
        break;
    }
    
    if (nextIndex !== currentIndex) {
      const nextTrigger = triggers[nextIndex];
      const nextValue = nextTrigger.getAttribute('data-value');
      if (nextValue) {
        setActiveTab(nextValue);
        nextTrigger.focus();
      }
    }
  };
  
  return (
    <button
      id={triggerId}
      role="tab"
      type="button"
      aria-selected={isActive ? 'true' : 'false'}
      aria-controls={panelId}
      aria-disabled={disabled ? 'true' : 'false'}
      disabled={disabled}
      onClick={() => !disabled && setActiveTab(value)}
      onKeyDown={handleKeyDown}
      data-value={value}
      className={cn(
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
    throw new Error('Tabs.Content must be used within Tabs');
  }
  
  const { activeTab, tabsId } = context;
  const isActive = activeTab === value;
  const triggerId = `${tabsId}-trigger-${value}`;
  const panelId = `${tabsId}-panel-${value}`;
  
  if (!isActive) return null;
  
  return (
    <div
      id={panelId}
      role="tabpanel"
      aria-labelledby={triggerId}
      tabIndex={0}
      className={cn(
        'outline-none focus:ring-2 focus:ring-spotify-green focus:ring-offset-2 focus:ring-offset-spotify-dark rounded',
        className
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
