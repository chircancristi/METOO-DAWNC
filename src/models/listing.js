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
			timestampsInSnapshots: true,
		};

		db.settings(settings);

		db.collection('Listing')
			.get()
			.then(function(querySnapshot) {
				let size = querySnapshot.size;
				let listingId = `l${size + 1}`;

				db.collection('Listing')
					.doc(listingId)
					.set({
						type: data.type,
						status: 'active',
						author: data.author,
						title: data.title,
						description: data.description,
						skills: data.skills,
						place: data.place,
						concept: data.concept,
						comments: [],
						contributors: [],
						id: listingId,
					})
					.then(() => {
						place.updatePlaceWithListing(firebase, data.place, listingId);
						place.sendNotificationToSubscribers(firebase,data.place,listingId,data.author);
						
					})
					.catch(error => {
						throw new Error(error);
					});
			});
	}
	static getListingsAtLocation(place, firebase) {
		const db = firebase.firestore();
		const settings = {
			timestampsInSnapshots: true,
		};

		db.settings(settings);

		let listings = [];
		return db
			.collection('Listing')
			.where('place', '==', place)
			.get()
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
	static sendNotificationToContribuitors(firebase, author, listingId,place){
		const db = firebase.firestore();
		const settings = {
			timestampsInSnapshots: true,
		};

		db.settings(settings);

		db.collection('Notification')
			.get()
			.then(function(querySnapshot) {
				let size = querySnapshot.size;
				let notificationId = `n${size + 1}`;

				db.collection('Notification')
					.doc(notificationId)
					.set({
						listing: listingId,
						id: notificationId,
						src: author,
						type: 'comment',
						place: place,
					})
					.then(() => {
						db.collection('Listing')
							.where('id', '==', listingId)
							.get()
							.then(function(querySnapshot) {
								querySnapshot.forEach(function(doc) {
									let contributors = doc.data().contributors;
									for (let i = 0; i < contributors.length; i++) {
										if (author!=contributors[i]){
										let userData = db.collection('User').doc(contributors[i]);
										userData.get().then(function(user) {

											let newNotification=user.data().notifications;
											let newNotificationStatus= user.data().notifications;
											newNotification.push(notificationId)
											newNotificationStatus.push(false);
											db.collection('User')
												.doc(contributors[i])
												.update({
													notifications: newNotification,
													notificationsStatus:newNotificationStatus
												});
										});
									}
								}
								if (author!=doc.data().author){
									let userData = db.collection('User').doc(doc.data().author);
										userData.get().then(function(user) {

											let newNotification=user.data().notifications;
											let newNotificationStatus= user.data().notifications;
											newNotification.push(notificationId)
											newNotificationStatus.push(false);
											db.collection('User')
												.doc(doc.data().author)
												.update({
													notifications: newNotification,
													notificationsStatus:newNotificationStatus
												});
										});
								}
								
								});
							
							})
							.catch(error => {
								throw new Error(error);
							});
					})
					.catch(error => {
						throw new Error(error);
					});
			});
	}
	
	static getUserListing(username, firebase) {
		const db = firebase.firestore();
		const settings = {
			timestampsInSnapshots: true,
		};

		db.settings(settings);

		return db
			.collection('Listing')
			.get()
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
	static getListingByName(name, firebase) {
		const db = firebase.firestore();
		const settings = {
			timestampsInSnapshots: true,
		};

		db.settings(settings);

		listing = db
			.collection('Listing')
			.where('id', '==', name)
			.get()
			.then(function(listings) {
				let returnListing;
				listings.forEach(function(doc) {
					returnListing = doc.data();
				});
				return returnListing;
			});
		return listing;
	}
}

var listing = Listing;
module.exports = listing;
