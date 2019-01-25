import * as login from "./Functions/Login.functions.js";
import * as fetch from "./Functions/Fetch.functions.js";
import * as navbarEvents from "./Listeners/NavbarEvents.listeners.js";
import * as pagesEvents from "./Listeners/PagesEvents.listeners.js";
import * as locationFunctions from "./Functions/Location.functions.js";
import * as render from "./Functions/Render.functions.js"
// progressiveEnhancement();

window.onload = function () {
    if (window.location.pathname == "/index.html" || window.location.pathname == "/" ) {
        if (login.checkIfUserIsLogged() == false) {
            render.renderLoginModal();
            navbarEvents.addLoginModalEvents();
            login.login();
        }
        else{
            fetch.fetchNotifications();
        }

        navbarEvents.addNavbarEvents();
        render.renderMainPage();
    }
    
    if (window.location.pathname == "/login.html" || window.location.pathname == "/login") {
        login.login();
        navbarEvents.addNavbarEvents();
    }
    
    if (window.location.pathname == "/single-listing.html") {
        render.renderBasicPage();
    }
    
    if (window.location.pathname == "/single-place.html" || window.location.pathname == "/single-place") {
        render.renderBasicPage();
        pagesEvents.singlePlaceEvents();
        fetch.fetchSinglePlaceData();
    }
    
    if (window.location.pathname == "/account.html") {
        render.renderBasicPage();
        fetch.fetchAccountData();
    }
    
    if (window.location.pathname == "/add-listing.html") {
        render.renderBasicPage();
        pagesEvents.addListingPageEvents();
        render.renderAddListing();
    }
    
    if (window.location.pathname == "/browse-listings.html") {
        if (login.getCookie("status")=="" && login.getCookie("status")!="denied") {
            locationFunctions.saveLocation();
        }

        render.renderBasicPage();
        fetch.fetchAllListingsData();
    }
    
    if (window.location.pathname == "/browse-places.html") {
        render.renderBasicPage();
        fetch.fetchAllPlacesData();
    }
    if (  window.location.pathname=="/single-listing" )
    {
        render.renderBasicPage();
        fetch.fetchListingData();
    }
}

async function progressiveEnhancement() {
    if ( 'serviceWorker' in navigator ) {
        const registration = await navigator.serviceWorker.register("/sw.js");

        registration.onupdatefound = () => {
            console.log("Installing new Service Worker ...");

            registration.installing.onstatechange = function() {
                console.log(this.state);
            }
        }
    }
}
