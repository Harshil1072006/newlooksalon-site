// sw.js — New Look Salon Service Worker
// Strategy:
//   Network-first: HTML pages, config, images, API calls — never serve stale business info
//   Cache-first:   CSS, JS bundles, fonts, icons — truly static assets
//
// Versioned cache: bumping CACHE_VERSION deletes all old caches on activation.
// Update deployment → customers see new offers/prices/contact info immediately.

const CACHE_VERSION  = 'v1';
const STATIC_CACHE   = `nls-static-${CACHE_VERSION}`;
const DYNAMIC_CACHE  = `nls-dynamic-${CACHE_VERSION}`;

// Assets safe to cache-first (will not contain business data)
const STATIC_ASSETS = [
  '/src/styles/tokens.css',
  '/src/styles/base.css',
  '/src/styles/components.css',
  '/src/styles/animations.css',
  '/src/styles/sections.css',
  '/src/styles/desktop.css',
];

// ── Install: pre-cache nothing critical (network-first for all pages) ──────
self.addEventListener('install', (event) => {
  self.skipWaiting();
});

// ── Activate: delete ALL caches not matching current CACHE_VERSION ──────────
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(k => k !== STATIC_CACHE && k !== DYNAMIC_CACHE)
          .map(k => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

// ── Fetch: network-first for everything business-critical ───────────────────
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Only handle same-origin GET requests
  if (request.method !== 'GET') return;
  if (!url.origin.includes(self.location.origin) && !url.hostname.includes('fonts.')) return;

  // Google Fonts — cache-first (static)
  if (url.hostname.includes('fonts.googleapis.com') || url.hostname.includes('fonts.gstatic.com')) {
    event.respondWith(cacheFirst(request, STATIC_CACHE));
    return;
  }

  // HTML pages — network-first (always fresh)
  if (request.headers.get('accept')?.includes('text/html')) {
    event.respondWith(networkFirstWithOfflineFallback(request));
    return;
  }

  // Images — network-first (real salon images must be current)
  if (url.pathname.startsWith('/images/')) {
    event.respondWith(networkFirst(request, DYNAMIC_CACHE));
    return;
  }

  // JS/CSS bundles — cache-first (Vite hashes filenames on build, safe)
  if (url.pathname.match(/\.(js|css)$/) && url.pathname.includes('assets/')) {
    event.respondWith(cacheFirst(request, STATIC_CACHE));
    return;
  }

  // Everything else — network-first
  event.respondWith(networkFirst(request, DYNAMIC_CACHE));
});

// ── Strategies ───────────────────────────────────────────────────────────────

async function networkFirst(request, cacheName) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    const cached = await caches.match(request);
    return cached || new Response('Offline', { status: 503 });
  }
}

async function cacheFirst(request, cacheName) {
  const cached = await caches.match(request);
  if (cached) return cached;
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    return new Response('Offline', { status: 503 });
  }
}

async function networkFirstWithOfflineFallback(request) {
  try {
    const response = await fetch(request);
    if (response.ok) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    const cached = await caches.match(request) || await caches.match('/');
    if (cached) return cached;
    return new Response(
      `<!DOCTYPE html><html><head><meta charset="utf-8"><title>New Look Salon</title></head>
       <body style="font-family:sans-serif;text-align:center;padding:48px 24px;">
         <h1>You're Offline</h1>
         <p>Please check your connection and try again.</p>
         <p>To reach us: call or WhatsApp the salon directly.</p>
       </body></html>`,
      { headers: { 'Content-Type': 'text/html' }, status: 200 }
    );
  }
}
