

 class Index {
    

    static loginWithGoogle (firebase,data) {
            
            const db = firebase.firestore();
                db.collection('User').doc(data.displayName).set({
                    "fullName": data.displayName,
                    "email": data.email,
                    "imgUrl": data.imgUrl
                }).then( () => {
                    console.log('Document succesfully written! ✅')
                }).catch( (error) => {
                    console.error('Failed writing document:', error);
                });      
    }

}
var index=Index;
module.exports = index;
