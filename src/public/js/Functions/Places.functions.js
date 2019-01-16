import * as login from "./Login.functions.js"
import * as requests from "./Requests.functions.js"
export function  subscribe()
{
    let data = {
        placeName: login.getCookie("place"),
        username: login.getCookie("username")
    }
   
  requests.postDataToServer("/subscribe",data);
  if (document.getElementById("js-subscribe-title").innerHTML==="Subscribe")
  {
    document.getElementById("js-subscribe-title").innerHTML="Unsubscribe";
  }
  else {
    document.getElementById("js-subscribe-title").innerHTML="Subscribe";
  }

}