/* Service worker: guarda a aplicação para abrir sem rede.
   Nunca guarda pedidos à API do Gemini nem nada com dados. */
var VERSAO = "despesas-v5";
var CONCHA = ["./","./index.html","./manifest.webmanifest",
              "./icone-192.png","./icone-512.png","./icone-maskable-512.png"];

self.addEventListener("install", function(ev){
  self.skipWaiting();
  ev.waitUntil(caches.open(VERSAO).then(function(c){ return c.addAll(CONCHA); }));
});

self.addEventListener("activate", function(ev){
  ev.waitUntil(caches.keys().then(function(ks){
    return Promise.all(ks.filter(function(k){ return k !== VERSAO; })
                        .map(function(k){ return caches.delete(k); }));
  }).then(function(){ return self.clients.claim(); }));
});

self.addEventListener("fetch", function(ev){
  var req = ev.request;
  if (req.method !== "GET") return;
  var u = new URL(req.url);
  if (u.origin !== self.location.origin) return;          // API, tipos de letra: passa directo
  ev.respondWith(
    caches.match(req).then(function(hit){
      if (hit) {
        fetch(req).then(function(r){
          if (r && r.ok) caches.open(VERSAO).then(function(c){ c.put(req, r.clone()); });
        }).catch(function(){});
        return hit;
      }
      return fetch(req).then(function(r){
        if (r && r.ok) { var cl = r.clone(); caches.open(VERSAO).then(function(c){ c.put(req, cl); }); }
        return r;
      }).catch(function(){ return caches.match("./index.html"); });
    })
  );
});
