var config = {
    apiKey: "AIzaSyB-wcY0u8Sk6m5WBv6dYG1B7W_4Clo5rjw",
    authDomain: "metoo-c7619.firebaseapp.com",
    databaseURL: "https://metoo-c7619.firebaseio.com",
    projectId: "metoo-c7619",
    storageBucket: "metoo-c7619.appspot.com",
    messagingSenderId: "295303057551"
  };
  firebase.initializeApp(config);
  const provider = new firebase.auth.GoogleAuthProvider();
  const db = firebase.firestore();
  
  const loginBtn = document.getElementById('js-login');
  const showDataBtn = document.getElementById('js-show-data');

  loginBtn.addEventListener('click', loginWithGoogle);
  showDataBtn.addEventListener('click', showDataJSON);

  function loginWithGoogle () {
    firebase.auth().signInWithRedirect(provider)
  }

  function showDataJSON() {
    firebase.auth().getRedirectResult().then(function(result) {
      if (result.credential) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // ...
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



  