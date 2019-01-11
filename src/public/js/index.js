
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
let modalHtml = document.getElementById("nav--modalJS");
let modalHtmLMobile = document.getElementById("nav--mobileJS");
let modalButtonNav= document.getElementById("nav--mainJS");
firebase.initializeApp(config);


function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
var username = getCookie("username");
console.log(window.location.pathname);
if (window.location.pathname != "/login"){
if (username != "") {

  modalHtml.innerHTML = " ";

}
else {
  let html = " <li class='modal__button' id='signInJs'><a>Sign in</a></li>"
  modalButtonNav.innerHTML= modalButtonNav.innerHTML+html;
  html = " <li class='modal__button' id='signInMobileJs'><a>Sign in</a></li>"
  modalHtmLMobile.innerHTML= modalHtmLMobile.innerHTML+html;
  html =" <ul class='modal__content-list'> <span id='closeJS' class='modal-content__close'>&times;</span> <div class='modal__content-title'><h3>Please sign in</h3></div><li id='js-login-google' class='list__element list__element--google'><img src='/images/google.png'> <div class='list__element-name'><a>Google</a></div> </li><li id='js-loginGithub' class='list__element list__element--github'><img src='/images/github.png'><div class='list__element-name'><a>Github</a></div></li></ul>"
  modalHtml.innerHTML = html;

}
}
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
