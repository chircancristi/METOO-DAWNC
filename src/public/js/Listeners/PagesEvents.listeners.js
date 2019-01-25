import * as addListing from '../Functions/AddListing.functions.js';
import * as place from '../Functions/Places.functions.js';
import * as singleListing from '../Functions/SingleListing.functions.js';
import * as requests from '../Functions/Requests.functions.js';
import * as login from '../Functions/Login.functions.js';
import * as render from '../Functions/Render.functions.js';

export function singlePlaceEvents() {
	var slideIndex = 1;

	var modal = document.getElementById('subscribed-peopleJS');
	var subscribersButton = document.getElementById('js-subscribers-count');
	var close = document.getElementById('closeJS');

	subscribersButton.onclick = function() {
		modal.style.display = 'block';
	};
	close.onclick = function() {
		modal.style.display = 'none';
	};

	window.onclick = function(event) {
		if (event.target == modal) {
			modal.style.display = 'none';
		}
	};
}

export function addListingPageEvents() {
	document.getElementById('js-listing-type').addEventListener('click', e => {
		addListing.sliderMove(e.target);
	});

	document.getElementById('js-listing-implement').addEventListener('click', e => {
		addListing.setType('Coding');
		addListing.changeQuestion(e.target, 'implement');
	});

	document.getElementById('js-listing-study').addEventListener('click', e => {
		addListing.setType('Study');
		addListing.changeQuestion(e.target, 'study');
	});
}
//browse listings

//browse places
export function browsePlacesEvents() {
	let placesTrigger = document.getElementsByClassName('grid__item');

	for (let i = 0; i < placesTrigger.length; i++) {
		placesTrigger[i].addEventListener('click', function() {
			var now = new Date();
			var time = now.getTime();
			time += 3600 * 1000;
			now.setTime(time);

			document.cookie = 'place=' + placesTrigger[i].id + '; expires=' + now.toUTCString() + '; path=/';
		});
	}
}
//single page
export function singlePageEvents() {
	document.getElementById('js-subscribe-button').addEventListener('click', place.subscribe);
}
export function viewListingEvents() {
	let listings = document.getElementsByClassName('view-listing');
	let join = document.getElementsByClassName('join');
	let search = document.getElementById('js-search-button');
	let searchValue = document.getElementById('js-search-value');

	for (let i = 0; i < listings.length; i++) {
		listings[i].addEventListener('click', function() {
			var now = new Date();
			var time = now.getTime();
			time += 3600 * 1000;
			now.setTime(time);

			document.cookie = 'listing=' + listings[i].id + '; expires=' + now.toUTCString() + '; path=/';
			document.location.href = `/single-listing`;
		});
	}
	for (let i = 0; i < join.length; i++) {
		join[i].addEventListener('click', function() {
			let type = '';
			join[i].classList.toggle('joined');
			join[i].innerHTML === '✔'
				? ((join[i].innerHTML = 'Join'), (type = 'leave'))
				: ((join[i].innerHTML = '✔'), (type = 'join'));
			let listing = join[i].value;
			let data = {
				user: login.getCookie('username'),
				listing: listing,
				imgUrl: login.getCookie('imgUrl'),
				type: type,
			};

			requests.postDataToServer('/joinListing', data);
		});
	}
	search.addEventListener('click',function(){
		let networkDataReceived = false;
		let value=searchValue.value;
		fetch(
			`listingsAfterLocation?latitude=${login.getCookie('latitude')}&longtitude=${login.getCookie(
				'longitude'
			)}&username=${login.getCookie('username')}`
		)
			.then(resp => resp.json())
			.then(function(json_data) {
				networkDataReceived = true;
				for (let i=0;i<json_data.length;i++){
					console.log(value);
					if (!json_data[i].place.includes(value))
					{
						json_data.splice(i, 1);
						i = i - 1;
					}
				}
				render.renderAllListingsPage(json_data);
				viewListingEvents();
			})
			.catch(function(error) {
				throw new Error( error);
			});
		localforage
			.getItem(`/listingsAfterLocation`, function(err, value) {
				if (!value) throw Error('No data');
				return value;
			})
			.then(function(data) {
				// don't overwrite newer network data
	
				if (!networkDataReceived) {
					for (i=0;i<json_data.length;i++){
						if (!json_data[i].place.contains(value))
						{
							json_data[i].splice(i, 1);
							i = i - 1;
						}
					}
					render.renderAllListingsPage(json_data);

					viewListingEvents();
				}
			})
			.catch(function(error) {
				throw new Error('Problem acessing the cache', error);
			});
	})
}
export function singleListingEvents() {
	let postComment = document.getElementById('js-post-comment');
	postComment.addEventListener('click', singleListing.sendMessage);
}
export function notificationEvents(){
	let notifications =document.getElementsByClassName("notification")
	for (let i=0;i<notifications.length;i++)
	{
		notifications[i].addEventListener('click',function(){
			var now = new Date();
			var time = now.getTime();
			time += 3600 * 1000;
			now.setTime(time);

			document.cookie = 'listing=' + notifications[i].id + '; expires=' + now.toUTCString() + '; path=/';
			document.location.href = `/single-listing`;
		})

	}
}
export function requestEvents(){
	let acceptButtons=document.getElementsByClassName("accept");
	let denyButtons=document.getElementsByClassName("deny");

	for (let i=0;i<acceptButtons.length;i++){
		acceptButtons[i].addEventListener('click',function(){
			let data={
				type:"accept",
				request:acceptButtons[i].id
			}
			requests.postDataToServer("\manageRequest",data);
			document.getElementById("body"+acceptButtons[i].id).style.display="none";
			console.log("body"+acceptButtons[i].id);
		})
	}
	for (let i=0;i<denyButtons.length;i++){
		denyButtons[i].addEventListener('click',function(){
				let data={
					type:"deny",
					request:denyButtons[i].id
				}
				requests.postDataToServer("\manageRequest",data);
	
				document.getElementById("body"+denyButtons[i].id).style.display="none";
		})
	}
}
export function listingsAcountEvents(){
	 let listings=document.getElementsByClassName("listing");
	 for ( let i=0;i<listings.length;i++){
		 listings[i].addEventListener('click',function(){
			var now = new Date();
			var time = now.getTime();
			time += 3600 * 1000;
			now.setTime(time);

			document.cookie = 'listing=' + listings[i].id + '; expires=' + now.toUTCString() + '; path=/';
			document.location.href = `/single-listing`;
		 })
	 }

}