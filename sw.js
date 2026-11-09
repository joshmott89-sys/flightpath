// One service worker for both pages (they share this folder, so they share a scope).
// Bump VERSION whenever any cached file changes.
const VERSION = 'flightpath-v6';
const LOCAL = ['card.html', 'card.webmanifest', 'card-icon-192.png', 'card-icon-512.png',
               'meetup.html', 'meetup.webmanifest', 'meetup-icon-192.png', 'meetup-icon-512.png'];
const REMOTE = ['https://unpkg.com/leaflet@1.9.4/dist/leaflet.js', 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(VERSION).then(async (c) => {
    await c.addAll(LOCAL);
    await Promise.all(REMOTE.map((u) => c.add(u).catch(() => {}))); // map script is optional offline
  }).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys()
    .then((keys) => Promise.all(keys.filter((k) => k !== VERSION && (k.startsWith('flightpath-') || k.startsWith('travel-card-'))).map((k) => caches.delete(k))))
    .then(() => self.clients.claim()));
});

// Pages: network first (so updates arrive), cached copy when offline.
// Icons, manifests and the map library: cache first.
self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  const name = url.origin === location.origin ? (url.pathname.split('/').pop() || 'index.html') : null;
  const isRemote = REMOTE.includes(url.href);
  if (!isRemote && !(name && LOCAL.includes(name))) return;
  const key = isRemote ? url.href : name;
  const isPage = name && name.endsWith('.html');
  e.respondWith(caches.open(VERSION).then(async (cache) => {
    const hit = await cache.match(key);
    const net = fetch(e.request).then((res) => { if (res.ok) cache.put(key, res.clone()); return res; });
    if (isPage) return net.catch(() => hit || Response.error());
    return hit || net;
  }));
});
