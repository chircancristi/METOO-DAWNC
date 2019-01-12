
let modalHtml = document.getElementById("nav--modalJS");
let modalHtmLMobile = document.getElementById("nav--mobileJS");
let modalButtonNav= document.getElementById("nav--mainJS");
let map;


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
  html=" <script src='/js/login.js'></script>"
  document.getElementsByTagName("html").innerHTML=document.getElementsByTagName("html").innerHTML+html;
}
}
function initMap() {
   uluru= {lat: 47.166478, lng: 27.580477};
   map = new google.maps.Map(
    document.getElementById('map'), {zoom: 13, center: uluru});

  
}

let xmlhttp = new XMLHttpRequest();
xmlhttp.open("POST", "favouritePlaces", true);
xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
xmlhttp.send();

xmlhttp.onreadystatechange = function() { 
  if (xmlhttp.readyState == 4)
      if (xmlhttp.status == 200){
          
          let json_data = JSON.parse(xmlhttp.responseText); 
          console.log(json_data);
          let sizeX=60;
          let sizeY=60;
          var icon = {
            url: "../images/place5.png", // url
            scaledSize: new google.maps.Size(sizeX, sizeY), // scaled size
            origin: new google.maps.Point(0,0), // origin
            anchor: new google.maps.Point(0, 0) // anchor
        };
          var uluru;
          for (let i=json_data.length-1;i>=0;i--)
          {
            console.log(json_data[i].geolocation._lat);
            uluru = {lat:json_data[i].geolocation._lat, lng:  json_data[i].geolocation._long};
            console.log(uluru);
            marker=new google.maps.Marker({position: uluru, map: map,icon:icon });  
            attachSecretMessage(marker, json_data[i].name);
           
            sizeX=sizeX+20;
            sizeY=sizeY+20;
            icon={
              url: "../images/place"+(i+1)+".png", // url
              scaledSize: new google.maps.Size(sizeX, sizeY), // scaled size
              origin: new google.maps.Point(0,0), // origin
              anchor: new google.maps.Point(0, 0) // anchor
            }
          }
      }
};
function attachSecretMessage(marker, secretMessage) {
  marker.addListener('click', function() {
    infowindow.open(marker.get('map'), marker);
  });
  var infowindow = new google.maps.InfoWindow({
    content: secretMessage
  })
}