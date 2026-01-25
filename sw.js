// // Service Worker for Evershine Graphixs
// const CACHE_NAME = 'evershine-graphixs-v1';
// const urlsToCache = [
//   '/',
//   '/index.html',
//   '/style.css',
//   '/script.js',
//   '/manifest.json',
//   'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
//   'https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Raleway:wght@700;800&display=swap'
// ];

// // Install event
// self.addEventListener('install', event => {
//   event.waitUntil(
//     caches.open(CACHE_NAME)
//       .then(cache => cache.addAll(urlsToCache))
//   );
// });

// // Fetch event
// self.addEventListener('fetch', event => {
//   event.respondWith(
//     caches.match(event.request)
//       .then(response => response || fetch(event.request))
//   );
// });

// // Activate event
// self.addEventListener('activate', event => {
//   event.waitUntil(
//     caches.keys().then(cacheNames => {
//       return Promise.all(
//         cacheNames.map(cache => {
//           if (cache !== CACHE_NAME) {
//             return caches.delete(cache);
//           }
//         })
//       );
//     })
//   );
// });
document.addEventListener("DOMContentLoaded", () => {
  const popup = document.getElementById("locationPopup");
  const closeBtn = document.querySelector(".close-location-popup");

  if (!localStorage.getItem("locationPopupShown")) {
    popup.style.display = "flex";
    localStorage.setItem("locationPopupShown", "true");
  }

  closeBtn.addEventListener("click", () => {
    popup.style.display = "none";
  });

  popup.addEventListener("click", (e) => {
    if (e.target === popup) {
      popup.style.display = "none";
    }
  });
});