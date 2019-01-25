import * as login from './Login.functions.js';
import * as events from '../Listeners/NavbarEvents.listeners.js';
import * as pagesEvents from '../Listeners/PagesEvents.listeners.js';
import * as render from './Render.functions.js';

export function fetchAccountData() {
	let mainEl = document.querySelector('main.main--account');
	let loader = document.getElementById('js-loader');

	let networkDataReceived = false;
	let data = {
		username: login.getCookie('username'),
	};

	let request = new Request('userInformation', {
		method: 'POST',
		body: JSON.stringify(data),
		headers: new Headers({
			'Content-Type': 'application/json',
		}),
	});
	fetch(request)
		.then(resp => resp.json())
		.then(function(json_data) {
			loader.classList.remove('in-view');
			setTimeout(() => {
				mainEl.classList.remove('hidden');
			}, 150);

			networkDataReceived = true;

			render.renderAccountPage(json_data);
			pagesEvents.requestEvents();
			pagesEvents.listingsAcountEvents()
		
		});
	localforage
		.getItem(`/userInformation`, function(err, value) {
			if (!value) throw Error('No data');
			return value;
		})
		.then(function(data) {
			// don't overwrite newer network data

			if (!networkDataReceived) {
				render.renderAccountPage(json_data);
				pagesEvents.requestEvents();
				pagesEvents.listingsAcountEvents()
			}
		})
		.catch(function(error) {
			throw new Error('Problem acessing the cache', error);
		});
}

export function fetchAllPlacesData() {	
	let mainEl = document.querySelector('main.main-content--places');
	let loader = document.getElementById('js-loader');
	let networkDataReceived = false;
	fetch('getPlaces')
		.then(resp => resp.json())
		.then(function(json_data) {
			loader.classList.remove('in-view');
			setTimeout(() => {
				mainEl.classList.remove('hidden');
			}, 150)
			networkDataReceived = true;
			render.renderAllplaces(json_data);
		});
	localforage
		.getItem('/getPlaces', function(err, value) {
			if (!value) throw Error('No data');
			return value;
		})
		.then(function(json_data) {
			// don't overwrite newer network data

			if (!networkDataReceived) {
				render.renderAllplaces(json_data);
			}
		})
		.catch(function(error) {
			throw new Error('Problem acessing the cache', error);
		});
}

export function fetchSinglePlaceData() {
	let mainEl = document.querySelector('main.main-content-place');
	let loader = document.getElementById('js-loader');

	let networkDataReceived = false;
	fetch(`getLocationInformation/${login.getCookie('place')}`)
		.then(resp => resp.json())
		.then(function(json_data) {
			loader.classList.remove('in-view');
			mainEl.classList.remove('hidden');
			networkDataReceived = true;
			render.renderSinglePlacePage(json_data);
		});
	localforage
		.getItem(`/getLocationInformation/${login.getCookie('place')}`, function(err, value) {
			if (!value) throw Error('No data');
			return value;
		})
		.then(function(data) {
			// don't overwrite newer network data

			if (!networkDataReceived) {
				render.renderSinglePlacePage(json_data);
			}
		})
		.catch(function(error) {
			throw new Error('Problem acessing the cache', error);
		});
}

export function fetchAllListingsData() {
	let mainEl = document.querySelector('main.main-content--listings');
	let loader = document.getElementById('js-loader');
	let networkDataReceived = false;

	fetch(
		`listingsAfterLocation?latitude=${login.getCookie('latitude')}&longtitude=${login.getCookie(
			'longitude'
		)}&username=${login.getCookie('username')}`
	)
		.then(resp => resp.json())
		.then(function(json_data) {
			networkDataReceived = true;
			mainEl.classList.remove('hidden');
			loader.classList.remove('in-view');
			render.renderAllListingsPage(json_data);
			pagesEvents.viewListingEvents();
		})
		.catch(function(error) {
			throw new Error('Error at getting data from the server for the listings elements', error);
		});
	localforage
		.getItem(`/listingsAfterLocation`, function(err, value) {
			if (!value) throw Error('No data');
			return value;
		})
		.then(function(data) {
			// don't overwrite newer network data

			if (!networkDataReceived) {
				render.renderAllListingsPage(data);
				pagesEvents.viewListingEvents();
			}
		})
		.catch(function(error) {
			throw new Error('Problem acessing the cache', error);
		});
}

export function fetchListingData() {
	let mainEl = document.querySelector('main.main-content--single-listing');
	let loader = document.getElementById('js-loader');
	let networkDataReceived = false;

	fetch(`/listingAfterName/${login.getCookie('listing')}`)
		.then(resp => resp.json())
		.then(function(json_data) {
			loader.classList.remove('in-view');
			mainEl.classList.remove('hidden');
			networkDataReceived = true;
			render.renderListingPage(json_data);
			pagesEvents.singleListingEvents();
			pagesEvents.notificationEvents();
		})
		.catch(function(error) {
			throw new Error(error);
		});
		
	localforage
		.getItem(`/listingAfterName/${login.getCookie('listing')}`, function(err, value) {
			if (!value) throw Error('No data');
			return value;
		})
		.then(function(data) {
			// don't overwrite newer network data

			if (!networkDataReceived) {
				render.renderListingPage(json_data);
				pagesEvents.singleListingEvents();
			
			}
		})
		.catch(function(error) {
			throw new Error('Problem acessing the cache', error);
		});
}
export function fetchNotifications(){
	let networkDataReceived = false;

	fetch(`/NotificationsForUser/${encodeURI(login.getCookie('username'))}`)
		.then(resp => resp.json())
		.then(function(json_data) {
			networkDataReceived = true;
			render.renderNotifications(json_data);
			pagesEvents.notificationEvents();
	
		})
		.catch(function(error) {
			throw new Error(error);
		});
	localforage
		.getItem(`/NotificationsForUser/${encodeURI(login.getCookie('username'))}`, function(err, value) {
			if (!value) throw Error('No data');
			return value;
		})
		.then(function(data) {
			// don't overwrite newer network data

			if (!networkDataReceived) {
				render.renderNotifications(json_data);
					pagesEvents.notificationEvents();
			}
		})
		.catch(function(error) {
			throw new Error('Problem acessing the cache', error);
		});
}
