const CACHE_NAME = 'my-cache';

self.addEventListener('activate', event => {
  console.log('Service Worker activating.');
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match('/attachDNSFlag')
      .then(response => response?.text())
      .then(response => {
        if (response && response === 'true') {
          const modifiedRequest = new Request(event.request, {
            headers: new Headers({
              ...Object.fromEntries(event.request.headers.entries()),
              'X-User-Cached-DNS': 1
            })
          });

          return fetch(modifiedRequest);
        } else {
          return fetch(event.request);
        }
      })
      .catch(error => {
        console.error('Error fetching attachDNSFlag from cache:', error);
        return fetch(event.request);
      })
  );
});

self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SET_ATTACH_DNS') {
    console.log(`Service Worker received message: attachDNSFlag set to ${event.data.value}`);
    caches.open(CACHE_NAME).then(cache => {
      cache.put('/attachDNSFlag', new Response(event.data.value));
    });
  }
});
