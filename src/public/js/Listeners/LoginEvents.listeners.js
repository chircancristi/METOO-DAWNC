import *  as requests from "../Functions/Requests.functions.js";
export function addLoginEvents(firebase) {
  let signInGoogle = document.getElementById("js-login-google");
  let signInGithub = document.getElementById("js-loginGithub");
  signInGoogle.addEventListener('click', function () {
    loginWithGoogle(firebase);
  });
  signInGithub.addEventListener('click', function () {
    loginWithGithub(firebase);
  });
}
function loginWithGoogle(firebase) {
  let google = new firebase.auth.GoogleAuthProvider();

  firebase
    .auth()
    .signInWithPopup(google)
    .then(function (result) {

      var user = result.user;

      let data = {
        email: user.email,
        displayName: user.displayName,
        imgUrl: user.photoURL
    
      }
      requests.postDataToServer("loginUser", data);
      var now = new Date();
      var time = now.getTime();
      time += 3600 * 1000;
      now.setTime(time);

      document.cookie = "username=" + user.displayName + "; expires=" + now.toUTCString() + "; path=/";

      document.location.href = "/account.html";
    })
    .catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
    });
}
function loginWithGithub() {
  let gitHub = new firebase.auth.GithubAuthProvider();

  firebase.auth().signInWithPopup(gitHub).then(function (result) {

    var user = result.user;



    let displayName = "";

    for (let i = 0; i < user.email.length; i++) {
      if (user.email[i] == "@")
        break;
      displayName += user.email[i];
    }
    let data = {
      email: user.email,
      displayName: displayName,
      imgUrl: user.photoURL
  
    }
   
    requests.postDataToServer("loginUser", data);

    var now = new Date();
    var time = now.getTime();
    time += 3600 * 1000;
    now.setTime(time);

    document.cookie = "username=" + user.displayName + '; expires=' + now.toUTCString() + '; path=/';

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