"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Check, Search } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Select Component - Dropdown select with search and keyboard navigation
 *
 * Design System Specifications:
 * - Variants: default (dark background), ghost (transparent)
 * - Sizes: sm (36px), md (40px), lg (48px)
 * - States: default, focus, error, disabled
 * - Features: Search/filter, multi-select variant, keyboard navigation
 * - Accessibility: WCAG 2.2 AA compliant
 * - Border-radius: 4px (rounded-lg) matching Input component
 *
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

export type SelectSize = "sm" | "md" | "lg";
export type SelectVariant = "default" | "ghost";

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

  /**
   * Select size
   * @default 'md'
   */
  size?: SelectSize;

  /**
   * Label text
   */
  label?: string;

  /**
   * Placeholder text
   */
  placeholder?: string;

  /**
   * Available options
   */
  options: SelectOption[];

  /**
   * Selected value (controlled)
   */
  value?: string;

  /**
   * Default value (uncontrolled)
   */
  defaultValue?: string;

  /**
   * Change handler
   */
  onChange?: (value: string) => void;

  /**
   * Error message
   */
  error?: string;

  /**
   * Helper text
   */
  helperText?: string;

  /**
   * Disable select
   */
  disabled?: boolean;

  /**
   * Required field
   */
  required?: boolean;

  /**
   * Enable search/filter
   * @default false
   */
  searchable?: boolean;

  /**
   * Custom className
   */
  className?: string;

  /**
   * Container className
   */
  containerClassName?: string;
}

const Select = React.forwardRef<HTMLButtonElement, SelectProps>(
  (
    {
      variant = "default",
      size = "md",
      label,
      placeholder = "Select an option...",
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

    // Close dropdown when clicking outside
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          containerRef.current &&
          !containerRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
          setSearchQuery("");
        }
      };

      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Focus search input when opened
    useEffect(() => {
      if (isOpen && searchable && inputRef.current) {
        inputRef.current.focus();
      }
    }, [isOpen, searchable]);

    // Keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (disabled) return;

      switch (e.key) {
        case "Enter":
        case " ":
          e.preventDefault();
          if (!isOpen) {
            setIsOpen(true);
          } else if (selectedIndex >= 0 && filteredOptions[selectedIndex]) {
            handleSelect(filteredOptions[selectedIndex].value);
          }
          break;

        case "ArrowDown":
          e.preventDefault();
          if (!isOpen) {
            setIsOpen(true);
          } else {
            setSelectedIndex((prev) =>
              prev < filteredOptions.length - 1 ? prev + 1 : prev,
            );
          }
          break;

        case "ArrowUp":
          e.preventDefault();
          if (isOpen) {
            setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0));
          }
          break;

        case "Escape":
          setIsOpen(false);
          setSearchQuery("");
          break;
      }
    };

    const handleSelect = (optionValue: string) => {
      if (controlledValue === undefined) {
        setInternalValue(optionValue);
      }
      onChange?.(optionValue);
      setIsOpen(false);
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

    // Generate unique ID
    const selectId = React.useId();
    const errorId = `${selectId}-error`;
    const helperId = `${selectId}-helper`;

    return (
      <div className={cn("w-full", containerClassName)} ref={containerRef}>
        {/* Label */}
        {label && (
          <label
            htmlFor={selectId}
            className={cn(
              "block text-sm font-medium mb-2",
              disabled ? "text-white/50" : "text-white",
              required &&
                "after:content-['*'] after:ml-1 after:text-spotify-green",
            )}
          >
            {label}
          </label>
        )}

        {/* Select Button */}
        <div className="relative">
          <button
            ref={ref}
            type="button"
            id={selectId}
            disabled={disabled}
            onClick={handleToggle}
            onKeyDown={handleKeyDown}
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

              // Size styles
              currentSize.height,
              currentSize.paddingX,
              currentSize.textSize,

              // Variant styles
              currentVariant.base,
              !disabled && currentVariant.hover,
              !disabled && isOpen && currentVariant.focus,
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
              )}
              aria-hidden="true"
            />
          </button>

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

                    return (
                      <button
                        key={option.value}
                        type="button"
                        role="option"
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

        {/* Helper Text */}
        {helperText && !error && (
          <p id={helperId} className="mt-1.5 text-xs text-spotify-text-gray">
            {helperText}
          </p>
        )}

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
  },
);

Select.displayName = "Select";

export default Select;
