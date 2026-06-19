const CACHE_NAME = 'courtstats-v2';

const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './app.js',
  './i18n.js',
  './manifest.json',
  './icons/icon-maskable-192x192.png',
  './icons/icon-maskable-512x512.png'
];

// INSTALL: pre-cacha tutti gli asset
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS_TO_CACHE))
  );
  // Forza attivazione immediata senza aspettare che le tab vecchie vengano chiuse
  self.skipWaiting();
});

// ACTIVATE: elimina le cache vecchie (es. courtstats-v1)
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

// FETCH: Cache-first per asset statici, Network-first per tutto il resto
self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  // Solo richieste same-origin
  if (url.origin !== location.origin) return;

  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;

      return fetch(event.request).then(response => {
        // Non cachare risposte non valide
        if (!response || response.status !== 200 || response.type !== 'basic') {
          return response;
        }
        // Aggiorna la cache con la nuova risposta
        const toCache = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, toCache));
        return response;
      }).catch(() => {
        // Offline fallback: ritorna index.html per navigazione
        if (event.request.mode === 'navigate') {
          return caches.match('./index.html');
        }
      });
    })
  );
});
