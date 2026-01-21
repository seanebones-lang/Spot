// Service Worker for EmPulse Music
// Provides offline support and caching for better performance

const CACHE_NAME = "empulse-music-v1";
const STATIC_CACHE = "empulse-static-v1";
const AUDIO_CACHE = "empulse-audio-v1";

// Assets to cache on install
const STATIC_ASSETS = ["/", "/empulseheart.png", "/favicon.ico"];

// Install event - cache static assets
self.addEventListener("install", (event) => {
  console.log("[SW] Installing service worker...");
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      console.log("[SW] Caching static assets");
      return cache.addAll(STATIC_ASSETS);
    }),
  );
  self.skipWaiting(); // Activate immediately
});

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
  console.log("[SW] Activating service worker...");
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => {
            // Delete old caches
            return (
              name !== CACHE_NAME &&
              name !== STATIC_CACHE &&
              name !== AUDIO_CACHE
            );
          })
          .map((name) => {
            console.log("[SW] Deleting old cache:", name);
            return caches.delete(name);
          }),
      );
    }),
  );
  return self.clients.claim(); // Take control of all pages
});

// Fetch event - serve from cache, fallback to network
self.addEventListener("fetch", (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== "GET") {
    return;
  }

  // Skip chrome-extension and other protocols
  if (!url.protocol.startsWith("http")) {
    return;
  }

  // Cache strategy: Cache First for static assets, Network First for API
  if (
    url.pathname.startsWith("/_next/static") ||
    url.pathname.startsWith("/static") ||
    url.pathname.match(/\.(jpg|jpeg|png|gif|svg|webp|ico)$/)
  ) {
    // Static assets: Cache First
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(request).then((response) => {
          // Don't cache non-successful responses
          if (!response || response.status !== 200) {
            return response;
          }
          const responseToCache = response.clone();
          caches.open(STATIC_CACHE).then((cache) => {
            cache.put(request, responseToCache);
          });
          return response;
        });
      }),
    );
  } else if (url.pathname.match(/\.(mp3|wav|flac|m4a|ogg)$/)) {
    // Audio files: Cache First (can be large)
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(request).then((response) => {
          if (!response || response.status !== 200) {
            return response;
          }
          const responseToCache = response.clone();
          caches.open(AUDIO_CACHE).then((cache) => {
            cache.put(request, responseToCache);
          });
          return response;
        });
      }),
    );
  } else if (url.pathname.startsWith("/api/")) {
    // API requests: Network First, fallback to cache
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Cache successful API responses
          if (response && response.status === 200) {
            const responseToCache = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseToCache);
            });
          }
          return response;
        })
        .catch(() => {
          // Fallback to cache if network fails
          return caches.match(request);
        }),
    );
  } else {
    // Other requests: Network First
    event.respondWith(
      fetch(request).catch(() => {
        return caches.match(request);
      }),
    );
  }
});

// Message handler for cache management
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }

  if (event.data && event.data.type === "CLEAR_CACHE") {
    event.waitUntil(
      caches.keys().then((cacheNames) => {
        return Promise.all(cacheNames.map((name) => caches.delete(name)));
      }),
    );
  }
});
