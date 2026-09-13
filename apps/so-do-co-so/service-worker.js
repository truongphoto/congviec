const CACHE_NAME = 'gpp-so-do-runtime-v1';
const APP_SHELL = [
  './','./index.html','./manifest.webmanifest','./icons/gpp-icon.svg','./icons/favicon-32.png',
  './icons/apple-touch-icon.png','./icons/icon-192.png','./icons/icon-512.png',
  './icons/icon-maskable-192.png','./icons/icon-maskable-512.png'
];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.addAll(APP_SHELL)))});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('gpp-so-do-')&&k!==CACHE_NAME).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('message',event=>{if(event.data?.type==='SKIP_WAITING')self.skipWaiting()});
self.addEventListener('fetch',event=>{const req=event.request;if(req.method!=='GET')return;const url=new URL(req.url);if(url.origin!==self.location.origin)return;event.respondWith((async()=>{const hit=await caches.match(req);if(hit)return hit;try{const res=await fetch(req);if(res&&res.ok){const cache=await caches.open(CACHE_NAME);cache.put(req,res.clone())}return res}catch(err){if(req.mode==='navigate'){const fallback=await caches.match('./index.html');if(fallback)return fallback}throw err}})())});
