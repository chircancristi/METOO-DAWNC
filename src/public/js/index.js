let signInGoogle = document.getElementById("js-login-google");
var config = {
  apiKey: "AIzaSyB-wcY0u8Sk6m5WBv6dYG1B7W_4Clo5rjw",
  authDomain: "metoo-c7619.firebaseapp.com",
  databaseURL: "https://metoo-c7619.firebaseio.com",
  projectId: "metoo-c7619",
  storageBucket: "metoo-c7619.appspot.com",
  messagingSenderId: "295303057551"
};
var provider = new firebase.auth.GoogleAuthProvider();
firebase.initializeApp(config); 

signInGoogle.addEventListener('click', loginWithGoogle);

function loginWithGoogle(){
  
    firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("POST", "index" , true);
       
        var data = JSON.stringify({'email':user.email , 'displayName' : user.displayName, 'imgUrl':user.photoURL});
        console. log(data);
    
        xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        console.log(data);
        xmlhttp.send(data);
        
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

}