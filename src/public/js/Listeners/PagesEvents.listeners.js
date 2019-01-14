import * as addListing from "../Functions/AddListing.functions.js"
function plusSlides(n) {
    showSlides(slideIndex += n);
}

function showSlides(n) {
    var i;

    if (n > slides.length) { slideIndex = 1 }
    if (n < 1) { slideIndex = slides.length }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.opacity = "0";
    }
    slides[slideIndex - 1].style.opacity = "1";

}


export function singlePlaceEvents() {
    var slides = document.getElementsByClassName("slide");
    var slideIndex = 1;
    showSlides(slideIndex);
    var slideIndex = 1;
    var slides = document.getElementsByClassName("slide");
    var modal = document.getElementById('subscribed-peopleJS')
    var subscribersButton = document.getElementById("subscribers");
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
        addListing.changeQuestion(e.target, "implement");
        addListing.setType("implement");
    });

    document.getElementById("js-listing-study").addEventListener("click", (e) => {
        addListing.changeQuestion(e.target, "study");
        addListing.setType("study");
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
