class User {


    static login(firebase, data) {

        const db = firebase.firestore();
        db.collection('User').doc(data.displayName).set({
            "fullName": data.displayName,
            "email": data.email,
            "imgUrl": data.imgUrl,
            "likes":0 , 
            "dislikes": 0 
        }).then(() => {
            console.log('Document succesfully written! ✅')
        }).catch((error) => {
            console.error('Failed writing document:', error);
        });
    }
    
    static getUserInformation(firebase, username) {
        const db = firebase.firestore();
        var docRef = db.collection("User").doc(username);
        return docRef.get().then(function (doc) {
            if (doc.exists) {
                let data=doc.data();
                return data;
               
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function (error) {
            console.log("Error getting document:", error);
        });
        
    }
    

}

var user = User;
module.exports = user;
