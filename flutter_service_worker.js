self.addEventListener('install',function(e){self.skipWaiting();});
self.addEventListener('activate',function(e){e.waitUntil((async function(){try{const k=await caches.keys();await Promise.all(k.map(function(x){return caches.delete(x);}));}catch(err){}await self.registration.unregister();const c=await self.clients.matchAll({type:'window'});c.forEach(function(cl){cl.navigate(cl.url);});})());});
