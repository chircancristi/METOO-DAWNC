const navTrigger = document.getElementById('js-nav-trigger'); 
const navClose = document.getElementById('js-nav-close');
const navWrapper = document.getElementById('js-nav-wrapper');

navTrigger.addEventListener( 'click', () => navWrapper.classList.toggle('is-visible') );
navClose.addEventListener( 'click', () => navWrapper.classList.toggle('is-visible') );