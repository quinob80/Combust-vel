const CACHE_NAME = 'calc-flex-v1';
const assetsToCache = [
  './',
  './index.html',
  './manifest.json',
  // URLs dos CDNs para funcionarem offline (opcional, mas recomendado)
  'https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

// Instalação do Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Cache aberto');
        return cache.addAll(assetsToCache);
      })
  );
});

// Interceptação das requisições para servir o cache
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Retorna o cache se encontrar, senão faz a requisição na rede
        return response || fetch(event.request);
      })
  );
});
