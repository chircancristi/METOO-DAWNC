const place = require('./place');
const user = require('./user');
class Listing {
	constructor() {}
	static Deg2Rad(deg) {
		return (deg * Math.PI) / 180;
	}
	static PythagorasEquirectangular(lat1, lon1, lat2, lon2) {
		lat1 = this.Deg2Rad(lat1);
		lat2 = this.Deg2Rad(lat2);
		lon1 = this.Deg2Rad(lon1);
		lon2 = this.Deg2Rad(lon2);
		var R = 6371; // km
		var x = (lon2 - lon1) * Math.cos((lat1 + lat2) / 2);
		var y = lat2 - lat1;
		var d = Math.sqrt(x * x + y * y) * R;
		return d;
	}
	static getCommunCh(str1, str2) {
		let communCh = 0;
		for (let j = 0; j < str1.length; j++) {
			for (let k = 0; k < str2.length; k++) {
				if (str1[j] == str2[k]) {
					communCh = communCh + 1;
				}
			}
		}
		return communCh;
	}
	static sortPlaces(places, data) {
		places.sort((a, b) => {
			let Avalue = this.PythagorasEquirectangular(
				a.geolocation.latitude,
				a.geolocation.longitude,
				data.latitude,
				data.longitude
			);
			let Bvalue = this.PythagorasEquirectangular(
				b.geolocation.latitude,
				b.geolocation.longitude,
				data.latitude,
				data.longitude
			);
			return Avalue - Bvalue;
		});
		return places;
	}
	static sortListings(listings, userData) {
		listings.sort((a, b) => {
			let communChA = this.getCommunCh(a.skills, userData.skills);
			let communChB = this.getCommunCh(b.skills, userData.skills);
			return communChB - communChA;
		});
		return listings;
	}
	static getUsersListings(firebase, data) {
		let getListings = user
			.getUserInformation(firebase, data.username)
			.then(userData => {
				let getPlaces = place
					.getAllPlaces(firebase)
					.then(async places => {
						if (data.latitude != '') {
							places = this.sortPlaces(places, data);

							let finalListings = [];

							for (let i = 0; i < places.length; i++) {
								await this.getListingsAtLocation(places[i].name, firebase).then(listings => {
									listings = this.sortListings(listings, userData);
									finalListings = finalListings.concat(listings);
								});
							}
							return finalListings;
						} else {
							let finalListings = [];
							for (let i = 0; i < places.length; i++) {
								await this.getListingsAtLocation(places[i].name, firebase).then(listings => {
									finalListings = finalListings.concat(listings);
								});
							}
							finalListings = this.sortListings(finalListings, userData);
							return finalListings;
						}
					})
					.catch(error => {
						throw new Error(error);
					});
				return getPlaces;
			})
			.catch(error => {
				throw new Error(error);
			});
		return getListings;
	}

	static addListing(firebase, data) {
		const db = firebase.firestore();
		const settings = {
			timestampsInSnapshots: true
		};
		
		db.settings(settings);

		db.collection('Listing').get()
			.then( function(querySnapshot) {
				let size = querySnapshot.size;
				let listingId = `l${size + 1}`;

				db.collection('Listing').doc(listingId).set({
						type: data.type,
						status: 'opened',
						author: data.author,
						title: data.title,
						description: data.description,
						skills: data.skills,
						place: data.place,
						concept: data.concept,
						comments: [],
						contributors: [],
					})
					.then(() => {
						place.updatePlaceWithListing(firebase, data.place, listingId);
						console.log('Document succesfully written! ✅');
					})
					.catch(error => {
						throw new Error(error);
					});
		});
	}
	static getListingsAtLocation(place, firebase) {
		const db = firebase.firestore();
		const settings = {
			timestampsInSnapshots: true
		};
		
		db.settings(settings);
		
		let listings = [];
		return db.collection('Listing').where('place', '==', place).get()
			.then(function(querySnapshot) {
				querySnapshot.forEach(function(doc) {
					// doc.data() is never undefined for query doc snapshots
					listings.push(doc.data());
				});

				return listings;
			})
			.catch(error => {
				throw new error(error);
			});
	}
	static getUserListing(username, firebase) {
		const db = firebase.firestore();
		const settings = {
			timestampsInSnapshots: true
		};
		
		db.settings(settings);

		return db.collection('Listing').get()
			.then(function(querySnapshot) {
				let listings = [];

				querySnapshot.forEach(function(doc) {
					if (doc.data().author === username) {
						listings.push(doc.data());
					} else {
						for (let i = 0; i < doc.data().contributors.length; i++) {
							if (doc.data().contributors[i] === username) {
								listings.push(doc.data());
							}
						}
					}
				});

				return listings;
		});
	}
}

var listing = Listing;
module.exports = listing;
