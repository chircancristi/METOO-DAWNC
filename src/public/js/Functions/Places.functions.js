import * as login from "./Login.functions"
export function  subscribe()
{
    let data = {
        placeName: login.getCookie("place"),
        userName: login.getCookie("username")
    }
    let request = new Request("subscribe", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    });
  
}