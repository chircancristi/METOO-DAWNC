class Request {
	static createRequest(firebase, data) {
		const db = firebase.firestore();
		const settings = {
			timestampsInSnapshots: true,
		};

		let found = false;
		db.settings(settings);
		let id;
		let status;
		db.collection('Request')
			.where('listing', '==', data.listing)
			.where('author', '==', data.user)
			.get()
			.then(function(requests) {
				requests.forEach(function(doc) {
					found = true;
					id = doc.data().id;
					status = doc.data().handled;
				});
				if (found == false) {
					db.collection('Request')
						.get()
						.then(function(querySnapshot) {
							let size = querySnapshot.size;
							let requestId = `r${size + 1}`;

							db.collection('Request')
								.doc(requestId)
								.set({
									author: data.user,
									listing: data.listing,
									imgUrl: data.imgUrl,
									id: requestId,
									handled: false,
								})
								.then(() => {
									db.collection('Notification')
										.get()
										.then(function(querySnapshot) {
											let size = querySnapshot.size;
											let notificationId = `n${size + 1}`;
											console.log(notificationId);
											db.collection('Notification')
												.doc(notificationId)
												.set({
													listing: data.listing,
													id: notificationId,
													src: data.user,
													type: 'request',
													place: '',
												})
												.then(() => {
													var listingsRef = db.collection('Listing').doc(data.listing);
													listingsRef.get().then(function(doc) {
														db.collection('User')
															.doc(doc.data().author)
															.get()
															.then(function(userData) {
																let newNotification = userData.data().notifications;
																let newNotificationStatus = userData.data()
																	.notifications;
																newNotification.push(notificationId);
																newNotificationStatus.push(false);
																db.collection('User')
																	.doc(doc.data().author)
																	.update({
																		notifications: newNotification,
																		notificationsStatus: newNotificationStatus,
																	});
															});
													});
												});
										});
								})
								.catch(error => {
									throw new Error(error);
								});
						});
				} else {
					db.collection('Request')
						.doc(id)
						.update({
							handled: !status,
						});
				}
			});
	}
	static async removeListingsWithRequests(firebase, listings, username) {
		const db = firebase.firestore();
		const settings = {
			timestampsInSnapshots: true,
		};
		db.settings(settings);
		for (let i = 0; i < listings.length; i++) {
			await db
				.collection('Request')
				.where('listing', '==', listings[i].id)
				.where('author', '==', username)
				.get()
				.then(requests => {
					requests.forEach(doc => {
						if (doc.data().handled == true) {
							listings.splice(i, 1);
							i = i - 1;
						}
					});
				});
		}
		return listings;
	}
	static getRequestsAtListing(listingId, firebase) {
		const db = firebase.firestore();
		const settings = {
			timestampsInSnapshots: true,
		};

		db.settings(settings);
		console.log(listingId);
		request = db
			.collection('Request')
			.where('listing', '==', listingId)
			.get()
			.then(function(requests) {
				let returnRequest = [];
				requests.forEach(function(doc) {
					if (doc.data().handled == false) returnRequest.push(doc.data());
				});

				return returnRequest;
			});
		return request;
	}
	static manageRequest(firebase, data) {
		const db = firebase.firestore();
		const settings = {
			timestampsInSnapshots: true,
		};

		db.settings(settings);

		db.collection('Request')
			.doc(data.request)
			.get()
			.then(function(request) {
				let dataRequest = request.data();
				if (data.type == 'accept') {
					db.collection('Listing')
						.doc(dataRequest.listing)
						.get()
						.then(function(listing) {
							let listingContributors = listing.data().contributors;

							listingContributors.push(dataRequest.author);
							
							db.collection('Listing')
								.doc(listing.data().id)
								.update({
									contributors: listingContributors,
								});
							db.collection('Notification')
								.get()
								.then(function(querySnapshot) {
									let size = querySnapshot.size;
									let notificationId = `n${size + 1}`;

									db.collection('Notification')
										.doc(notificationId)
										.set({
											listing: dataRequest.listing,
											id: notificationId,
											src: listing.data().author,
											type: 'accepted',
											place: '',
										})
										.then(() => {
											db.collection('User')
												.doc(dataRequest.author)
												.get()
												.then(function(userData) {
													let newNotifications=userData.data().notifications;
													newNotifications.push(notificationId);
		
													db.collection('User')
														.doc(dataRequest.author)
														.update({
															notifications: newNotifications,
														});
												});
										});
								})
								

							let handled = !dataRequest.handled;
							db.collection('Request')
								.doc(dataRequest.id)
								.update({
									handled: handled,
								});
						});
				} else {
					let handled = !dataRequest.handled;
					db.collection('Request')
						.doc(dataRequest.id)
						.update({
							handled: handled,
						});
				}
			});
	}
}
var request = Request;
module.exports = request;
