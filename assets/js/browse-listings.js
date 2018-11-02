const listings = document.getElementById('js-listings');

function joinListing ( target ) {
  if (target.id === 'js-join') {
    target.classList.toggle('joined');
    target.innerHTML === "✔" ? target.innerHTML ="Join" : target.innerHTML = "✔";
  }
}

listings.addEventListener('click', (e) => {
  joinListing(e.target);
});