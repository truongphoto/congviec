// CÔNG VIỆC v2.4 - cache-first, cập nhật thủ công.
// Giữ CACHE_NAME ổn định qua các bản phát hành thông thường để tránh tải lại toàn bộ file.
const CACHE_NAME = 'cong-viec-runtime-v1';
const PRECACHE = [
  './',
  './index.html',
  './apps.json',
  './manifest.webmanifest',
  './assets/app-icon-32.png',
  './assets/app-icon-192.png',
  './assets/app-icon-512.png',
  './assets/apple-touch-icon.png'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(PRECACHE)));
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(key => key.startsWith('cong-viec-') && key !== CACHE_NAME).map(key => caches.delete(key))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('message', event => {
  if (event.data?.type === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const req = event.request;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;

  // version.json chỉ được gọi khi người dùng bấm Cập nhật và phải luôn hỏi máy chủ.
  if (url.pathname.endsWith('/version.json')) {
    event.respondWith(fetch(req, { cache: 'no-store' }));
    return;
  }

  event.respondWith((async () => {
    const cached = await caches.match(req);
    if (cached) return cached; // Có cache thì tuyệt đối không tạo request nền.

    try {
      const response = await fetch(req);
      if (response && response.ok) {
        const cache = await caches.open(CACHE_NAME);
        cache.put(req, response.clone());
      }
      return response;
    } catch (error) {
      if (req.mode === 'navigate') {
        const fallback = await caches.match('./index.html');
        if (fallback) return fallback;
      }
      throw error;
    }
  })());
});
