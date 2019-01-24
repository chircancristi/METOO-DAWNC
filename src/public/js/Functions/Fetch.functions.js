import * as login from './Login.functions.js';
import * as events from '../Listeners/NavbarEvents.listeners.js';
import * as pagesEvents from '../Listeners/PagesEvents.listeners.js';
import * as render from '../Functions/Render.function.js';

export function fetchAccountData() {
	let networkDataReceived = false;
	let data = {
		username: login.getCookie('username'),
    };
    console.log(data);

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
			networkDataReceived = true;
			render.renderAccountPage(json_data);
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
			}
		})
		.catch(function(error) {
			throw new Error('Problem acessing the cache', error);
		});
}
export function fetchAllPlacesData() {
	let networkDataReceived = false;
	fetch('getPlaces')
		.then(resp => resp.json())
		.then(function(json_data) {
			networkDataReceived = true;
			render.renderAllplaces(data);
		});
	localforage
		.getItem('/getPlaces', function(err, value) {
			if (!value) throw Error('No data');
			return value;
		})
		.then(function(data) {
			// don't overwrite newer network data

			if (!networkDataReceived) {
				render.renderAllplaces(data);
			}
		})
		.catch(function(error) {
			throw new Error('Problem acessing the cache', error);
		});
}

export function fetchSinglePlaceData() {
	let networkDataReceived = false;
	fetch(`getLocationInformation/${login.getCookie('place')}`)
		.then(resp => resp.json())
		.then(function(json_data) {
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
	let networkDataReceived = false;

	fetch(
		`listingsAfterLocation?latitude=${login.getCookie('latitude')}&longtitude=${login.getCookie(
			'longitude'
		)}&username=${login.getCookie('username')}`
	)
		.then(resp => resp.json())
		.then(function(json_data) {
			networkDataReceived = true;
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
				render.renderAllListingsPage(json_data);
				pagesEvents.viewListingEvents();
			}
		})
		.catch(function(error) {
			throw new Error('Problem acessing the cache', error);
		});
}
export function fetchListingData() {
	let networkDataReceived = false;
    
	fetch(
		`/listingAfterName/${login.getCookie("listing")}`
	)
		.then(resp => resp.json())
		.then(function(json_data) {
			networkDataReceived = true;
			render.renderListingPage(json_data);
			
		})
		.catch(function(error) {
			throw new Error('Error at getting data from the server for the listings elements', error);
		});
	localforage
		.getItem(`/listingAfterName?name=${login.getCookie("listing")}`, function(err, value) {
			if (!value) throw Error('No data');
			return value;
		})
		.then(function(data) {
			// don't overwrite newer network data

			if (!networkDataReceived) {
				render.renderListingPage(json_data);
				pagesEvents.viewListingEvents();
			}
		})
		.catch(function(error) {
			throw new Error('Problem acessing the cache', error);
		});
}
