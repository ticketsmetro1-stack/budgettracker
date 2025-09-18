const CACHE_NAME = 'budget-pwa-v1';
const FILES_TO_CACHE = [
  '/',
  '/index.html',
  '/sw.js'
];

self.addEventListener('install', e=>{
  e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(FILES_TO_CACHE)));
  self.skipWaiting();
});
self.addEventListener('activate', e=>{
  e.waitUntil(caches.keys().then(keys=>{
    return Promise.all(keys.map(k=>{ if(k!==CACHE_NAME) return caches.delete(k); }));
  }));
  self.clients.claim();
});
self.addEventListener('fetch', e=>{
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request)));
});
