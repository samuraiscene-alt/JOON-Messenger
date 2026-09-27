const CACHE='joon-messenger-v6';
const ASSETS=['./manifest.json','./joon-icon-192.png','./joon-icon-512.png'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)))});
self.addEventListener('activate',e=>e.waitUntil(Promise.all([self.clients.claim(),caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))])));
self.addEventListener('fetch',e=>{const r=e.request,u=new URL(r.url);if(r.method!=='GET')return;if(u.origin===location.origin&&(r.mode==='navigate'||/\.(html|css|js)$/.test(u.pathname))){e.respondWith(fetch(r,{cache:'no-store'}).catch(()=>caches.match(r)));return}e.respondWith(caches.match(r).then(x=>x||fetch(r).then(res=>{const copy=res.clone();caches.open(CACHE).then(cache=>cache.put(r,copy));return res})))});
