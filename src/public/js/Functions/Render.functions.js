import * as login from "./Login.functions.js";
import * as events from "../Listeners/NavbarEvents.listeners.js";
export function renderBasicPage() {
    if (login.checkIfUserIsLogged() == false)
        document.location.href = "/login"
    events.addNavbarEvents();
}
export function renderLoginModal() {
    let modalHtml = document.getElementById("nav--modalJS");
    let modalHtmLMobile = document.getElementById("nav--mobileJS");
    let modalButtonNav = document.getElementById("nav--mainJS");


    let html = " <li class='modal__button' id='signInJs'><a>Sign in</a></li>"
    modalButtonNav.innerHTML = modalButtonNav.innerHTML + html;
    html = " <li class='modal__button' id='signInMobileJs'><a>Sign in</a></li>"
    modalHtmLMobile.innerHTML = modalHtmLMobile.innerHTML + html;
    html = `
    <ul class='modal__content-list'>
        <span id='closeJS'class='modal-content__close'>&times;</span> 
        <div class='modal__content-title'><h3>Please sign in</h3>
        </div>
        <li id='js-login-google' class='list__element list__element--google'>
            <img src='/images/google.png'> 
            <div class='list__element-name'><a>Google</a></div> 
        </li>
        <li id='js-loginGithub' class='list__element list__element--github'>
            <img src='/images/github.png'>
            <div class='list__element-name'><a>Github</a></div>
        </li>
    </ul> `
    modalHtml.innerHTML = html;
    html = " <script src='/js/login.js'></script>"
    document.getElementsByTagName("html").innerHTML = document.getElementsByTagName("html").innerHTML + html;

}
let map;
function initMap() {
    let uluru = { lat: 47.166478, lng: 27.580477 };
    map = new google.maps.Map(
        document.getElementById('map'),
        {
            zoom: 13,
            center: uluru
        }
    );
}
export function renderMainPage() {
    initMap();
    fetch("favouritePlaces")
        .then((resp) => resp.json())
        .then(function (json_data) {
            let sizeY;
            let sizeX = sizeY = 60;
            var icon = {
                url: "../images/place5.png", // url
                scaledSize: new google.maps.Size(sizeX, sizeY), // scaled size
                origin: new google.maps.Point(0, 0), // origin
                anchor: new google.maps.Point(0, 0) // anchor
            };
            var uluru;
            for (let i = json_data.length - 1; i >= 0; i--) {
                uluru = { lat: json_data[i].geolocation._lat, lng: json_data[i].geolocation._long };
                let marker = new google.maps.Marker({ position: uluru, map: map, icon: icon });

                marker.addListener('click', function () {
                    infowindow.open(marker.get('map'), marker);
                });
                var infowindow = new google.maps.InfoWindow({
                    content: json_data[i].name
                })
                sizeX = sizeX + 20;
                sizeY = sizeY + 20;
                icon = {
                    url: "../images/place" + (i + 1) + ".png", // url
                    scaledSize: new google.maps.Size(sizeX, sizeY), // scaled size
                    origin: new google.maps.Point(0, 0), // origin
                    anchor: new google.maps.Point(0, 0) // anchor
                }
            }

        })
        .catch(function (error) {
            console.log(error);
        });

}
export function renderAccountPage() {
    let displayName = document.getElementById("nameJS");
    let profilePic = document.getElementById("profilePicJS");
    let likes = document.getElementById("likesJS");
    let dislikes = document.getElementById("dislikesJS");
    let data = {
        username: login.getCookie("username")
    }

    let request = new Request("userInformation", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    });
    fetch(request)
        .then((resp) => resp.json())
        .then(function (json_data) {

            displayName.innerHTML = json_data.fullName;
            profilePic.src = json_data.imgUrl;
            likes.innerHTML = json_data.likes;
            dislikes.innerHTML = json_data.dislikes;

        });
}
export function renderAddListing() {
    let placesImplement = document.getElementById("js-input-place-implement");
    let placesStudy = document.getElementById("js-input-place-study");
    fetch("getPlaces")
        .then((resp) => resp.json())
        .then(function (json_data) {
            for (let i = 0; i < json_data.length; i++) {
                placesImplement.innerHTML = placesImplement.innerHTML +
                    `<option value="` + json_data[i].name + `">` + json_data[i].name + `</option>`;
                placesStudy.innerHTML = placesStudy.innerHTML +
                    `<option value="` + json_data[i].name + `">` + json_data[i].name + `</option>`;
            }
        })
}
export function renderAllPlaces() {
    let placesGrid = document.getElementById("js-places-grid");
    fetch("getPlaces")
        .then((resp) => resp.json())
        .then(function (json_data) {
            for (let i = 0; i < json_data.length; i++) {
                placesGrid.innerHTML = placesGrid.innerHTML +
                    `<a href="#" class="grid__item">
          <article class="card">
            <div class="card__content">
              <h2 class="card__title">`+json_data[i].name+`</h2>
            </div>
            <picture class="card_image">
              <source media="(min-width: 800px)" srcset="`+json_data[i].img[0]+`" type="image/webp">
              <source media="(min-width: 800px)" srcset="`+json_data[i].img[1]+`" type="image/jpg">
              <source media="(min-width: 600px)" srcset="`+json_data[i].img[2]+`"  type="image/webp">
              <source media="(min-width: 600px)" srcset="`+json_data[i].img[3]+`"  type="image/jpg">
              <source media="(min-width: 300px)" srcset="`+json_data[i].img[4]+`"  type="image/webp">
              <source media="(min-width: 300px)" srcset="`+json_data[i].img[5]+`"  type="image/jpg">
            
              <img src="`+json_data[i].img[3]+`" style="width:100%;height: 100%;">
            </picture>
          </article>
        </a>`
            }
        })
    //background: url("../images/carturesti-medium.jpg") rgba(0, 0, 0, 0.075) center no-repeat;

}
export function  renderListingsPage()
{
    let data = {
        status: login.getCookie("status"),
        latitude: login.getCookie("latitude"),
        longitude: login.getCookie("longitude")
    }

    let request = new Request("listingsAfterLocation", {
        method: 'POST',
        body: JSON.stringify(data),
        headers: new Headers({
            'Content-Type': 'application/json'
        })
    });
    fetch(request)
    .then((resp) => resp.json())
    .then(function (json_data) {
            console.log(json_data);
        
    })


}