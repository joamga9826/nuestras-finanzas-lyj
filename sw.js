// Only static public resources; never cache Google authentication or financial data.
const CACHE='lyj-public-shell-v31';
const ROOT=new URL('./',self.location.href);
const FILES=['./','./index.html','./manifest.webmanifest','./icon-192.png','./icon-512.png'].map(p=>new URL(p,ROOT).href);
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('lyj-public-shell-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET'||!FILES.includes(e.request.url))return;e.respondWith(fetch(e.request).catch(()=>caches.match(e.request)));});
