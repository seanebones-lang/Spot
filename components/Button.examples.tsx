/**
 * Button Component - Usage Examples
 * 
 * This file demonstrates all variants, sizes, and states of the Button component.
 * Use this as a reference when implementing buttons throughout the application.
 */

'use client';

import React from 'react';
import Button from './Button';
import { Play, Download, Settings, Trash2, Check, ArrowRight } from 'lucide-react';

/**
 * Example 1: Primary Button (Default - Most Common)
 * 
 * Use for primary actions like "Get Started", "Subscribe", "Save", etc.
 */
export function PrimaryButtonExample() {
  return (
    <div className="flex gap-4">
      <Button variant="primary" size="sm">Small Primary</Button>
      <Button variant="primary" size="md">Medium Primary</Button>
      <Button variant="primary" size="lg">Large Primary</Button>
    </div>
  );
}

/**
 * Example 2: Secondary Button (Outlined)
 * 
 * Use for secondary actions or when you want less visual weight.
 * Common in forms: "Cancel", "Back", "Learn More"
 */
export function SecondaryButtonExample() {
  return (
    <div className="flex gap-4">
      <Button variant="secondary" size="sm">Small Secondary</Button>
      <Button variant="secondary" size="md">Medium Secondary</Button>
      <Button variant="secondary" size="lg">Large Secondary</Button>
    </div>
  );
}

/**
 * Example 3: Tertiary Button (Muted)
 * 
 * Use for less important actions or when placed on lighter backgrounds.
 */
export function TertiaryButtonExample() {
  return (
    <div className="flex gap-4">
      <Button variant="tertiary" size="sm">Small Tertiary</Button>
      <Button variant="tertiary" size="md">Medium Tertiary</Button>
      <Button variant="tertiary" size="lg">Large Tertiary</Button>
    </div>
  );
}

/**
 * Example 4: Ghost Button (Transparent)
 * 
 * Use in headers, toolbars, or when button needs minimal visual presence.
 */
export function GhostButtonExample() {
  return (
    <div className="flex gap-4">
      <Button variant="ghost" size="sm">Small Ghost</Button>
      <Button variant="ghost" size="md">Medium Ghost</Button>
      <Button variant="ghost" size="lg">Large Ghost</Button>
    </div>
  );
}

/**
 * Example 5: Danger Button (Destructive Actions)
 * 
 * Use for destructive actions like "Delete", "Remove", "Clear All".
 * Red color indicates caution.
 */
export function DangerButtonExample() {
  return (
    <div className="flex gap-4">
      <Button variant="danger" size="sm">Delete</Button>
      <Button variant="danger" size="md">Remove Item</Button>
      <Button variant="danger" size="lg">Clear All</Button>
    </div>
  );
}

/**
 * Example 6: Buttons with Icons
 * 
 * Icons can be placed before or after text.
 */
export function IconButtonExample() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <Button variant="primary" icon={Play}>Play Now</Button>
        <Button variant="secondary" icon={Download}>Download</Button>
        <Button variant="ghost" icon={Settings}>Settings</Button>
      </div>
      
      <div className="flex gap-4">
        <Button variant="primary" iconRight={ArrowRight}>Next</Button>
        <Button variant="secondary" iconRight={Check}>Confirm</Button>
        <Button variant="danger" icon={Trash2}>Delete</Button>
      </div>
    </div>
  );
}

/**
 * Example 7: Loading State
 * 
 * Shows spinner and disables interaction during async operations.
 */
export function LoadingButtonExample() {
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  
  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
  };
  
  return (
    <div className="flex gap-4">
      <Button 
        variant="primary" 
        loading={isSubmitting}
        onClick={handleSubmit}
      >
        Submit Form
      </Button>
      
      <Button 
        variant="secondary" 
        loading={isSubmitting}
        onClick={handleSubmit}
      >
        Processing...
      </Button>
    </div>
  );
}

/**
 * Example 8: Disabled State
 * 
 * Use when action is not available (missing data, permissions, etc.)
 */
export function DisabledButtonExample() {
  return (
    <div className="flex gap-4">
      <Button variant="primary" disabled>Disabled Primary</Button>
      <Button variant="secondary" disabled>Disabled Secondary</Button>
      <Button variant="tertiary" disabled>Disabled Tertiary</Button>
      <Button variant="danger" disabled>Disabled Danger</Button>
    </div>
  );
}

/**
 * Example 9: Full Width Buttons
 * 
 * Use for mobile layouts or when button should span full container width.
 */
export function FullWidthButtonExample() {
  return (
    <div className="max-w-md space-y-4">
      <Button variant="primary" fullWidth>Full Width Primary</Button>
      <Button variant="secondary" fullWidth>Full Width Secondary</Button>
      <Button variant="tertiary" fullWidth>Full Width Tertiary</Button>
    </div>
  );
}

/**
 * Example 10: Real-World Use Cases
 * 
 * Common button patterns used throughout the application.
 */
export function RealWorldExamples() {
  return (
    <div className="space-y-6 p-8">
      {/* Subscription Page */}
      <div>
        <h3 className="text-white mb-4">Subscription Page</h3>
        <div className="flex gap-4">
          <Button variant="primary" size="lg">Get Premium</Button>
          <Button variant="secondary" size="lg">Learn More</Button>
        </div>
      </div>
      
      {/* Form Actions */}
      <div>
        <h3 className="text-white mb-4">Form Actions</h3>
        <div className="flex gap-4">
          <Button variant="primary" type="submit">Save Changes</Button>
          <Button variant="tertiary" type="button">Cancel</Button>
        </div>
      </div>
      
      {/* Player Controls (Example) */}
      <div>
        <h3 className="text-white mb-4">Media Actions</h3>
        <div className="flex gap-4">
          <Button variant="primary" icon={Play}>Play</Button>
          <Button variant="secondary" icon={Download}>Download</Button>
        </div>
      </div>
      
      {/* Settings Page */}
      <div>
        <h3 className="text-white mb-4">Settings Actions</h3>
        <div className="flex gap-4">
          <Button variant="primary">Save Preferences</Button>
          <Button variant="danger">Delete Account</Button>
        </div>
      </div>
      
      {/* Mobile Layout */}
      <div>
        <h3 className="text-white mb-4">Mobile Layout (Full Width)</h3>
        <div className="max-w-sm space-y-3">
          <Button variant="primary" fullWidth>Sign Up</Button>
          <Button variant="secondary" fullWidth>Sign In</Button>
        </div>
      </div>
    </div>
  );
}

/**
 * Example 11: All Variants Comparison
 * 
 * Side-by-side comparison of all variants and sizes.
 */
export function AllVariantsComparison() {
  const variants: Array<{ variant: 'primary' | 'secondary' | 'tertiary' | 'ghost' | 'danger'; label: string }> = [
    { variant: 'primary', label: 'Primary' },
    { variant: 'secondary', label: 'Secondary' },
    { variant: 'tertiary', label: 'Tertiary' },
    { variant: 'ghost', label: 'Ghost' },
    { variant: 'danger', label: 'Danger' },
  ];
  
  const sizes: Array<'sm' | 'md' | 'lg'> = ['sm', 'md', 'lg'];
  
  return (
    <div className="space-y-8 p-8">
      {variants.map(({ variant, label }) => (
        <div key={variant}>
          <h3 className="text-white mb-4">{label} Variant</h3>
          <div className="flex gap-4 items-center">
            {sizes.map(size => (
              <Button key={size} variant={variant} size={size}>
                {label} {size.toUpperCase()}
              </Button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// Export all examples for easy reference
export default {
  PrimaryButtonExample,
  SecondaryButtonExample,
  TertiaryButtonExample,
  GhostButtonExample,
  DangerButtonExample,
  IconButtonExample,
  LoadingButtonExample,
  DisabledButtonExample,
  FullWidthButtonExample,
  RealWorldExamples,
  AllVariantsComparison,
};
