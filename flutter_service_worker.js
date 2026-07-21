// 자기소멸(self-destroying) 서비스워커.
// 이전에 등록된 캐시형 서비스워커를 대체해, 모든 캐시를 지우고 스스로 등록 해제한 뒤
// 열려 있는 페이지를 새로고침시켜 항상 최신 버전이 보이게 한다.
self.addEventListener('install', function (e) {
  self.skipWaiting();
});

self.addEventListener('activate', function (e) {
  e.waitUntil(
    (async function () {
      try {
        const keys = await caches.keys();
        await Promise.all(keys.map(function (k) { return caches.delete(k); }));
      } catch (err) {}
      await self.registration.unregister();
      const clients = await self.clients.matchAll({ type: 'window' });
      clients.forEach(function (client) {
        client.navigate(client.url);
      });
    })()
  );
});
