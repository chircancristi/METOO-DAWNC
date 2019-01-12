class Place {
     
      static getFavoritePlaces(firebase){
        const db=firebase.firestore();
        let places=[];
        let aux;
        return db.collection("Place").get().then(function(querySnapshot) {
            querySnapshot.forEach(function(doc) {
                // doc.data() is never undefined for query doc snapshots
                places.push(doc.data());
            });
             
           for (let i=0;i<places.length-1;i++)
           {
              for (let j=i+1;j<places.length;j++)
              {
                  if (places[i].listings.length<places[j].listings.length)
                  {
                    aux=places[i];
                    places[i]=places[j];
                    places[j]=aux;
                  }
              }
           }
           if(places.length>5){
               places.splice(5,places.length-5);
           }
           return places;
        }).catch(function (error) {
            console.log("Error getting places:", error);
        });;
     
    }
}
var place = Place;
module.exports = place;
