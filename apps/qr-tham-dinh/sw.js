const CACHE_VERSION = 'qr-tham-dinh-runtime-v2';
const APP_SHELL = [
  './', './index.html', './styles.css?v=27', './app.js?v=27', './v26.js?v=27', './manifest.json',
  './assets/brand-truong-gpp.png', './assets/favicon-y-te-32.png',
  './assets/apple-touch-icon.png', './assets/app-icon-192.png', './assets/app-icon-512.png',
  './assets/app-icon-maskable-512.png', './assets/so-do-dia-diem-template.png',
  './assets/icons/y-te.svg', './assets/icons/quay-thuoc.svg', './assets/icons/nha-thuoc.svg',
  './assets/icons/cong-ty-duoc.svg', './assets/icons/phong-kham.svg', './assets/icons/benh-vien.svg'
];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE_VERSION).then(cache=>cache.addAll(APP_SHELL)))});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('qr-tham-dinh-')&&k!==CACHE_VERSION).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('message',event=>{if(event.data&&event.data.type==='SKIP_WAITING')self.skipWaiting()});
self.addEventListener('fetch',event=>{const req=event.request;if(req.method!=='GET')return;const url=new URL(req.url);if(url.origin!==self.location.origin)return;event.respondWith((async()=>{const hit=await caches.match(req);if(hit)return hit;try{const res=await fetch(req);if(res&&res.ok){const cache=await caches.open(CACHE_VERSION);cache.put(req,res.clone())}return res}catch(err){if(req.mode==='navigate'){const fallback=await caches.match('./index.html');if(fallback)return fallback}throw err}})())});
