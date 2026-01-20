/**
 * Performance monitoring and optimization utilities
 * Tracks Core Web Vitals and custom metrics
 */

export interface PerformanceMetric {
  name: string;
  value: number;
  rating: "good" | "needs-improvement" | "poor";
  delta?: number;
  id: string;
}

/**
 * Report Web Vitals to analytics
 */
export function reportWebVitals(metric: PerformanceMetric) {
  // Send to Vercel Analytics (automatically handled by SpeedInsights)
  // Additional analytics can be added here
  
  // Log to console in development
  if (process.env.NODE_ENV === "development") {
    console.log(`[Web Vitals] ${metric.name}:`, {
      value: Math.round(metric.value),
      rating: metric.rating,
      id: metric.id,
    });
  }

  // Send to custom analytics endpoint if needed
  if (typeof window !== "undefined" && process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT) {
    fetch(process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(metric),
    }).catch(() => {
      // Silently fail analytics
    });
  }
}

/**
 * Measure time to interactive
 */
export function measureTTI() {
  if (typeof window === "undefined") return;

  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.entryType === "measure" && entry.name === "tti") {
        reportWebVitals({
          name: "TTI",
          value: entry.duration,
          rating: entry.duration < 3800 ? "good" : entry.duration < 7300 ? "needs-improvement" : "poor",
          id: "tti",
        });
      }
    }
  });

  observer.observe({ entryTypes: ["measure"] });

  // Measure TTI
  performance.mark("tti-start");
  window.addEventListener("load", () => {
    setTimeout(() => {
      performance.mark("tti-end");
      performance.measure("tti", "tti-start", "tti-end");
    }, 0);
  });
}

/**
 * Preload critical resources
 */
export function preloadResource(href: string, as: string) {
  if (typeof document === "undefined") return;

  const link = document.createElement("link");
  link.rel = "preload";
  link.href = href;
  link.as = as;
  document.head.appendChild(link);
}

/**
 * Lazy load images with Intersection Observer
 */
export function lazyLoadImages() {
  if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
    return;
  }

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute("data-src");
          observer.unobserve(img);
        }
      }
    });
  });

  document.querySelectorAll("img[data-src]").forEach((img) => {
    imageObserver.observe(img);
  });
}
