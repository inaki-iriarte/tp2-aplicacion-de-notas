const CACHE_NAME = 'cache-1';
self.addEventListener('install', function(e){
    const cache = caches.open(CACHE_NAME).then(cache => {
        return cache.addAll([
            'app.js',
            'index.html',
            'styles.css',
            'img/eliminar.svg'
        ])
    })

    e.waitUntil(cache);
})

self.addEventListener('fetch', e => {
    // const respuestaCache = caches.match(e.request).then(res => {
    //     if(res) {
    //         return res;
    //     } else {
    //         return fetch(e.request).then(respuesta => {
    //             caches.open(CACHE_NAME).then(cache => {
    //                 cache.put(e.request, respuesta)
    //             })

    //             return respuesta.clone()
    //         })
    //     }
    // })

    // e.respondWith(respuestaCache);

    const respuesta = fetch(e.request).then(respNet => {
        return caches.open(CACHE_NAME).then(cache => {
            cache.put(e.request, respNet.clone());
            return respNet;
        })
    }).catch(error => {
        return caches.match(e.request);
    })

    e.respondWith(respuesta);
})