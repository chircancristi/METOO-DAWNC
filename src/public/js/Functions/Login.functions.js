import * as loginEvents from '../Listeners/LoginEvents.listeners.js';
import * as requests from '../Functions/Requests.functions.js';
export function getCookie(cname) {
	let name = cname + '=';
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
	return '';
}

export function checkIfUserIsLogged() {
	let username = getCookie('username');
	if (username == '') {
		return false;
	}
	return true;
}
export function login() {
	var config = {
		apiKey: 'AIzaSyB-wcY0u8Sk6m5WBv6dYG1B7W_4Clo5rjw',
		authDomain: 'metoo-c7619.firebaseapp.com',
		databaseURL: 'https://metoo-c7619.firebaseio.com',
		projectId: 'metoo-c7619',
		storageBucket: 'metoo-c7619.appspot.com',
		messagingSenderId: '295303057551',
	};

	firebase.initializeApp(config);
	loginEvents.addLoginEvents(firebase);
}
export function loginWithGoogle(firebase) {
	let google = new firebase.auth.GoogleAuthProvider();

	firebase
		.auth()
		.signInWithPopup(google)
		.then(function(result) {
			var user = result.user;

			let data = {
				email: user.email,
				displayName: user.displayName,
				imgUrl: user.photoURL,
			};
			requests.postDataToServer('loginUser', data);
			var now = new Date();
			var time = now.getTime();
			time += 3600 * 1000;
			now.setTime(time);

			document.cookie = 'username=' + user.displayName + '; expires=' + now.toUTCString() + '; path=/';
			document.cookie = 'imgUrl='+ user.photoURL+'; expires=' + now.toUTCString() + '; path=/';

			document.location.href = '/account.html';
		})
		.catch(function(error) {
			var errorCode = error.code;
			var errorMessage = error.message;
			console.log(errorMessage);
			var email = error.email;
			var credential = error.credential;
		});
}
export function loginWithGithub() {
	let gitHub = new firebase.auth.GithubAuthProvider();

	firebase
		.auth()
		.signInWithPopup(gitHub)
		.then(function(result) {
			var user = result.user;

			let displayName = '';

			for (let i = 0; i < user.email.length; i++) {
				if (user.email[i] == '@') break;
				displayName += user.email[i];
			}
			let data = {
				email: user.email,
				displayName: displayName,
				imgUrl: user.photoURL,
			};

			requests.postDataToServer('loginUser', data);

			var now = new Date();
			var time = now.getTime();
			time += 3600 * 1000;
			now.setTime(time);

			document.cookie = 'username=' + user.displayName + '; expires=' + now.toUTCString() + '; path=/';
			document.cookie = 'imgUrl=' + user.imgUrl + '; expires=' + now.toUTCString() + '; path=/';


			document.location.href = '/account';
		})
		.catch(function(error) {
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
