import * as requests from '../Functions/Requests.functions.js';
import * as login from '../Functions/Login.functions.js';
export function addLoginEvents(firebase) {
	let signInGoogle = document.getElementById('js-login-google');
	let signInGithub = document.getElementById('js-loginGithub');
	signInGoogle.addEventListener('click', function() {
		login.loginWithGoogle(firebase);
	});
	signInGithub.addEventListener('click', function() {
		login.loginWithGithub(firebase);
	});
}
