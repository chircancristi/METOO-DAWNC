import * as login from "./Login.functions.js";
import * as events from "../Listeners/NavbarEvents.listeners.js";
import * as pagesEvents from "../Listeners/PagesEvents.listeners.js"
export function renderBasicPage() {
    if (login.checkIfUserIsLogged() == false)
        document.location.href = "/login"
    events.addNavbarEvents();
}
export function renderLoginModal() {
    let modalHtml = document.getElementById("nav--modalJS");
    let modalHtmLMobile = document.getElementById("nav--mobileJS");
    let modalButtonNav = document.getElementById('nav--mainJS');

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
            throw new Error(error);
        });

}
function updateAccountPage(json_data){
    let displayName = document.getElementById("js-name");
    let profilePic = document.getElementById("js-profile-pic");
    let likes = document.getElementById("js-likes");
    let dislikes = document.getElementById("js-dislikes");
    let skills= document.getElementById("js-skills");
    let favouritePlace= document.getElementById("js-favourite-place");
    let listingsCompleted= document.getElementById("js-listings-completed");
    let listingsActive= document.getElementById("js-listings-active");

    let username=login.getCookie("username");
    let min=-1;
    let favouritePlaceName="";
    let placesName=[];
    let placeNames=[]
    
    displayName.innerHTML = json_data.userData.fullName;
    profilePic.src = json_data.userData.imgUrl;
    likes.innerHTML = json_data.userData.likes;
    dislikes.innerHTML = json_data.userData.dislikes;
    skills.innerHTML=""
    listingsActive.innerHTML=""
    listingsCompleted.innerHTML=""
    for (let i=0;i<json_data.userData.skills.length;i++){
        skills.innerHTML=skills.innerHTML+
        ` <li class="skill">${json_data.userData.skills[i]}</li>`
    }
    for (let i=0;i<json_data.listings.length;i++){
        if (json_data.listings[i].author==username){
            if(!placesName[json_data.listings[i].place]){
                placesName[json_data.listings[i].place]=0;
                placeNames.push(json_data.listings[i].place);
            }
            placesName[json_data.listings[i].place]++;
        }
        let body=""
        if (json_data.listings[i].status==="opened"){
                body = body +
                `
            <div class="flex__item">
                <article class="listing">
                <div class="listing__content">
                    <h3 class="title">${json_data.listings[i].title}</h3>
                    <ul id="js-skills" class="skills-req">
            `;

            for (let j = 0; j < json_data.listings[i].skills.length; j++) {

                body = body +
                    `<li>${json_data.listings[i].skills[j]}</li>`
            }

            body = body +
                ` </ul>
                    <div class="actions">
                    <button id="js-join" class="join">Join</button>
                    <a href="" class="view-listing">View Listing</a>
                    </div>
                </div>
                <div class="listing__meta">
                    <a href="#">
                    <span class="author">${json_data.listings[i].author}</span>
                    </a>
                    <a href="#"><span class="place">${json_data.listings[i].place}</span></a>
                </div>
                <span class="listing__type">${json_data.listings[i].type}</span>
                </article>
            </div>
            `
            listingsActive.innerHTML =  listingsActive.innerHTML+ body;
        }
        else{
            body = body +
            `
        <div class="flex__item">
            <article class="listing">
            <div class="listing__content">
                <h3 class="title">${json_data.listings[i].title}</h3>
                <ul id="js-skills" class="skills-req">
        `;

        for (let j = 0; j < json_data.listings[i].skills.length; j++) {

            body = body +
                `<li>${json_data.listings[i].skills[j]}</li>`
        }

        body = body +
            ` </ul>
                <div class="actions">
                <button id="js-join" class="join">Join</button>
                <a href="" class="view-listing">View Listing</a>
                </div>
            </div>
            <div class="listing__meta">
                <a href="#">
                <span class="author">${json_data.listings[i].author}</span>
                </a>
                <a href="#"><span class="place">${json_data.listings[i].place}</span></a>
            </div>
            <span class="listing__type">${json_data.listings[i].type}</span>
            </article>
        </div>
        `
        listingsCompleted.innerHTML =  listingsActive.innerHTML+ body;

        }
        
    }
    for (let i=0;i<placeNames.length;i++)
    {
        if(placesName[placeNames[i]]>min){
            min=placesName[placeNames[i]];
            favouritePlaceName=placeNames[i];
        }
    }
    favouritePlace.innerText=favouritePlaceName;

}
export function renderAccountPage() {
    
    let networkDataReceived=false;
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
            networkDataReceived=true;
            updateAccountPage(json_data);
        });
    localforage.getItem(`/userInformation`
        , function (err, value) {
            if (!value) throw Error("No data");
            return value;
        }).then(function (data) {
            // don't overwrite newer network data

            if (!networkDataReceived) {
                updateAccountPage(data);
            }
        }).catch(function (error) {
            throw new Error("Problem acessing the cache",error)
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
                    `<option value="${json_data[i].name}">${json_data[i].name} </option>`;
                placesStudy.innerHTML = placesStudy.innerHTML +
                    `<option value="${json_data[i].name}"> ${json_data[i].name} </option>`;
            }
        })
}
function updateAllplaces(json_data) {
    let placesGrid = document.getElementById("js-places-grid");
    placesGrid.innerHTML = "";
    for (let i = 0; i < json_data.length; i++) {
        placesGrid.innerHTML = placesGrid.innerHTML +
            `<a href="/single-place.html" id= ${json_data[i].name}  class="grid__item">
  <article class="card">
    <div class="card__content">
      <h2 class="card__title">`+ json_data[i].name + `</h2>
    </div>
    <picture class="card_image">
      <source media="(min-width: 800px)" srcset="${json_data[i].img[0]}" type="image/webp">
      <source media="(min-width: 800px)" srcset="${json_data[i].img[1]}" type="image/jpg">
      <source media="(min-width: 600px)" srcset="${json_data[i].img[2]}" type="image/webp">
      <source media="(min-width: 600px)" srcset="${json_data[i].img[3]}" type="image/jpg">
      <source media="(min-width: 300px)" srcset="${json_data[i].img[4]}" type="image/webp">
      <source media="(min-width: 300px)" srcset="${json_data[i].img[5]}" type="image/jpg">  
      <img src="${json_data[i].img[3]}" style="width:100%;height: 100%;">
    </picture>
  </article>
   </a>`
    }
    pagesEvents.browsePlacesEvents();
}
export function renderAllPlaces() {
    let networkDataReceived = false;
    fetch("getPlaces")
        .then((resp) => resp.json())
        .then(function (json_data) {
            networkDataReceived = true;
            updateAllplaces(json_data);

        })
    localforage.getItem("/getPlaces"
        , function (err, value) {
            if (!value) throw Error("No data");
            return value;
        }).then(function (data) {
            // don't overwrite newer network data

            if (!networkDataReceived) {
                updateAllplaces(data);
            }
        }).catch(function (error) {
            throw new Error("Problem acessing the cache",error)
        });
}
function updateSinglePlacePage(json_data) {
    let subscribersModal = document.getElementById("js-subscribers-modal");
    let subscribersCount = document.getElementById("js-subscribers-count");
    let listingsInProgress = document.getElementById("js-listings-in-progress");
    let listingsFinished = document.getElementById("js-finished-listings");


    document.getElementById("js-place-img").innerHTML = `
    <picture class="card_image">
    <source media="(min-width: 800px)" srcset="${json_data.locationInformation.img[0]}" type="image/webp">
    <source media="(min-width: 800px)" srcset="${json_data.locationInformation.img[1]}" type="image/jpg">
    <source media="(min-width: 600px)" srcset="${json_data.locationInformation.img[3]}"  type="image/webp">
    <source media="(min-width: 600px)" srcset="${json_data.locationInformation.img[4]}"  type="image/jpg">
    <source media="(min-width: 300px)" srcset="${json_data.locationInformation.img[5]}"  type="image/webp">
    <source media="(min-width: 300px)" srcset="${json_data.locationInformation.img[6]}"  type="image/jpg">  
    <img src="${json_data.locationInformation.img[7]}" style="width:100%;height: 100%;">
     </picture>`

    let value = 0;

    document.getElementById("js-place-name").innerText = json_data.locationInformation.name;
    pagesEvents.singlePageEvents();
    for (let i = 0; i < json_data.subscribers.length; i++) {
        if (json_data.subscribers[i].fullName === login.getCookie("username")) {
            document.getElementById("js-subscribe-title").innerHTML = "Unsubscribe";
            value = -1;
        }
        else {
            subscribersModal.innerHTML = subscribersModal.innerHTML +
                `<div class="subscriber-container">
            <img class="subscriber__pic" src="${json_data.subscribers[i].imgUrl}">
            <div class="subscriber__info">
                <h3 class="subscriber__info-name">${json_data.subscribers[i].fullName}</h3>
                <button class="subscriber__info-profile">View profile</button>
            </div>
         </div>`
        }
    }
    subscribersCount.innerText = json_data.subscribers.length + value;
    let body = ""
    for (let i = 0; i < json_data.openListings.length; i++) {

        body = body +
            `
        <div class="flex__item">
            <article class="listing">
            <div class="listing__content">
                <h3 class="title">${json_data.openListings[i].title}</h3>
                <ul id="js-skills" class="skills-req">
        `;

        for (let j = 0; j < json_data.openListings[i].skills.length; j++) {

            body = body +
                `<li>${json_data.openListings[i].skills[j]}</li>`
        }

        body = body +
            ` </ul>
                <div class="actions">
                <button id="js-join" class="join">Join</button>
                <a href="" class="view-listing">View Listing</a>
                </div>
            </div>
            <div class="listing__meta">
                <a href="#">
                <span class="author">${json_data.openListings[i].author}</span>
                </a>
                <a href="#"><span class="place">${json_data.openListings[i].place}</span></a>
            </div>
            <span class="listing__type">${json_data.openListings[i].type}</span>
            </article>
        </div>
        `
    }
    listingsInProgress.innerHTML = body;
    body = ""
    for (let i = 0; i < json_data.closeListings.length; i++) {
        body = body +
            `
        <div class="flex__item">
            <article class="listing">
            <div class="listing__content">
                <h3 class="title">${json_data.closeListings[i].title}</h3>
                <ul id="js-skills" class="skills-req">
        `;
        for (let j = 0; j < json_data.closeListings.skills[i].length; j++) {
            body = body +
                `<li>${json_data.closeListings[i].skills[j]}</li>`
        }
        body = body +
            ` </ul>
                <div class="actions">
                <button id="js-join" class="join">Join</button>
                <a href="" class="view-listing">View Listing</a>
                </div>
            </div>
            <div class="listing__meta">
                <a href="#">
                <span class="author">${json_data.closeListings[i].author}</span>
                </a>
                <a href="#"><span class="place">${json_data.closeListings[i].place}</span></a>
            </div>
            <span class="listing__type">${json_data.closeListings[i].type}</span>
            </article>
        </div>
        `
    }
    listingsFinished.innerHTML = body;
}
export function renderSinglePlacePage() {
    let networkDataReceived = false;
    fetch(`getLocationInformation/${login.getCookie("place")}`)
        .then((resp) => resp.json())
        .then(function (json_data) {
            networkDataReceived = true;
            updateSinglePlacePage(json_data);
        });
    localforage.getItem(`/getLocationInformation/${login.getCookie("place")}`
        , function (err, value) {
            if (!value) throw Error("No data");
            return value;
        }).then(function (data) {
            // don't overwrite newer network data

            if (!networkDataReceived) {
                updateSinglePlacePage(data);
            }
        }).catch(function (error) {
            throw new Error("Problem acessing the cache",error)
        });
}
function updateListingsPage(json_data) {
    let listings = document.getElementById("js-listings-flex");
    let body = ""
    for (let i = 0; i < json_data.length; i++) {

        body = body +
            `
        <div class="flex__item">
            <article class="listing">
            <div class="listing__content">
                <h3 class="title">${json_data[i].title}</h3>
                <ul id="js-skills" class="skills-req">
        `;

        for (let j = 0; j < json_data[i].skills.length; j++) {

            body = body +
                `<li>${json_data[i].skills[j]}</li>`
        }

        body = body +
            ` </ul>
                <div class="actions">
                <button id="js-join" class="join">Join</button>
                <a href="" class="view-listing">View Listing</a>
                </div>
            </div>
            <div class="listing__meta">
                <a href="#">
                <span class="author">${json_data[i].author}</span>
                </a>
                <a href="#"><span class="place">${json_data[i].place}</span></a>
            </div>
            <span class="listing__type">${json_data[i].type}</span>
            </article>
        </div>
        `
    }
    listings.innerHTML = body;
}
export function renderListingsPage() {
    let networkDataReceived = false;

     fetch(`listingsAfterLocation?latitude=${login.getCookie("latitude")}&longtitude=${login.getCookie("longitude")}&username=${login.getCookie("username")}`)
        .then((resp) => resp.json())
        .then(function (json_data) {
            networkDataReceived = true;
            updateListingsPage(json_data);
        })
        .catch(function () {
            throw new Error("Error at getting data from the server for the listings elements")
        })
    localforage.getItem(`/listingsAfterLocation`
        , function (err, value) {
            if (!value) throw Error("No data");
            return value;
        }).then(function (data) {
            // don't overwrite newer network data

            if (!networkDataReceived) {
                updateListingsPage(data);
            }
        }).catch(function (error) {

            throw new Error("Problem acessing the cache",error)
        });


}

