const CACHE_NAME = 'cache-1';
self.addEventListener('install', evento => {
    const cache = caches.open(CACHE_NAME).then(cache => {
        return cache.addAll([
            '/',
            'app.js',
            'index.html',
            'styles.css',
            'img/eliminar.svg',
            'icons',
            'manifest.json',
            'sw.js',
            'https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css',
            'https://fonts.googleapis.com/icon?family=Material+Icons'
        ])
    })

    evento.waitUntil(cache);
})

self.addEventListener('fetch', e => {
    const respuestaCache = caches.match(e.request).then(res => {
        if(res) {
            return res;
        } else {
            return fetch(e.request).then(respuesta => {
                return respuesta;
            })
        }
    })

    e.respondWith(respuestaCache);
})