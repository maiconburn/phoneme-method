// Service Worker for ABC PWA
// Version is bumped on each deploy to force cache update
const CACHE_VERSION = 'v2';
const CACHE_NAME = `abc-${CACHE_VERSION}`;

const urlsToCache = [
  '/',
  '/index.html',
];

// Install: cache core assets and skip waiting immediately
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
  // Force this new SW to activate immediately (don't wait for old tabs to close)
  self.skipWaiting();
});

// Activate: delete ALL old caches, then claim all clients
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      )
    ).then(() => {
      // Take control of all open tabs immediately
      return self.clients.claim();
    }).then(() => {
      // Notify all clients to reload with the new version
      return self.clients.matchAll({ type: 'window' }).then((clients) => {
        clients.forEach((client) => {
          client.postMessage({ type: 'SW_UPDATED', version: CACHE_VERSION });
        });
      });
    })
  );
});

// Fetch: network-first strategy for HTML/API, cache-first for static assets
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  
  // For navigation requests (HTML pages): always try network first
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // Cache the fresh response
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
          return response;
        })
        .catch(() => {
          // Fallback to cache if offline
          return caches.match(event.request).then((cached) => {
            return cached || caches.match('/index.html');
          });
        })
    );
    return;
  }

  // For static assets (JS, CSS, images): cache-first, update in background
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Start a background fetch to update the cache
      const fetchPromise = fetch(event.request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
        }
        return networkResponse;
      }).catch(() => null);

      // Return cached version immediately, or wait for network
      return cachedResponse || fetchPromise;
    })
  );
});
