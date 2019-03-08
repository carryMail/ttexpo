let cacheName = 'TimeTable';
let cacheAssets = [
    '/ttexpo/',
    '/ttexpo/images/icons/icon-72x72.png',
    '/ttexpo/images/icons/icon-96x96.png',
    '/ttexpo/images/icons/icon-128x128.png',
    '/ttexpo/images/icons/icon-144x144.png',
    '/ttexpo/images/icons/icon-152x152.png',
    '/ttexpo/images/icons/icon-192x192.png',
    '/ttexpo/images/icons/icon-384x384.png',
    '/ttexpo/images/icons/icon-512x512.png',
    '/ttexpo/icon-96x96.png',
    '/ttexpo/index.html',
    '/ttexpo/manifest.json'
];

self.addEventListener('install',e=>{
    e.waitUntil(
        caches.open(cacheName)
        .then(cache=>{
           cache.addAll(cacheAssets);
        },err=>console.log('caching error found ',err))
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
            return response || fetch(e.request)
        })
    );
});
