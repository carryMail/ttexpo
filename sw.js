let cacheName = 'Time Table';
let cacheAssets = [
    './',
    './images/icons/icon-72x72.png',
    './images/icons/icon-96x96.png',
    './images/icons/icon-128x128.png',
    './images/icons/icon-144x144.png',
    './images/icons/icon-152x152.png',
    './images/icons/icon-192x192.png',
    './images/icons/icon-384x384.png',
    './images/icons/icon-512x512.png',
    './icon-96x96.png',
    './index.html',
    './manifest.json'
];

self.addEventListener('install',e=>{
    e.waitUntil(
        caches.open(cacheName)
        .then(cache=>{
           cache.addAll(cacheAssets);
        })
        .then(()=>{self.skipWaiting()})
    );
});

self.addEventListener('activate',e=>{
    e.waitUntil(
        caches.keys()
        .then(keyList=>{
            return Promise.all(
                keyList.map(key=>{
                    if(key !== cacheName) {
                       return caches.delete(key); 
                    }
                })
            );
        })
        .then(()=>{ return self.clients.claim(); })
    );
    
});

self.addEventListener('fetch',function(e){
    e.respondWith(
        caches.match(e.request).then(function(response){
            return response || fetch(e.request);
        })
    );
});