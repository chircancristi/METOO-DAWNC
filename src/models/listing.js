const place = require('./place');
class Listing {


    static addListing(firebase, data) {
        const db=firebase.firestore();
        console.log(data);
        db.collection("Listing").get().then(function (querySnapshot) {
            let size = querySnapshot.size;
            let listingId="l"+(size+1); 
            db.collection("Listing").doc(listingId).set({
                "type": data.type,
                "status": "opened",
                "author": data.author,
                "title": data.title , 
                "description": data.description,
                 "skills":data.skills,
                 "place":data.place,
                 "concept":data.concept,
                 "comments":[],
                 "contributors":[]
            }).then(() => {
                place.updatePlaceWithListing(firebase,data.place,listingId)
                console.log('Document succesfully written! ✅')
            }).catch((error) => {
                console.error('Failed writing document:', error);
            });
        });
    }

}

var listing = Listing;
module.exports = listing;
