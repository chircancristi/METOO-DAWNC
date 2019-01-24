import * as requests from '../Functions/Requests.functions.js';
import * as login from './Login.functions.js';
import * as render from '../Functions/Render.function.js';

export function sendMessage() {
	let commentContent = document.getElementById('js-post-comment-content');
 
  if (commentContent.innerText != "") {
		let data = {
			author: login.getCookie('username'),
			listing: login.getCookie('listing'),
			imgUrl: login.getCookie('imgUrl'),
      content: commentContent.innerText,
      date: Date.now(),
      role: login.getCookie('role')
		};
    commentContent.innerText="";
    requests.postDataToServer('postComment', data);
    render.renderComment(data);
	}
}
