"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

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
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          color: "#FFFFFF",
        }}
        onMouseEnter={(e) => {
          if (!e.currentTarget.disabled) {
            e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.85)";
          }
        }}
        onMouseLeave={(e) => {
          if (!e.currentTarget.disabled) {
            e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
          }
        }}
        aria-label="Go back"
      >
        <ArrowLeft
          size={18}
          style={{ width: "18px", height: "18px", opacity: 1 }}
        />
      </button>
      <button
        onClick={handleForward}
        className="w-8 h-8 flex items-center justify-center rounded-full transition-colors duration-200 disabled:cursor-not-allowed"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          color: "#FFFFFF",
        }}
        onMouseEnter={(e) => {
          if (!e.currentTarget.disabled) {
            e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.85)";
          }
        }}
        onMouseLeave={(e) => {
          if (!e.currentTarget.disabled) {
            e.currentTarget.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
          }
        }}
        aria-label="Go forward"
      >
        <ArrowRight
          size={18}
          style={{ width: "18px", height: "18px", opacity: 1 }}
        />
      </button>
    </div>
  );
}
