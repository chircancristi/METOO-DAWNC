class Place {
	static getFavoritePlaces(firebase) {
		const db = firebase.firestore();
		const settings = {
			timestampsInSnapshots: true,
		};

		db.settings(settings);

		let places = [];
		let aux;

		return db
			.collection('Place')
			.get()
			.then(function(querySnapshot) {
				querySnapshot.forEach(function(doc) {
					// doc.data() is never undefined for query doc snapshots
					places.push(doc.data());
				});

				for (let i = 0; i < places.length - 1; i++) {
					for (let j = i + 1; j < places.length; j++) {
						if (places[i].listings.length < places[j].listings.length) {
							aux = places[i];
							places[i] = places[j];
							places[j] = aux;
						}
					}
				}

				if (places.length > 5) {
					places.splice(5, places.length - 5);
				}

				return places;
			})
			.catch(function(error) {
				throw new Error(error);
			});
	}

	static getAllPlaces(firebase) {
		const db = firebase.firestore();
		const settings = {
			timestampsInSnapshots: true,
		};

		db.settings(settings);

		let places = [];
		let aux;

		return db
			.collection('Place')
			.get()
			.then(function(querySnapshot) {
				querySnapshot.forEach(function(doc) {
					// doc.data() is never undefined for query doc snapshots
					places.push(doc.data());
				});

				return places;
			})
			.catch(function(error) {
				throw new Error(error);
			});
	}

	static updatePlaceWithListing(firebase, place, listing) {
		const db = firebase.firestore();
		const settings = {
			timestampsInSnapshots: true,
		};

		db.settings(settings);

		db.collection('Place')
			.where('name', '==', place)
			.get()
			.then(function(querySnapshot) {
				querySnapshot.forEach(function(doc) {
					// doc.data() is never undefined for query doc snapshots
					let currentListings = doc.data().listings;
					currentListings.push(listing);

					db.collection('Place')
						.doc(doc.id)
						.update({
							listings: currentListings,
						});
				});
			})
			.catch(error => {
				throw new Error(error);
			});
	}

	static getPlaceByName(name, firebase) {
		const db = firebase.firestore();
		const settings = {
			timestampsInSnapshots: true,
		};

		db.settings(settings);

		let data;

		return db
			.collection('Place')
			.where('name', '==', name)
			.get()
			.then(function(querySnapshot) {
				querySnapshot.forEach(function(doc) {
					// doc.data() is never undefined for query doc snapshots
					data = doc.data();
				});

				return data;
			});
	}

	static subscribeToPlace(namePlace, username, firebase) {
		const db = firebase.firestore();
		const settings = {
			timestampsInSnapshots: true,
		};

		db.settings(settings);

		let subscribers = [];
		db.collection('Place')
			.where('name', '==', namePlace)
			.get()
			.then(function(querySnapshot) {
				querySnapshot.forEach(function(doc) {
					subscribers = doc.data().subscribedUsers;

					let index = subscribers.indexOf(username);

					if (index == -1) {
						subscribers.push(username);
					} else {
						subscribers.splice(index, 1);
					}

					db.collection('Place')
						.doc(doc.id)
						.update({
							subscribedUsers: subscribers,
						});
				});
			})
			.catch(error => {
				throw new Error(error);
			});
	}
	static sendNotificationToSubscribers(firebase, place, listingId, author) {
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
						type: 'add-listing',
						place: place,
					})
					.then(() => {
						db.collection('Place')
							.where('name', '==', place)
							.get()
							.then(function(querySnapshot) {
								querySnapshot.forEach(function(doc) {
									let subscribers = doc.data().subscribedUsers;
									for (let i = 0; i < subscribers.length; i++) {
										if (author!=subscribers[i]){
										let userData = db.collection('User').doc(subscribers[i]);
										userData.get().then(function(user) {

											let newNotification=user.data().notifications;
											let newNotificationStatus= user.data().notifications;
											newNotification.push(notificationId)
											newNotificationStatus.push(false);
											db.collection('User')
												.doc(subscribers[i])
												.update({
													notifications: newNotification,
													notificationsStatus:newNotificationStatus
												});
										});
									}
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
}

var place = Place;
module.exports = place;
