const CACHE='nhan-ra-le-runtime-v1';
const ASSETS=['./','./index.html','./manifest.webmanifest','./icon-32.png','./icon-180.png','./icon-192.png','./icon-512.png'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)))});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('nhan-ra-le-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()))});
self.addEventListener('message',event=>{if(event.data&&event.data.type==='SKIP_WAITING')self.skipWaiting()});
self.addEventListener('fetch',event=>{if(event.request.method!=='GET')return;const req=event.request;const url=new URL(req.url);if(url.origin!==self.location.origin)return;event.respondWith((async()=>{const hit=await caches.match(req);if(hit)return hit;try{const res=await fetch(req);if(res&&res.ok){const c=await caches.open(CACHE);c.put(req,res.clone())}return res}catch(err){if(req.mode==='navigate'){const fallback=await caches.match('./index.html');if(fallback)return fallback}throw err}})())});
