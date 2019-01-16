class Place {

    static getFavoritePlaces(firebase) {
        const db = firebase.firestore();
        let places = [];
        let aux;
        return db.collection("Place").get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                // doc.data() is never undefined for query doc snapshots
                places.push(doc.data());
            });

            for (let i = 0; i < places.length - 1; i++) {
                for (let j = i + 1; j < places.length; j++) {
                    if (places[i].listings.length < places[j].listings.length) {
                        aux = places[i];
                        places[i] = places[j];
                        places[j] = aux;
                    }
                }
            }
            if (places.length > 5) {
                places.splice(5, places.length - 5);
            }
            return places;
        }).catch(function (error) {
            console.log("Error getting places:", error);
        });;

    }
    static getAllPlaces(firebase) {
        const db = firebase.firestore();
        let places = [];
        let aux;
        return db.collection("Place").get().then(function (querySnapshot) {
            querySnapshot.forEach(function (doc) {
                // doc.data() is never undefined for query doc snapshots
                places.push(doc.data());
            });
            return places;
        }).catch(function (error) {
            console.log("Error getting places:", error);
        });;
    }
    static updatePlaceWithListing(firebase, place, listing) {
        const db = firebase.firestore();
        db.collection("Place").where("name", "==", place).get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    // doc.data() is never undefined for query doc snapshots
                    let currentListings = doc.data().listings;
                    currentListings.push(listing);
                    db.collection("Place").doc(doc.id).update({
                        "listings": currentListings
                    });
                })
            })
    }
    static getPlaceByName(name,firebase){
        const db = firebase.firestore();
        let data;
        return db.collection("Place").where("name", "==", name).get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    // doc.data() is never undefined for query doc snapshots
                    
                     data=doc.data();
                     
                })
               
                return data;
            })
    }
    static subscribeToPlace(namePlace,username,firebase){
        const db = firebase.firestore();
        let subscribers=[];
        db.collection("Place").where("name", "==", namePlace).get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    subscribers=doc.data().subscribedUsers;                     
                
                let index=subscribers.indexOf(username);
                if (index==-1){
                    subscribers.push(username);
                }
                else{
                    subscribers.splice(index, 1);
                }
                db.collection("Place").doc(doc.id).update({
                    "subscribedUsers": subscribers
                });
            })
                
            })

    }
}
var place = Place;
module.exports = place;
