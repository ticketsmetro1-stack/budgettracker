const CACHE_NAME = 'budget-pwa-v1';
const FILES_TO_CACHE = [
  '/',
  '/index.html',
  '/sw.js',
  // add any other files like images, CSS if separate
];

// Install SW and cache files
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Activate SW
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys.map(key => {
        if(key !== CACHE_NAME) return caches.delete(key);
      }));
    })
  );
  self.clients.claim();
});

// Fetch requests: serve cached first
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(resp => resp || fetch(event.request))
  );
});
