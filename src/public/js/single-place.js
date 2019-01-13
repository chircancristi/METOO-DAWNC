

var modal = document.getElementById('subscribed-peopleJS')
var subscribersButton = document.getElementById("subscribers");
var close = document.getElementById("closeJS");



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