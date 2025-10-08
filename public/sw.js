// REME LAT-USA - Service Worker para PWA
// Caché de assets y funcionamiento offline

const CACHE_NAME = 'reme-lat-usa-v1';
const RUNTIME_CACHE = 'reme-lat-usa-runtime';

// Assets estáticos para cachear
const STATIC_ASSETS = [
  '/',
  '/logo-reme-lat-usa.svg',
  '/manifest.json',
  '/offline.html'
];

// Install event - cachear assets estáticos
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('[SW] Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - limpiar cachés viejos
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((name) => name !== CACHE_NAME && name !== RUNTIME_CACHE)
            .map((name) => caches.delete(name))
        );
      })
      .then(() => self.clients.claim())
  );
});

// Fetch event - Network First con fallback a cache
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Solo cachear requests del mismo origen
  if (url.origin !== location.origin) {
    return;
  }

  // API calls: Network First, fallback a cache
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Guardar respuesta en cache
          const clonedResponse = response.clone();
          caches.open(RUNTIME_CACHE).then((cache) => {
            cache.put(request, clonedResponse);
          });
          return response;
        })
        .catch(() => {
          // Si falla network, intentar cache
          return caches.match(request);
        })
    );
    return;
  }

  // Assets estáticos: Cache First, fallback a network
  event.respondWith(
    caches.match(request)
      .then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return fetch(request)
          .then((response) => {
            // Guardar respuesta en cache
            if (response.status === 200) {
              const clonedResponse = response.clone();
              caches.open(RUNTIME_CACHE).then((cache) => {
                cache.put(request, clonedResponse);
              });
            }
            return response;
          })
          .catch(() => {
            // Si falla todo, mostrar página offline
            if (request.destination === 'document') {
              return caches.match('/offline.html');
            }
          });
      })
  );
});

// Push notifications (para alertas futuras)
self.addEventListener('push', (event) => {
  if (!event.data) return;

  const data = event.data.json();
  const options = {
    body: data.body || 'Nueva actualización de tasa',
    icon: '/logo-reme-lat-usa.svg',
    badge: '/logo-reme-lat-usa.svg',
    vibrate: [200, 100, 200],
    tag: 'rate-alert',
    requireInteraction: true,
    actions: [
      {
        action: 'view',
        title: 'Ver Tasa'
      },
      {
        action: 'close',
        title: 'Cerrar'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification(
      data.title || 'REME LAT-USA',
      options
    )
  );
});

// Notification click
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'view') {
    event.waitUntil(
      clients.openWindow('/calculadora')
    );
  }
});

console.log('[SW] REME LAT-USA Service Worker loaded');
