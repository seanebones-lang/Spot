'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function BackForwardButtons() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  const handleForward = () => {
    router.forward();
  };

  return (
    <div className="flex items-center gap-2 mr-4">
      <button
        onClick={handleBack}
        className="w-8 h-8 flex items-center justify-center bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Go back"
      >
        <ArrowLeft size={18} />
      </button>
      <button
        onClick={handleForward}
        className="w-8 h-8 flex items-center justify-center bg-black/50 rounded-full text-white hover:bg-black/70 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Go forward"
      >
        <ArrowRight size={18} />
      </button>
    </div>
  );
}
