import * as login from "./Login.functions.js"
import * as requests from "./Requests.functions.js"
export function  subscribe()
{
    let data = {
        placeName: login.getCookie("place"),
        username: login.getCookie("username")
    }
   
  requests.postDataToServer("/subscribe",data);
  let subscribeBtnText = document.getElementById("js-subscribe-title");
 
  subscribeBtnText.innerHTML === "Subscribe" ? subscribeBtnText.innerHTML="Unsubscribe" : subscribeBtnText.innerHTML="Subscribe"; 

}
