import * as login from "./Functions/Login.functions.js";
import * as render from "./Functions/Render.functions.js";
import * as navbarEvents from "./Listeners/NavbarEvents.listeners.js";
import * as pagesEvents from "./Listeners/PagesEvents.listeners.js";
import * as locationFunctions from "./Functions/Location.functions.js";


window.onload = function () {
    if('serviceWorker' in navigator){
        try {
            navigator.serviceWorker.register("/sw.js")
        } catch (error) {
            throw new Error(error);
        }
    }
    
   
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
    if (window.location.pathname == "/single-place.html" || window.location.pathname == "/single-place") {
        render.renderBasicPage();
        pagesEvents.singlePlaceEvents();
        render.renderSinglePlacePage();
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
      
        if(login.getCookie("status")=="" && login.getCookie("status")!="denied"){
            locationFunctions.saveLocation();
        }
        render.renderBasicPage();
        render.renderListingsPage();
        pagesEvents.browseListingsEvents();
    }
    if (window.location.pathname == "/browse-places.html") {
        render.renderBasicPage();
        render.renderAllPlaces();
   
    }

}
