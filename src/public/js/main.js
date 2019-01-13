import * as login from "./Functions/Login.functions.js";
import * as render from "./Functions/Render.functions.js";
import * as navbarEvents from "./Listeners/NavbarEvents.listeners.js";
import * as pagesEvents from "./Listeners/PagesEvents.listeners.js";

window.onload = function () {
    if (window.location.pathname == "/index.html") {
       
        if (login.checkIfUserIsLogged() == false) {
            render.renderLoginModal();
            navbarEvents.addLoginModalEvents();
            login.login();
        }
        navbarEvents.addNavbarEvents();
        document.getElementById("js-google-maps-api").addEventListener("load", render.renderMainPage());
        
    }
    if (window.location.pathname == "/login.html") {
        login.login();
        navbarEvents.addNavbarEvents();
        
    }
    if (window.location.pathname == "/single-listing.html") {
    
        render.basicPageRendering();
      
    }
    if (window.location.pathname == "/single-place.html") {
        render.basicPageRendering();
        pagesEvents.singlePlaceEvents();
    }
    if (window.location.pathname == "/account.html") {
        render.basicPageRendering();
        render.accountPageRendering();
    }
    if (window.location.pathname == "/add-listing.html") {
        render.basicPageRendering();
        pagesEvents.addListingPageEvents();
    }
    if (window.location.pathname == "/browse-listings.html") {
        render.basicPageRendering();
        pagesEvents.browseListingsEvents();
    }
    if (window.location.pathname == "/browse-places.html") {
        render.basicPageRendering();
    }

}