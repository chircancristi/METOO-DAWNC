const place = require('./place');
class Listing {
    constructor(){

    }
    static Deg2Rad(deg) {
        return deg * Math.PI / 180;
      }
    static PythagorasEquirectangular(lat1, lon1, lat2, lon2) {
        lat1 = this.Deg2Rad(lat1);
        lat2 = this.Deg2Rad(lat2);
        lon1 = this.Deg2Rad(lon1);
        lon2 = this.Deg2Rad(lon2);
        var R = 6371; // km
        var x = (lon2 - lon1) * Math.cos((lat1 + lat2) / 2);
        var y = (lat2 - lat1);
        var d = Math.sqrt(x * x + y * y) * R;
        return d;
    }

    static getUsersListings(firebase, data) {
        console.log(typeof this.PythagorasEquirectangular)
        place.getAllPlaces(firebase).then((places) => {
            if (data.status != "" && data.status != "denied") {
                console.log(data.latitude, data.longitude)
                places.sort((a, b) => {
                    let Avalue = this.PythagorasEquirectangular(a.geolocation.latitude, a.geolocation.longitude, data.latitude, data.longitude);
                    let Bvalue = this.PythagorasEquirectangular(b.geolocation.latitude, b.geolocation.longitude, data.latitude, data.longitude);
                    return Avalue - Bvalue;
                })
                
                console.log(places);
            }
        }
        ).catch((error)=>
        {
            console.log(error);
        })


    }


    static addListing(firebase, data) {
        const db = firebase.firestore();
        console.log(data);
        db.collection("Listing").get().then(function (querySnapshot) {
            let size = querySnapshot.size;
            let listingId = "l" + (size + 1);
            db.collection("Listing").doc(listingId).set({
                "type": data.type,
                "status": "opened",
                "author": data.author,
                "title": data.title,
                "description": data.description,
                "skills": data.skills,
                "place": data.place,
                "concept": data.concept,
                "comments": [],
                "contributors": []
            }).then(() => {
                place.updatePlaceWithListing(firebase, data.place, listingId)
                console.log('Document succesfully written! ✅')
            }).catch((error) => {
                console.error('Failed writing document:', error);
            });
        });
    }
    static getListingsAtLocation( place,firebase) {
        const db = firebase.firestore();
        let listings=[];
        return db.collection("Listing").where("place", "==", place).get()
            .then(function (querySnapshot) {
                querySnapshot.forEach(function (doc) {
                    // doc.data() is never undefined for query doc snapshots
                    listings.push(doc.data());
                });
                return listings;
            })
    }

}

var listing = Listing;
module.exports = listing;
