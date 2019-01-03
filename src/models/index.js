

 class Index {
    

    static loginWithGoogle (firebase) {

            let provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithRedirect(provider)
            firebase.auth().getRedirectResult().then(function(result) {
            if (result.credential) {
                var token = result.credential.accessToken;
            }
            // The signed-in user info.
            let user = result.user;
            db.collection('User').doc(`${user.displayName}`).set({
                fullName: user.displayName,
                email: user.email
            }).then( () => {
                console.log('Document succesfully written! ✅')
            }).catch( (error) => {
                console.error('Failed writing document:', error);
            });
    
            console.log(user);
            }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
            // ...
            })
    }

}
var index=Index;
module.exports = index;
