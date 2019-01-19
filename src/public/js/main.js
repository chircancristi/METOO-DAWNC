import * as login from "./Functions/Login.functions.js";
import * as render from "./Functions/Render.functions.js";
import * as navbarEvents from "./Listeners/NavbarEvents.listeners.js";
import * as pagesEvents from "./Listeners/PagesEvents.listeners.js";

window.onload = function () {
   
    if (window.location.pathname == "/index.html" || window.location.pathname == "/" ) {
       
        if (login.checkIfUserIsLogged() == false) {
            render.renderLoginModal();
            navbarEvents.addLoginModalEvents();
            login.login();
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
    if (window.location.pathname == "/single-place.html") {
        render.renderBasicPage();
        pagesEvents.singlePlaceEvents();
    }
    if (window.location.pathname == "/account.html") {
        render.renderBasicPage();
        render.renderAccountPage();
    }
    if (window.location.pathname == "/add-listing.html") {
        render.renderBasicPage();
        pagesEvents.addListingPageEvents();
        render.renderAddListing();
    }
    if (window.location.pathname == "/browse-listings.html") {
        render.renderBasicPage();
        pagesEvents.browseListingsEvents();
    }
    if (window.location.pathname == "/browse-places.html") {
        render.renderBasicPage();
    }

}