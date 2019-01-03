var modal = document.getElementById('modalJS')
var logInButton = document.getElementById("signInJs");
var close = document.getElementById("closeJS");

logInButton.onclick = function() {
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