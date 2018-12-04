var config = {
    apiKey: "AIzaSyB-wcY0u8Sk6m5WBv6dYG1B7W_4Clo5rjw",
    authDomain: "metoo-c7619.firebaseapp.com",
    databaseURL: "https://metoo-c7619.firebaseio.com",
    projectId: "metoo-c7619",
    storageBucket: "metoo-c7619.appspot.com",
    messagingSenderId: "295303057551"
  };
  firebase.initializeApp(config);

  var provider = new firebase.auth.GoogleAuthProvider();

  firebase.auth().signInWithRedirect(provider);

  firebase.auth().getRedirectResult().then(function(result) {
    if (result.credential) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // ...
    }
    // The signed-in user info.
    var user = result.user;
    print(user)
  }).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });