// Offline cache for the travel card. Bump VERSION when card files change.
const VERSION = 'travel-card-v4';
const FILES = ['card.html', 'card.webmanifest', 'card-icon-192.png', 'card-icon-512.png'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(VERSION).then((c) => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith('travel-card-') && k !== VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Cache first so the card opens instantly with no signal; refresh the copy in the background when online.
self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);
  if (e.request.method !== 'GET' || url.origin !== location.origin) return;
  const name = url.pathname.split('/').pop() || 'card.html';
  if (!FILES.includes(name)) return;
  e.respondWith(
    caches.open(VERSION).then((cache) =>
      cache.match(name).then((hit) => {
        const fresh = fetch(e.request).then((res) => { if (res.ok) cache.put(name, res.clone()); return res; }).catch(() => hit);
        return hit || fresh;
      })
    )
  );
});
