// เปลี่ยนเลขเวอร์ชันนี้ทุกครั้งที่ deploy เพื่อให้ iPhone เด้งแจ้งเตือนอัปเดต
const CACHE = 'project-v5';
const ASSETS = [
  './index.html',
  './manifest.json',
  './ภาพ/Generated_Image_y1p24uy1p24uy1p2.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)));
  // ไม่เรียก skipWaiting() อัตโนมัติ — รอให้ผู้ใช้กดยืนยันอัปเดตก่อน
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// หน้าเว็บส่งข้อความมาบอกให้ service worker ตัวใหม่ทำงานทันที
self.addEventListener('message', e => {
  if (e.data === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('fetch', e => {
  const req = e.request;

  // HTML / การเปิดหน้า: network-first เพื่อให้ได้เนื้อหาล่าสุดเสมอเมื่อออนไลน์
  if (req.mode === 'navigate' || (req.headers.get('accept') || '').includes('text/html')) {
    e.respondWith(
      fetch(req)
        .then(res => {
          // cache เฉพาะ response ที่สำเร็จ ป้องกันหน้า error ทับ cache
          if (res && res.ok) {
            const copy = res.clone();
            caches.open(CACHE).then(c => c.put('./index.html', copy));
          }
          return res;
        })
        .catch(() => caches.match('./index.html'))
    );
    return;
  }

  // ไฟล์อื่น (รูป, manifest): cache-first
  e.respondWith(caches.match(req).then(r => r || fetch(req)));
});
