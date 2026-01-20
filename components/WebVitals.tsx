"use client";

import { useEffect } from "react";
import { onCLS, onFCP, onLCP, onTTFB, onINP } from "web-vitals";
import { reportWebVitals } from "@/lib/performance";

/**
 * Web Vitals Component
 * Reports Core Web Vitals to analytics
 * Note: onFID is deprecated, using onINP instead
 */
export function WebVitals() {
  useEffect(() => {
    // Core Web Vitals
    onCLS(reportWebVitals);
    onFCP(reportWebVitals);
    onLCP(reportWebVitals);
    onTTFB(reportWebVitals);
    onINP(reportWebVitals); // Replaces FID
  }, []);

  return null;
}
