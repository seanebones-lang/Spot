<<<<<<< HEAD
"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check, Search } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Select Component - Dropdown select with search and keyboard navigation
 *
=======
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * Select Component - Dropdown select with search and keyboard navigation
 * 
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
 * Design System Specifications:
 * - Variants: default (dark background), ghost (transparent)
 * - Sizes: sm (36px), md (40px), lg (48px)
 * - States: default, focus, error, disabled
 * - Features: Search/filter, multi-select variant, keyboard navigation
 * - Accessibility: WCAG 2.2 AA compliant
 * - Border-radius: 4px (rounded-lg) matching Input component
<<<<<<< HEAD
 *
=======
 * 
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
 * @example
 * ```tsx
 * <Select
 *   label="Genre"
 *   options={genres}
 *   value={selectedGenre}
 *   onChange={(value) => setSelectedGenre(value)}
 * />
 * ```
 */

<<<<<<< HEAD
export type SelectSize = "sm" | "md" | "lg";
export type SelectVariant = "default" | "ghost";
=======
export type SelectSize = 'sm' | 'md' | 'lg';
export type SelectVariant = 'default' | 'ghost';
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps {
  /**
   * Visual style variant
   * @default 'default'
   */
  variant?: SelectVariant;
<<<<<<< HEAD

=======
  
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  /**
   * Select size
   * @default 'md'
   */
  size?: SelectSize;
<<<<<<< HEAD

=======
  
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  /**
   * Label text
   */
  label?: string;
<<<<<<< HEAD

=======
  
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  /**
   * Placeholder text
   */
  placeholder?: string;
<<<<<<< HEAD

=======
  
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  /**
   * Available options
   */
  options: SelectOption[];
<<<<<<< HEAD

=======
  
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  /**
   * Selected value (controlled)
   */
  value?: string;
<<<<<<< HEAD

=======
  
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  /**
   * Default value (uncontrolled)
   */
  defaultValue?: string;
<<<<<<< HEAD

=======
  
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  /**
   * Change handler
   */
  onChange?: (value: string) => void;
<<<<<<< HEAD

=======
  
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  /**
   * Error message
   */
  error?: string;
<<<<<<< HEAD

=======
  
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  /**
   * Helper text
   */
  helperText?: string;
<<<<<<< HEAD

=======
  
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  /**
   * Disable select
   */
  disabled?: boolean;
<<<<<<< HEAD

=======
  
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  /**
   * Required field
   */
  required?: boolean;
<<<<<<< HEAD

=======
  
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  /**
   * Enable search/filter
   * @default false
   */
  searchable?: boolean;
<<<<<<< HEAD

=======
  
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  /**
   * Custom className
   */
  className?: string;
<<<<<<< HEAD

=======
  
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
  /**
   * Container className
   */
  containerClassName?: string;
}

const Select = React.forwardRef<HTMLButtonElement, SelectProps>(
  (
    {
<<<<<<< HEAD
      variant = "default",
      size = "md",
      label,
      placeholder = "Select an option...",
=======
      variant = 'default',
      size = 'md',
      label,
      placeholder = 'Select an option...',
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      options,
      value: controlledValue,
      defaultValue,
      onChange,
      error,
      helperText,
      disabled = false,
      required = false,
      searchable = false,
      className,
      containerClassName,
      ...props
    },
<<<<<<< HEAD
    ref,
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(-1);

    const containerRef = useRef<HTMLDivElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Use controlled or uncontrolled value
    const [internalValue, setInternalValue] = useState(defaultValue || "");
    const value =
      controlledValue !== undefined ? controlledValue : internalValue;

    const selectedOption = options.find((opt) => opt.value === value);

    // Size configurations
    const sizeConfig = {
      sm: {
        height: "h-9",
        paddingX: "px-3",
        paddingY: "py-2",
        textSize: "text-sm",
        iconSize: 18,
      },
      md: {
        height: "h-10",
        paddingX: "px-4",
        paddingY: "py-2",
        textSize: "text-sm",
        iconSize: 20,
      },
      lg: {
        height: "h-12",
        paddingX: "px-4",
        paddingY: "py-3",
        textSize: "text-base",
        iconSize: 22,
      },
    };

    const currentSize = sizeConfig[size];

    // Variant styles
    const variantStyles = {
      default: {
        base: "bg-spotify-dark-gray text-white border border-white/10",
        hover: "hover:border-white/20",
        focus:
          "focus:border-spotify-green focus:ring-2 focus:ring-spotify-green/20",
      },
      ghost: {
        base: "bg-transparent text-white border border-white/10",
        hover: "hover:border-white/20",
        focus:
          "focus:border-spotify-green focus:ring-2 focus:ring-spotify-green/20",
      },
    };

    const currentVariant = variantStyles[variant];

    // Filter options based on search
    const filteredOptions = searchable
      ? options.filter((opt) =>
          opt.label.toLowerCase().includes(searchQuery.toLowerCase()),
        )
      : options;

=======
    ref
  ) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedIndex, setSelectedIndex] = useState(-1);
    
    const containerRef = useRef<HTMLDivElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    
    // Use controlled or uncontrolled value
    const [internalValue, setInternalValue] = useState(defaultValue || '');
    const value = controlledValue !== undefined ? controlledValue : internalValue;
    
    const selectedOption = options.find((opt) => opt.value === value);
    
    // Size configurations
    const sizeConfig = {
      sm: {
        height: 'h-9',
        paddingX: 'px-3',
        paddingY: 'py-2',
        textSize: 'text-sm',
        iconSize: 18,
      },
      md: {
        height: 'h-10',
        paddingX: 'px-4',
        paddingY: 'py-2',
        textSize: 'text-sm',
        iconSize: 20,
      },
      lg: {
        height: 'h-12',
        paddingX: 'px-4',
        paddingY: 'py-3',
        textSize: 'text-base',
        iconSize: 22,
      },
    };
    
    const currentSize = sizeConfig[size];
    
    // Variant styles
    const variantStyles = {
      default: {
        base: 'bg-spotify-dark-gray text-white border border-white/10',
        hover: 'hover:border-white/20',
        focus: 'focus:border-spotify-green focus:ring-2 focus:ring-spotify-green/20',
      },
      ghost: {
        base: 'bg-transparent text-white border border-white/10',
        hover: 'hover:border-white/20',
        focus: 'focus:border-spotify-green focus:ring-2 focus:ring-spotify-green/20',
      },
    };
    
    const currentVariant = variantStyles[variant];
    
    // Filter options based on search
    const filteredOptions = searchable
      ? options.filter((opt) =>
          opt.label.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : options;
    
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    // Close dropdown when clicking outside
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
<<<<<<< HEAD
          setSearchQuery("");
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, []);

=======
          setSearchQuery('');
        }
      };
      
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    // Focus search input when opened
    useEffect(() => {
      if (isOpen && searchable && inputRef.current) {
        inputRef.current.focus();
      }
    }, [isOpen, searchable]);
<<<<<<< HEAD

    // Keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (disabled) return;

      switch (e.key) {
        case "Enter":
        case " ":
=======
    
    // Keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (disabled) return;
      
      switch (e.key) {
        case 'Enter':
        case ' ':
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
          e.preventDefault();
          if (!isOpen) {
            setIsOpen(true);
          } else if (selectedIndex >= 0 && filteredOptions[selectedIndex]) {
            handleSelect(filteredOptions[selectedIndex].value);
          }
          break;
<<<<<<< HEAD

        case "ArrowDown":
=======
          
        case 'ArrowDown':
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
          e.preventDefault();
          if (!isOpen) {
            setIsOpen(true);
          } else {
            setSelectedIndex((prev) =>
<<<<<<< HEAD
              prev < filteredOptions.length - 1 ? prev + 1 : prev,
            );
          }
          break;

        case "ArrowUp":
=======
              prev < filteredOptions.length - 1 ? prev + 1 : prev
            );
          }
          break;
          
        case 'ArrowUp':
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
          e.preventDefault();
          if (isOpen) {
            setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0));
          }
          break;
<<<<<<< HEAD

        case "Escape":
          setIsOpen(false);
          setSearchQuery("");
          break;
      }
    };

=======
          
        case 'Escape':
          setIsOpen(false);
          setSearchQuery('');
          break;
      }
    };
    
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    const handleSelect = (optionValue: string) => {
      if (controlledValue === undefined) {
        setInternalValue(optionValue);
      }
      onChange?.(optionValue);
      setIsOpen(false);
<<<<<<< HEAD
      setSearchQuery("");
      setSelectedIndex(-1);
    };

    const handleToggle = () => {
      if (!disabled) {
        setIsOpen(!isOpen);
        setSearchQuery("");
        setSelectedIndex(-1);
      }
    };

=======
      setSearchQuery('');
      setSelectedIndex(-1);
    };
    
    const handleToggle = () => {
      if (!disabled) {
        setIsOpen(!isOpen);
        setSearchQuery('');
        setSelectedIndex(-1);
      }
    };
    
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
    // Generate unique ID
    const selectId = React.useId();
    const errorId = `${selectId}-error`;
    const helperId = `${selectId}-helper`;
<<<<<<< HEAD

    return (
      <div className={cn("w-full", containerClassName)} ref={containerRef}>
=======
    
    return (
      <div className={cn('w-full', containerClassName)} ref={containerRef}>
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
        {/* Label */}
        {label && (
          <label
            htmlFor={selectId}
            className={cn(
<<<<<<< HEAD
              "block text-sm font-medium mb-2",
              disabled ? "text-white/50" : "text-white",
              required &&
                "after:content-['*'] after:ml-1 after:text-spotify-green",
=======
              'block text-sm font-medium mb-2',
              disabled ? 'text-white/50' : 'text-white',
              required && "after:content-['*'] after:ml-1 after:text-spotify-green"
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
            )}
          >
            {label}
          </label>
        )}
<<<<<<< HEAD

=======
        
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
        {/* Select Button */}
        <div className="relative">
          <button
            ref={ref}
            type="button"
            id={selectId}
            disabled={disabled}
            onClick={handleToggle}
            onKeyDown={handleKeyDown}
<<<<<<< HEAD
            aria-haspopup="listbox"
            aria-expanded={isOpen ? "true" : "false"}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={
              error ? errorId : helperText ? helperId : undefined
            }
            className={cn(
              "w-full rounded-lg font-circular",
              "flex items-center justify-between gap-2",
              "transition-all duration-200 ease-in-out",
              "disabled:pointer-events-none",
              "outline-none text-left",

=======
              aria-haspopup="listbox"
              aria-expanded={isOpen ? 'true' : 'false'}
              aria-invalid={error ? 'true' : 'false'}
            aria-describedby={error ? errorId : helperText ? helperId : undefined}
            className={cn(
              'w-full rounded-lg font-circular',
              'flex items-center justify-between gap-2',
              'transition-all duration-200 ease-in-out',
              'disabled:pointer-events-none',
              'outline-none text-left',
              
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
              // Size styles
              currentSize.height,
              currentSize.paddingX,
              currentSize.textSize,
<<<<<<< HEAD

=======
              
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
              // Variant styles
              currentVariant.base,
              !disabled && currentVariant.hover,
              !disabled && isOpen && currentVariant.focus,
<<<<<<< HEAD
              error &&
                "border-empulse-red focus:border-empulse-red focus:ring-empulse-red/20",

              // Disabled state
              disabled &&
                "bg-spotify-dark-gray/50 text-white/50 cursor-not-allowed border-white/5",

              className,
            )}
            {...props}
          >
            <span
              className={cn(
                "flex-1 truncate",
                !selectedOption && "text-spotify-text-gray/60",
              )}
            >
              {selectedOption ? selectedOption.label : placeholder}
            </span>

            <ChevronDown
              size={currentSize.iconSize}
              className={cn(
                "flex-shrink-0 text-spotify-text-gray transition-transform duration-200",
                isOpen && "rotate-180",
                disabled && "opacity-50",
=======
              error && 'border-empulse-red focus:border-empulse-red focus:ring-empulse-red/20',
              
              // Disabled state
              disabled &&
                'bg-spotify-dark-gray/50 text-white/50 cursor-not-allowed border-white/5',
              
              className
            )}
            {...props}
          >
            <span className={cn('flex-1 truncate', !selectedOption && 'text-spotify-text-gray/60')}>
              {selectedOption ? selectedOption.label : placeholder}
            </span>
            
            <ChevronDown
              size={currentSize.iconSize}
              className={cn(
                'flex-shrink-0 text-spotify-text-gray transition-transform duration-200',
                isOpen && 'rotate-180',
                disabled && 'opacity-50'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
              )}
              aria-hidden="true"
            />
          </button>
<<<<<<< HEAD

=======
          
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
          {/* Dropdown */}
          {isOpen && !disabled && (
            <div
              ref={dropdownRef}
              className="absolute z-50 w-full mt-1 bg-spotify-dark-gray border border-white/10 rounded-lg shadow-lg overflow-hidden"
              role="listbox"
            >
              {/* Search Input */}
              {searchable && (
                <div className="p-2 border-b border-white/10">
                  <div className="relative">
                    <Search
                      size={16}
                      className="absolute left-2 top-1/2 -translate-y-1/2 text-spotify-text-gray pointer-events-none"
                      aria-hidden="true"
                    />
                    <input
                      ref={inputRef}
                      type="text"
                      value={searchQuery}
                      onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setSelectedIndex(-1);
                      }}
                      placeholder="Search options..."
                      className="w-full pl-8 pr-3 py-1.5 bg-spotify-light-gray border border-white/10 rounded text-sm text-white placeholder:text-spotify-text-gray/60 focus:outline-none focus:border-spotify-green"
                      aria-label="Search options"
                    />
                  </div>
                </div>
              )}
<<<<<<< HEAD

=======
              
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
              {/* Options List */}
              <div className="max-h-60 overflow-y-auto">
                {filteredOptions.length === 0 ? (
                  <div className="px-4 py-3 text-sm text-spotify-text-gray text-center">
                    No options found
                  </div>
                ) : (
                  filteredOptions.map((option, index) => {
                    const isSelected = option.value === value;
                    const isFocused = index === selectedIndex;
<<<<<<< HEAD

=======
                    
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                    return (
                      <button
                        key={option.value}
                        type="button"
                        role="option"
<<<<<<< HEAD
                        aria-selected={isSelected ? "true" : "false"}
                        disabled={option.disabled}
                        onClick={() =>
                          !option.disabled && handleSelect(option.value)
                        }
                        className={cn(
                          "w-full px-4 py-2 text-left text-sm transition-colors",
                          "flex items-center justify-between gap-2",
                          isFocused && "bg-spotify-light-gray",
                          isSelected && "bg-spotify-light-gray/50",
                          !isSelected &&
                            !isFocused &&
                            "hover:bg-spotify-light-gray/30",
                          option.disabled &&
                            "opacity-50 cursor-not-allowed hover:bg-transparent",
                          isSelected ? "text-white" : "text-spotify-text-gray",
=======
                        aria-selected={isSelected ? 'true' : 'false'}
                        disabled={option.disabled}
                        onClick={() => !option.disabled && handleSelect(option.value)}
                        className={cn(
                          'w-full px-4 py-2 text-left text-sm transition-colors',
                          'flex items-center justify-between gap-2',
                          isFocused && 'bg-spotify-light-gray',
                          isSelected && 'bg-spotify-light-gray/50',
                          !isSelected && !isFocused && 'hover:bg-spotify-light-gray/30',
                          option.disabled &&
                            'opacity-50 cursor-not-allowed hover:bg-transparent',
                          isSelected ? 'text-white' : 'text-spotify-text-gray'
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
                        )}
                      >
                        <span className="flex-1 truncate">{option.label}</span>
                        {isSelected && (
                          <Check
                            size={16}
                            className="flex-shrink-0 text-spotify-green"
                            aria-hidden="true"
                          />
                        )}
                      </button>
                    );
                  })
                )}
              </div>
            </div>
          )}
        </div>
<<<<<<< HEAD

=======
        
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
        {/* Helper Text */}
        {helperText && !error && (
          <p id={helperId} className="mt-1.5 text-xs text-spotify-text-gray">
            {helperText}
          </p>
        )}
<<<<<<< HEAD

=======
        
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
        {/* Error Message */}
        {error && (
          <p
            id={errorId}
            className="mt-1.5 text-xs text-empulse-red flex items-center gap-1.5"
            role="alert"
          >
            <span>{error}</span>
          </p>
        )}
      </div>
    );
<<<<<<< HEAD
  },
);

Select.displayName = "Select";
=======
  }
);

Select.displayName = 'Select';
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e

export default Select;
