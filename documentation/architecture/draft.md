# Arhitectura S10
## Table of contents
* **Data flow**
  * **PWA**
    * app shell
    * caching
    * Worker/Web Worker
    * Service Workers
  * **DB** - *Firebase* - schema
* **Design Pattern**
* **API**s
  * Login (FB, Gmail, Twitter) -> *Firebase*
  * Google Maps
* **Front-End Back-End communication**

## 1.Data flow
* `Single-place`
  * Încărcare dinamică(și/sau cache-uită) a datelor
* `Account`
  * la tab-ul de requests se poate accepta / refuza accesul utilizatorului ce dorește să se alăture listing-ului ( POST DB + notificare )
  * listing-urile active se pot șterge de pe pagina listing-ului respectiv ( POST DB + delete DB )
* `Add listing`
  * nu se poate accesa pagina fără a fi autentificat ❌
  * datele completate în formular ( study/code ) sunt trimise la server ( DB ) și toți utilizatorii din același loc geografic vor primi o notificare ( firebase push notification )
* `Listings`
  * la accesarea paginii aplicația va afișa listing-urile filtrate după poziția curentă a utilizatorului ( DB )
  * search: filtrare după
    * loc fizic
    * după tipul listing-ului ( study/code )
    * după skills
  * la apăsarea butonului de `Join` autorul listing-ului respectiv va primi o notificare

## 1.1 PWA
### 1.1.1 `Manifest.json`
```
{
  "short_name": "Metoo",
  "name": "Meet-up web tool",
  "icons": [
    {
      "src": "/assets/images/icon-192.png",
      "type": "image/png",
      "sizes": "192x192"
    },
    {
      "src": "/images/icons-512.png",
      "type": "image/png",
      "sizes": "512x512"
    }
  ],
  "start_url": "/pages/index.html",
  "background_color": "#edf1f2",
  "display": "standalone",
  "orientation": "portrait",
  "scope": "/pages/",
  "theme_color": "#b7d7eb"
}
```
### 1.1.2 App shell
Format din: 
* `Manifest.json`
* `index.html`
* `CSS`
* `main.js`
* icons

### 1.1.3 Service Worker/Web worker/Worklets
Adds to cache the `app shell` using a **cache only** strategy.
The dynamic content will be cached using the **cache then network** strategy.


## 1.2 DB

NoSQL database using *Firebase*.

### 1.2.1 User
```
{
  id: alphanumeric,
  email: string,
  firstName: string,
  lastName: string,
  password: string,
  skills: [skill1, skill2, skill3 ...],
  listings: {
    authored: [id1, id2, id3 ...],
    joined: [id1, id2, id3 ...],
    done: [id1, id2, id3 ...]
  },
  location: id (alphanumeric)
}
```
### 1.2.2 Listing
```
{
  id: alphanumeric,
  type: string,
  status: string (active/done),
  details: {
    author: id (alphanumeric),
    title: string,
    description: string,
    skills: [skill1, skill2, skill3 ...]
  },
  place: id (alphanumeric),
  comments: [id1, id2, id3 ...],
  contributors: [id1, id2, id3 ...],
  expiresAt: date
}
```

### 1.2.3 Place
```
{
  id: alphanumeric,
  coordinates: numeric,
  img: URL(string),
  completedListings: [id1, id2, id3 ...],
  mostActiveContributor: id,

  // will update every time a user
  // changes his/hers location
  onSiteUsers: [id1, id2, id3 ...] // refactor `key` name
}
```

### 1.2.4 Comment
```
{
  id: alphanumeric,
  content: string,
  author: string,
  listing: id (alphanumeric),
  date: date
}
```

## 2. Design Pattern
### MVC
1. Views
  * Home
  * Browse-listings
  * Browse-places
  * Single-listing
  * Add-listing
  * Single-place
  * Account
2. Models
  * User 
  * Listing
  * Place
  * Comment
3. Controllers
  * home.js
  * account.js
  * add-listing.js
  * listing.js
  * browse-listings.js

## 3. APIs

### 3.1 Google Maps

## 4. Front-End Back-End communication


# TODO:
* firebase - autentificare
* firebase - db - ce se-ntâmplă cu referințele
* google maps API
