importScripts(
    'https://storage.googleapis.com/workbox-cdn/releases/6.5.4/workbox-sw.js'
);

// This is your Service Worker, you can put any of your custom Service Worker
// code in this file, above the `precacheAndRoute` line.
self.addEventListener('install', function(event) {
    event.waitUntil(
      caches.open('school-events-cache-v1').then(function(cache) {
        return cache.addAll([
          '/',
          '/index.html',
          '/manifest.json',
          '/styles.css',
          '/main.js'
        ]);
      })
    );
  });
  
  self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request).then(function(response) {
        return response || fetch(event.request);
      })
    );
  });
  
  self.addEventListener('push', function(event) {
    var options = {
      body: event.data.text(),
      icon: '/icon.png',
      badge: '/badge.png'
    };
    event.waitUntil(
      self.registration.showNotification('School Event Reminder', options)
    );
  });
  
workbox.precaching.precacheAndRoute(self.__WB_MANIFEST || []);