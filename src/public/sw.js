let staticAssets = [
    './css/styles.min.css',
    './js/main.js',
    './js/Listeners/LoginEvents.listeners.js',
    './js/Listeners/NavbarEvents.listeners.js',
    './js/Listeners/PagesEvents.listeners.js',
    './js/Functions/AddListing.functions.js',
    './js/Functions/Location.functions.js',
    './js/Functions/Login.functions.js',
    './js/Functions/Places.functions.js',
    './js/Functions/Render.functions.js',
    './js/Functions/Requests.functions.js',
    './index.html',
    './login.html',
    './browse-listings.html',
    './browse-places.html',
    './account.html',
    './add-listing.html',
    './single-listing.html',
    './single-place.html'
]

self.addEventListener('install', async event => {

    const cache = await caches.open('app-shell')
    cache.addAll(staticAssets);
})
self.addEventListener('fetch', event => {

    const request = event.request;
    const url = new URL(request.url);
    
    if (url.origin === location.origin) {
        
      
        if (url.pathname==="/listingsAfterLocation"){
            console.log(request);
            cacheThenNetwork(request);
        }
        else{
        event.respondWith(cacheFirst(request));
        }
    }
    /*
    else {
        event.respondWith(cacheThenNetwork(request))
    }*/
})
async function cacheFirst(req) {
    const cachedResponse = await caches.match(req);
    return cachedResponse || fetch(req);
}
 function cacheThenNetwork(req) {
    caches.open('mysite-dynamic').then(function (cache) {

        return fetch(req).then(function (response) {
            cache.put(req, response.clone());
            return response;
        })

    })
}