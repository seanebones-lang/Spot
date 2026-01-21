<<<<<<< HEAD
"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
=======
'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e

export default function BackForwardButtons() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  const handleForward = () => {
    router.forward();
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleBack}
        className="w-8 h-8 flex items-center justify-center rounded-full transition-colors duration-200 disabled:cursor-not-allowed"
        style={{
<<<<<<< HEAD
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          color: "#FFFFFF",
        }}
        onMouseEnter={(e) => {
          if (!e.currentTarget.disabled) {
            e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.85)";
=======
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          color: '#FFFFFF'
        }}
        onMouseEnter={(e) => {
          if (!e.currentTarget.disabled) {
            e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.85)';
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
          }
        }}
        onMouseLeave={(e) => {
          if (!e.currentTarget.disabled) {
<<<<<<< HEAD
            e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
=======
            e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
          }
        }}
        aria-label="Go back"
      >
<<<<<<< HEAD
        <ArrowLeft
          size={18}
          style={{ width: "18px", height: "18px", opacity: 1 }}
        />
=======
        <ArrowLeft size={18} style={{ width: '18px', height: '18px', opacity: 1 }} />
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      </button>
      <button
        onClick={handleForward}
        className="w-8 h-8 flex items-center justify-center rounded-full transition-colors duration-200 disabled:cursor-not-allowed"
        style={{
<<<<<<< HEAD
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          color: "#FFFFFF",
        }}
        onMouseEnter={(e) => {
          if (!e.currentTarget.disabled) {
            e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.85)";
=======
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          color: '#FFFFFF'
        }}
        onMouseEnter={(e) => {
          if (!e.currentTarget.disabled) {
            e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.85)';
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
          }
        }}
        onMouseLeave={(e) => {
          if (!e.currentTarget.disabled) {
<<<<<<< HEAD
            e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
=======
            e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
          }
        }}
        aria-label="Go forward"
      >
<<<<<<< HEAD
        <ArrowRight
          size={18}
          style={{ width: "18px", height: "18px", opacity: 1 }}
        />
=======
        <ArrowRight size={18} style={{ width: '18px', height: '18px', opacity: 1 }} />
>>>>>>> 460cde8a4456665eaca40b34f2a2a146c789ce1e
      </button>
    </div>
  );
}
