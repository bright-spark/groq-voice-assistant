// This is the service worker with the combined offline experience (Offline page + Offline copy of pages)

const CACHE_NAME = "belinda-offline-v1";
const ASSETS = [
  '/',
  '/manifest.json',
  '/icon.png',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/groq-logo.svg',
  '/next.svg',
  '/vercel.svg',
];

// Install stage sets up the offline page in the cache and opens a new cache
self.addEventListener("install", function(event) {
  // Perform install steps: precaching critical assets
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      console.log('Opened cache');
      return cache.addAll(ASSETS);
    })
  );
  
  // Immediately claim clients
  self.skipWaiting();
});

// Activate the service worker
self.addEventListener('activate', function(event) {
  const cacheAllowlist = [CACHE_NAME];

  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheAllowlist.indexOf(cacheName) === -1) {
            // If this cache name isn't in our allowlist, delete it
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  
  // Claim any clients immediately
  return self.clients.claim();
});

// If any fetch fails, it will look for the request in the cache and serve it from there first
self.addEventListener("fetch", function(event) {
  if (event.request.method !== "GET") return;
  
  // Handle requests for index.html specifically
  const url = new URL(event.request.url);
  if (url.pathname === '/index.html') {
    // Redirect index.html requests to the root path
    event.respondWith(
      fetch(new Request('/', { 
        headers: event.request.headers,
        method: event.request.method 
      }))
    );
    return;
  }
  
  event.respondWith(
    fetch(event.request)
      .then(function(response) {
        // If request was successful, add result to cache
        event.waitUntil(updateCache(event.request, response.clone()));
        return response;
      })
      .catch(function(error) {
        // Check to see if you have it in the cache
        return fromCache(event.request)
          .catch(() => {
            // If the asset isn't in cache and the request is for a document, 
            // serve the root document instead (common PWA pattern)
            if (event.request.headers.get('accept').includes('text/html')) {
              return caches.match('/');
            }
            throw error;
          });
      })
  );
});

function fromCache(request) {
  return caches.open(CACHE_NAME).then(function(cache) {
    return cache.match(request).then(function(matching) {
      if (!matching || matching.status === 404) {
        return Promise.reject("no-match");
      }
      return matching;
    });
  });
}

function updateCache(request, response) {
  return caches.open(CACHE_NAME).then(function(cache) {
    return cache.put(request, response);
  });
}
