import * as addListing from "../Functions/AddListing.functions.js"
import * as place from "..//Functions/Places.functions.js"

export function singlePlaceEvents() {
   
    var slideIndex = 1;
 
    
    var modal = document.getElementById('subscribed-peopleJS')
    var subscribersButton = document.getElementById("js-subscribers-count");
    var close = document.getElementById("closeJS");


    subscribersButton.onclick = function () {
        modal.style.display = "block";
    }
    close.onclick = function () {
        modal.style.display = "none";
    }

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
}




export function addListingPageEvents() {
    document.getElementById("js-listing-type").addEventListener("click", (e) => {
        addListing.sliderMove(e.target);
    });

    document.getElementById("js-listing-implement").addEventListener("click", (e) => {
        addListing.setType("implement");
        addListing.changeQuestion(e.target, "implement");
       
    });

    document.getElementById("js-listing-study").addEventListener("click", (e) => {
        addListing.setType("study");
        addListing.changeQuestion(e.target, "study");
   
    });
}
//browse listings
export function browseListingsEvents() {
    const listings = document.getElementById('js-listings');

    function joinListing(target) {
        if (target.id === 'js-join') {
            target.classList.toggle('joined');
            target.innerHTML === "✔" ? target.innerHTML = "Join" : target.innerHTML = "✔";
        }
    }

    listings.addEventListener('click', (e) => {
        joinListing(e.target);
    });
} 
//browse places 
export function browsePlacesEvents(){
    let placesTrigger=document.getElementsByClassName("grid__item");
 
    for (let i=0 ;i <placesTrigger.length;i++){
        placesTrigger[i].addEventListener('click',function(){
            var now = new Date();
            var time = now.getTime();
            time += 3600 * 1000;
            now.setTime(time);
           
            document.cookie = "place=" + placesTrigger[i].id + "; expires=" + now.toUTCString() + "; path=/";
         
        })
    }
}
//single page
export function singlePageEvents(){
    document.getElementById("js-subscribe-button").addEventListener('click',place.subscribe)
}
