# Arhitectura S10
## 1.Topics
* Data flow
  * PWA
    * app shell
    * caching 
    * Worker/Web Worker
    * Service Workers
  * DB - Firebase - schema
* Design Pattern
* APIs
  * Login (FB, Gmail, Twitter) -> *Firebase*
  * Google Maps
* Cum ajung datele în Front-End
  * AJAX
  * API
  * socket

## 2.Data flow
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

## 2.2 DB

NoSQL database using *Firebase*.

### 2.2.1 User
```
User: {
  id: alphanumeric,
  email: string,
  firstName: string,
  lastName: string,
  password: string,
  listings: {
    authored: [id1, id2, id3 ...],
    joined: [id1, id2, id3 ...],
    done: [id1, id2, id3 ...]
  },
  location: id (alphanumeric)
}
```
### 2.2.2 Listing
```
Listing: {
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

### 2.2.3 Place
```
Place: {
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
# TODO:
* comentarii
* restul de la capitole 
