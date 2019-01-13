import * as loginEvents from "../Listeners/LoginEvents.listeners.js";

export function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for (var i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

export function checkIfUserIsLogged() {
  let username = getCookie("username");
  console.log(username);
  if (username == "") {

    return false;
  }
  return true;
}
export function login() {
  var config = {
    apiKey: "AIzaSyB-wcY0u8Sk6m5WBv6dYG1B7W_4Clo5rjw",
    authDomain: "metoo-c7619.firebaseapp.com",
    databaseURL: "https://metoo-c7619.firebaseio.com",
    projectId: "metoo-c7619",
    storageBucket: "metoo-c7619.appspot.com",
    messagingSenderId: "295303057551"
  };

  firebase.initializeApp(config);
  loginEvents.addLoginEvents(firebase);

}
