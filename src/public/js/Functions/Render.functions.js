import * as login from "./Login.functions.js";
import * as events from "../Listeners/NavbarEvents.listeners.js";
import * as pagesEvents from "../Listeners/PagesEvents.listeners.js";
import * as markup from "./Markup.functions.js";

export function renderBasicPage() {
	if (login.checkIfUserIsLogged() == false) document.location.href = '/login';
	events.addNavbarEvents();
}

export function renderLoginModal() {
	let modalHtml = document.getElementById('nav--modalJS');
	let modalHtmLMobile = document.getElementById('nav--mobileJS');
	let modalButtonNav = document.getElementById('nav--mainJS');

	let html = " <li class='modal__button' id='signInJs'><a>Sign in</a></li>";
	modalButtonNav.innerHTML = modalButtonNav.innerHTML + html;
	html = " <li class='modal__button' id='signInMobileJs'><a>Sign in</a></li>";
	modalHtmLMobile.innerHTML = modalHtmLMobile.innerHTML + html;
	html = `
  <ul class='modal__content-list'>
      <span id='closeJS'class='modal-content__close'>&times;</span> 
      <div class='modal__content-title'><h3>Please sign in</h3>
      </div>
      <li id='js-login-google' class='list__element list__element--google'>
          <img src='/images/google.png'> 
          <div class='list__element-name'><a>Google</a></div> 
      </li>
      <li id='js-loginGithub' class='list__element list__element--github'>
          <img src='/images/github.png'>
          <div class='list__element-name'><a>Github</a></div>
      </li>
  </ul> `;
	modalHtml.innerHTML = html;
	html = " <script src='/js/login.js'></script>";
	document.getElementsByTagName('html').innerHTML = document.getElementsByTagName('html').innerHTML + html;
}

export function renderMainPage() {
	let map;
	
	initMap();
	fetch('favouritePlaces')
		.then(resp => resp.json())
		.then(function(json_data) {
			let sizeY;
			let sizeX = (sizeY = 60);

			let icon = {
				url: '../images/place5.png', // url
				scaledSize: new google.maps.Size(sizeX, sizeY), // scaled size
				origin: new google.maps.Point(0, 0), // origin
				anchor: new google.maps.Point(0, 0), // anchor
			};

			let uluru;
			for (let i = json_data.length - 1; i >= 0; i--) {
				uluru = { lat: json_data[i].geolocation._lat, lng: json_data[i].geolocation._long };
				let marker = new google.maps.Marker({ position: uluru, map: map, icon: icon });

				marker.addListener('click', function() {
					infowindow.open(marker.get('map'), marker);
				});

				let infowindow = new google.maps.InfoWindow({
					content: json_data[i].name,
				});

				sizeX += 20;
				sizeY += 20;

				icon = {
					url: '../images/place' + (i + 1) + '.png', // url
					scaledSize: new google.maps.Size(sizeX, sizeY), // scaled size
					origin: new google.maps.Point(0, 0), // origin
					anchor: new google.maps.Point(0, 0), // anchor
				};
			}
		})
		.catch(function(error) {
			throw new Error(error);
		});

	function initMap() {
		let uluru = { lat: 47.166478, lng: 27.580477 };

		map = new google.maps.Map(document.getElementById('map'), {
			zoom: 13,
			center: uluru,
		});
	}
}

export function renderAccountPage( responseJSON ) {
	let displayName = document.getElementById('js-name');
	let profilePic = document.getElementById('js-profile-pic');
	let likes = document.getElementById('js-likes');
	let dislikes = document.getElementById('js-dislikes');
	let skills = document.getElementById('js-skills');
	let favouritePlace = document.getElementById('js-favourite-place');
	let listingsCompleted = document.getElementById('js-listings-completed');
	let listingsActive = document.getElementById('js-listings-active');

	displayName.innerText = responseJSON.userData.fullName;
	profilePic.src = responseJSON.userData.imgUrl;
	likes.innerText = responseJSON.userData.likes;
	dislikes.innerText = responseJSON.userData.dislikes;

	responseJSON.userData.skills.forEach( (item) => {
		let skillEl = markup.skill( item, true );

		skills.appendChild( skillEl );
	});

	let addSkillBtn = markup.addSkill();
	let editSkillsBtn = markup.editSkills();

	skills.appendChild( addSkillBtn );
	skills.appendChild( editSkillsBtn );

	let username = login.getCookie('username');
	let listingsAt = {};
	for (let i = 0; i < responseJSON.listings.length; i++) {
		let author = responseJSON.listings[i].author;
		let placeName = responseJSON.listings[i].place;

		if (author === username) {
			if (!listingsAt.hasOwnProperty(placeName)) {
				listingsAt[placeName] = 0;
			}

			listingsAt[placeName]++;
		}

		let body = '';
		if (responseJSON.listings[i].status === 'active') {
			body = body +
				`
            <div class="flex__item">
                <article class="listing">
                <div class="listing__content">
                    <h3 class="title">${responseJSON.listings[i].title}</h3>
                    <ul id="js-skills" class="skills-req">
            `;

			for (let j = 0; j < responseJSON.listings[i].skills.length; j++) {
				body = body + `<li>${responseJSON.listings[i].skills[j]}</li>`;
			}

			body = body +
				` </ul>
                    <div class="actions">
                    <button id="js-join" class="join">Join</button>
                    <a href="" class="view-listing">View Listing</a>
                    </div>
                </div>
                <div class="listing__meta">
                    <a href="#">
                    <span class="author">${responseJSON.listings[i].author}</span>
                    </a>
                    <a href="#"><span class="place">${responseJSON.listings[i].place}</span></a>
                </div>
                <span class="listing__type">${responseJSON.listings[i].type}</span>
                </article>
            </div>
            `;
			listingsActive.innerHTML = listingsActive.innerHTML + body;
		} else {
			body = body +
				`
        <div class="flex__item">
            <article class="listing">
            <div class="listing__content">
                <h3 class="title">${responseJSON.listings[i].title}</h3>
                <ul id="js-skills" class="skills-req">
        `;

			for (let j = 0; j < responseJSON.listings[i].skills.length; j++) {
				body = body + `<li>${responseJSON.listings[i].skills[j]}</li>`;
			}

			body = body +
				` </ul>
                <div class="actions">
                <button id="js-join" class="join">Join</button>
                <a href="" class="view-listing">View Listing</a>
                </div>
            </div>
            <div class="listing__meta">
                <a href="#">
                <span class="author">${responseJSON.listings[i].author}</span>
                </a>
                <a href="#"><span class="place">${responseJSON.listings[i].place}</span></a>
            </div>
            <span class="listing__type">${responseJSON.listings[i].type}</span>
            </article>
        </div>
        `;
			listingsCompleted.innerHTML = listingsActive.innerHTML + body;
		}
	}
	
	let max = 0;
	let favouritePlaceName = '';
	for ( let place in listingsAt ) {
		if ( listingsAt[place] > max ) {
			max = listingsAt[place];
			favouritePlaceName = place;
		}
	}
	
	favouritePlace.innerText = favouritePlaceName;
}

export function renderAddListing() {
	let placesImplement = document.getElementById('js-input-place-implement');
	let placesStudy = document.getElementById('js-input-place-study');
	fetch('getPlaces')
		.then(resp => resp.json())
		.then(function(json_data) {
			for (let i = 0; i < json_data.length; i++) {
				placesImplement.innerHTML =
					placesImplement.innerHTML + `<option value="${json_data[i].name}">${json_data[i].name} </option>`;
				placesStudy.innerHTML =
					placesStudy.innerHTML + `<option value="${json_data[i].name}"> ${json_data[i].name} </option>`;
			}
		});
}

export function renderAllplaces(json_data) {
	let placesGrid = document.getElementById('js-places-grid');
	placesGrid.innerHTML = '';
	for (let i = 0; i < json_data.length; i++) {
		placesGrid.innerHTML =
			placesGrid.innerHTML +
			`<a href="/single-place.html" id= ${json_data[i].name}  class="grid__item">
<article class="card">
  <div class="card__content">
    <h2 class="card__title">` +
			json_data[i].name +
			`</h2>
  </div>
  <picture class="card_image">
    <source media="(min-width: 800px)" srcset="${json_data[i].img[0]}" type="image/webp">
    <source media="(min-width: 800px)" srcset="${json_data[i].img[1]}" type="image/jpg">
    <source media="(min-width: 600px)" srcset="${json_data[i].img[2]}" type="image/webp">
    <source media="(min-width: 600px)" srcset="${json_data[i].img[3]}" type="image/jpg">
    <source media="(min-width: 300px)" srcset="${json_data[i].img[4]}" type="image/webp">
    <source media="(min-width: 300px)" srcset="${json_data[i].img[5]}" type="image/jpg">  
    <img src="${json_data[i].img[3]}" style="width:100%;height: 100%;">
  </picture>
</article>
 </a>`;
	}
	pagesEvents.browsePlacesEvents();
}

export function renderSinglePlacePage(json_data) {
	let subscribersModal = document.getElementById('js-subscribers-modal');
	let subscribersCount = document.getElementById('js-subscribers-count');
	let listingsInProgress = document.getElementById('js-listings-in-progress');
	let listingsFinished = document.getElementById('js-finished-listings');

	document.getElementById('js-place-img').innerHTML = `
  <picture class="card_image">
  <source media="(min-width: 800px)" srcset="${json_data.locationInformation.img[0]}" type="image/webp">
  <source media="(min-width: 800px)" srcset="${json_data.locationInformation.img[1]}" type="image/jpg">
  <source media="(min-width: 600px)" srcset="${json_data.locationInformation.img[3]}"  type="image/webp">
  <source media="(min-width: 600px)" srcset="${json_data.locationInformation.img[4]}"  type="image/jpg">
  <source media="(min-width: 300px)" srcset="${json_data.locationInformation.img[5]}"  type="image/webp">
  <source media="(min-width: 300px)" srcset="${json_data.locationInformation.img[6]}"  type="image/jpg">  
  <img src="${json_data.locationInformation.img[7]}" style="width:100%;height: 100%;">
   </picture>`;

	let value = 0;

	document.getElementById('js-place-name').innerText = json_data.locationInformation.name;
	pagesEvents.singlePageEvents();
	for (let i = 0; i < json_data.subscribers.length; i++) {
		if (json_data.subscribers[i].fullName === login.getCookie('username')) {
			document.getElementById('js-subscribe-title').innerHTML = 'Unsubscribe';
			value = -1;
		} else {
			subscribersModal.innerHTML =
				subscribersModal.innerHTML +
				`<div class="subscriber-container">
          <img class="subscriber__pic" src="${json_data.subscribers[i].imgUrl}">
          <div class="subscriber__info">
              <h3 class="subscriber__info-name">${json_data.subscribers[i].fullName}</h3>
              <button class="subscriber__info-profile" >View profile</button>
          </div>
       </div>`;
		}
	}
	subscribersCount.innerText = json_data.subscribers.length + value;
	let body = '';
	for (let i = 0; i < json_data.openListings.length; i++) {
		body =
			body +
			`
      <div class="flex__item">
          <article class="listing">
          <div class="listing__content">
              <h3 class="title">${json_data.openListings[i].title}</h3>
              <ul id="js-skills" class="skills-req">
      `;

		for (let j = 0; j < json_data.openListings[i].skills.length; j++) {
			body = body + `<li>${json_data.openListings[i].skills[j]}</li>`;
		}

		body =
			body +
			` </ul>
              <div class="actions">
              <button id="js-join" class="join">Join</button>
              <a href="" class="view-listing">View Listing</a>
              </div>
          </div>
          <div class="listing__meta">
              <a href="#">
              <span class="author">${json_data.openListings[i].author}</span>
              </a>
              <a href="#"><span class="place">${json_data.openListings[i].place}</span></a>
          </div>
          <span class="listing__type">${json_data.openListings[i].type}</span>
          </article>
      </div>
      `;
	}
	listingsInProgress.innerHTML = body;
	body = '';
	for (let i = 0; i < json_data.closeListings.length; i++) {
		body =
			body +
			`
      <div class="flex__item">
          <article class="listing">
          <div class="listing__content">
              <h3 class="title">${json_data.closeListings[i].title}</h3>
              <ul id="js-skills" class="skills-req">
      `;
		for (let j = 0; j < json_data.closeListings[i].skills.length; j++) {
			body = body + `<li>${json_data.closeListings[i].skills[j]}</li>`;
		}
		body =
			body +
			` </ul>
              <div class="actions">
              <button id="js-join" class="join">Join</button>
              <a href="" class="view-listing">View Listing</a>
              </div>
          </div>
          <div class="listing__meta">
              <a href="#">
              <span class="author">${json_data.closeListings[i].author}</span>
              </a>
              <a href="#"><span class="place">${json_data.closeListings[i].place}</span></a>
          </div>
          <span class="listing__type">${json_data.closeListings[i].type}</span>
          </article>
      </div>
      `;
	}
	listingsFinished.innerHTML = body;
}

export function renderAllListingsPage(responseJSON) {
	let listingsContainer = document.getElementById('js-listings-flex');
	const listings = responseJSON;

	listings.forEach((listing) => {
		let listingEl = markup.browseListing( listing );

		listingsContainer.appendChild( listingEl );
	});
}

export function renderListingPage(json_data) {
	let title = document.getElementById('js-listing-title');
	let type = document.getElementById('js-listing-type');
	let place = document.getElementById('js-listing-place');
	let header = document.getElementById('js-listing-header');
	let skillsContainer = document.getElementById('js-listing-skills');
	let description = document.getElementById('js-listing-desc');
	let contributors = document.getElementById('js-listing-contributors');
	let contributorsCount = document.getElementById('js-listing-contributors-count');

	let userFound = false;
	let username = login.getCookie('username');
	let postedComments = document.getElementById('js-posted-comments');

	if (json_data.listing.author === username) {
		userFound = true;
		var now = new Date();
		var time = now.getTime();
		time += 3600 * 1000;
		now.setTime(time);

		document.cookie = 'role=author; expires=' + now.toUTCString() + '; path=/';
	}

	title.innerText = json_data.listing.title;
	type.innerText = json_data.listing.type;
	place.innerText = json_data.listing.place;
	header.innerHTML =
		header.innerHTML +
		` <a href="" id='${json_data.listing.author}' class="author">${json_data.listing.author}</a>`;
	skillsContainer.innerHTML = '';

	let skills = json_data.listing.skills;
	skills.forEach((skill) => {
		let skillEl = markup.skill( skill, true );

		skillsContainer.appendChild( skillEl );
	});

	description.innerText = json_data.listing.description;

	if (json_data.listing.contributors.length != 0) contributorsCount.innerHTML = json_data.listing.contributors.length;
	contributors.innerHTML = '';
	for (let i = 0; i < json_data.listing.contributors.length; i++) {
		if (json_data.listing.contributors[i] === username) {
			userFound = true;
			var now = new Date();
			var time = now.getTime();
			time += 3600 * 1000;
			now.setTime(time);

			document.cookie = 'role=contributor; expires=' + now.toUTCString() + '; path=/';
		}
		contributors.innerHTML =
			contributors.innerHTML +
			`<li class="contributor"><a id='${json_data.listing.contributors[i]}' href="">${
				json_data.listing.contributors[i]
			}</a></li>`;
	}
	
	if (userFound == true) {
		postedComments.style.display = 'block';
	
		let jsComments = document.getElementById('js-comments-container');
		jsComments.innerHTML = '';

		for (let i = 0; i < json_data.comments.length; i++) {
			renderComment(json_data.comments[i]);
		}
	}
}

export function renderComment(commentData) {
	let commentsContainer = document.getElementById('js-comments-container');
	let commentEl = markup.comment( commentData );
	
	commentsContainer.appendChild( commentEl );
}
export function renderNotifications(json_data){
	let notificationsContainer=document.getElementById("js-notification-container")
	for (let i=json_data.length-1;i>=0;i--){
		let notification=markup.notification(json_data[i]);
		notificationsContainer.appendChild(notification);
	}
}