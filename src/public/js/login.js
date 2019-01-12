
var config = {
    apiKey: "AIzaSyB-wcY0u8Sk6m5WBv6dYG1B7W_4Clo5rjw",
    authDomain: "metoo-c7619.firebaseapp.com",
    databaseURL: "https://metoo-c7619.firebaseio.com",
    projectId: "metoo-c7619",
    storageBucket: "metoo-c7619.appspot.com",
    messagingSenderId: "295303057551"
  };
let xmlhttp = new XMLHttpRequest();
let google = new firebase.auth.GoogleAuthProvider();
var gitHub = new firebase.auth.GithubAuthProvider();
firebase.initializeApp(config);
let signInGoogle = document.getElementById("js-login-google");
let signInGithub = document.getElementById("js-loginGithub");
signInGoogle.addEventListener('click', loginWithGoogle);
signInGithub.addEventListener('click', loginWithGithub);
function loginWithGoogle() {

  firebase.auth().signInWithPopup(google).then(function (result) {
    // This gives you a Google Access Token. You can use it to access the Google API.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;

    xmlhttp.open("POST", "loginUser", true);

    var data = JSON.stringify({ 'email': user.email, 'displayName': user.displayName, 'imgUrl': user.photoURL });

    var now = new Date();
    var time = now.getTime();
    time += 3600 * 1000;
    now.setTime(time);

    document.cookie = "username=" + user.displayName + '; expires=' + now.toUTCString() + '; path=/';
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
   
    xmlhttp.send(data);
    document.location.href = "/account.html";

  }).catch(function (error) {
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
function loginWithGithub() {

  firebase.auth().signInWithPopup(gitHub).then(function (result) {

    var user = result.user;

    console.log(user);
    xmlhttp.open("POST", "loginUser", true);

    let displayName = "";

    for (let i = 0; i < user.email.length; i++) {
      if (user.email[i] == "@")
        break;
      displayName += user.email[i];
    }

    var data = JSON.stringify({ 'email': user.email, 'displayName': displayName, 'imgUrl': user.photoURL });

    var now = new Date();
    var time = now.getTime();
    time += 3600 * 1000;
    now.setTime(time);

    document.cookie = "username=" + user.displayName + '; expires=' + now.toUTCString() + '; path=/';
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    console.log(data);
    xmlhttp.send(data);
    document.location.href = "/account";
  }).catch(function (error) {
    // Handle Errors here.
    var errorCode = error.code;
    console.log(errorCode);
    var errorMessage = error.message;
    console.log(errorMessage);
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });

}
