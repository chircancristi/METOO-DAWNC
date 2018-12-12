var slideIndex = 1;
var slides = document.getElementsByClassName("slide");

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