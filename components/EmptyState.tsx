<<<<<<< HEAD
"use client";

import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { ComponentType } from "react";
=======
'use client';

import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ComponentType } from 'react';
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e

interface EmptyStateProps {
  icon?: ComponentType<any>;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
  className?: string;
}

<<<<<<< HEAD
export default function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-24 px-4 text-center",
        className,
      )}
    >
      {Icon && <Icon className="w-16 h-16 text-spotify-text-gray mb-4" />}
=======
export default function EmptyState({ 
  icon: Icon, 
  title, 
  description, 
  action,
  className 
}: EmptyStateProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center py-24 px-4 text-center", className)}>
      {Icon && (
        <Icon className="w-16 h-16 text-spotify-text-gray mb-4" />
      )}
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      {description && (
        <p className="text-spotify-text-gray mb-6 max-w-md">{description}</p>
      )}
      {action && (
        <button
          onClick={action.onClick}
          className="px-6 py-3 bg-transparent border-2 border-spotify-green text-spotify-green hover:shadow-[0_0_20px_rgba(29,185,84,0.6)] rounded-full font-semibold transition-all duration-300"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}
