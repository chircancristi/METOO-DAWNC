var slideIndex = 1;
var slides = document.getElementsByClassName("slide");
var modal = document.getElementById('subscribed-peopleJS')
var subscribersButton = document.getElementById("subscribers");
var close = document.getElementById("closeJS");

showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function showSlides(n) {
  var i;
  
  if (n > slides.length) {slideIndex = 1}    
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.opacity = "0";  
  }
  slides[slideIndex-1].style.opacity = "1";  

}


subscribersButton.onclick = function() {
  modal.style.display = "block";
}
close.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}