export function addNavbarEvents() {
    const navTrigger = document.getElementById('js-nav-trigger');
    const navClose = document.getElementById('js-nav-close');
    const navWrapper = document.getElementById('js-nav-wrapper');

    navTrigger.addEventListener('click', () => navWrapper.classList.toggle('is-visible'));
    navClose.addEventListener('click', () => navWrapper.classList.toggle('is-visible'));

}
export function addLoginModalEvents() {
    const modal = document.getElementById('nav--modalJS')
    const logInButton = document.getElementById("signInJs");
    const close = document.getElementById("closeJS");
    const loginInButtonMobile = document.getElementById("signInMobileJs");

    loginInButtonMobile.onclick = function () {
        modal.style.display = "block";
    }

    logInButton.onclick = function () {
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
