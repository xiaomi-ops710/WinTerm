const V='winterm-v7',CORE=['./','index.html','manifest.json','icons/icon-192.png','icons/icon-512.png','icons/icon.svg'];
self.addEventListener('install',e=>e.waitUntil(caches.open(V).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>clients.claim())));
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);
 if(u.hostname==='generativelanguage.googleapis.com')return;
 const same=u.origin===location.origin,cdn=/(^|\.)(jsdelivr\.net|iconify\.design|simplesvg\.com|unisvg\.com|googleapis\.com|gstatic\.com)$/.test(u.hostname);
 if(!same&&!cdn)return;
 const put=res=>{if(res&&(res.ok||res.type==='opaque'))caches.open(V).then(c=>c.put(r,res.clone()));return res};
 if(r.mode==='navigate'){e.respondWith(fetch(r).then(put).catch(()=>caches.match('index.html')));return}
 e.respondWith(caches.match(r).then(hit=>hit||fetch(r).then(put)))});
