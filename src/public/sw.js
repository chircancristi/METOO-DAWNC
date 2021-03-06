importScripts("/js/Utilities/localforage.js");

let staticAssets = [
  "./index.html",
  "./login.html",
  "./browse-listings.html",
  "./browse-places.html",
  "./account.html",
  "./add-listing.html",
  "./single-listing.html",
  "./single-place.html",
  "./css/styles.min.css",
  "./js/main.js",
  "./js/Functions/AddListing.functions.js",
  "./js/Functions/Fetch.functions.js",
  "./js/Functions/Location.functions.js",
  "./js/Functions/Login.functions.js",
  "./js/Functions/Markup.functions.js",
  "./js/Functions/Places.functions.js",
  "./js/Functions/Render.functions.js",
  "./js/Functions/Requests.functions.js",
  "./js/Functions/SingleListing.functions.js",
  "./js/Listeners/LoginEvents.listeners.js",
  "./js/Listeners/NavbarEvents.listeners.js",
  "./js/Listeners/PagesEvents.listeners.js",
  "./js/Utilities/localforage.js",
  "./images/bcu-medium.jpg",
  "./images/bcu-medium-small.jpg",
  "./images/bcu-large.jpg",
  "./images/bcu-medium.webp",
  "./images/bcu-medium-small.webp",
  "./images/bcu-large.webp",
  "./images/carturesti-medium.jpg",
  "./images/carturesti-medium-small.jpg",
  "./images/carturesti-large.jpg",
  "./images/carturesti-medium.webp",
  "./images/carturesti-medium-small.webp",
  "./images/carturesti-large.webp",
  "./images/college-medium.jpg",
  "./images/college-medium-small.jpg",
  "./images/college-large.jpg",
  "./images/college-medium.webp",
  "./images/college-medium-small.webp",
  "./images/college-large.webp"
];

self.addEventListener("install", async (event) => {
  event.waitUntil(
    caches.open(`meToo-app-shell`).then(cache => {
      return cache.addAll(staticAssets);
    }).catch((e) => {
      console.log(e); 
    })
  );

  self.skipWaiting();
});

self.addEventListener("activate", event => {});

self.addEventListener("fetch", event => {
  const request = event.request;
  const url = new URL(request.url);

  if ( event.request.mode === "navigate" || (event.request.method === "GET" && event.request.headers.get("accept").includes("text/html")) ) {
    event.respondWith(cacheFirst(request));
  } else {
    if (url.origin === location.origin) {
      let flag = true;

      for (let i = 0; i < url.pathname.length; i++) {
        if (url.pathname[i] === ".") {
          flag = false;
        }
      }

      if (flag === true) {
        event.respondWith(cacheThenNetwork(request));
      } else {
        event.respondWith(cacheFirst(request));
      }
    }
  }
});

async function cacheFirst(req) {
  const cachedResponse = await caches.match(req);

  return cachedResponse || fetch(req);
}

async function cacheThenNetwork(req) {
  return fetch(req).then(async function(resp) {
    const url = new URL(req.url);
    await localforage.setItem(url.pathname, resp.clone().json());

    return resp;
  });
}
