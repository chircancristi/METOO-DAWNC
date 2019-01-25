class User {
	static login(firebase, data) {
		const db = firebase.firestore();
		const settings = {
			timestampsInSnapshots: true,
		};

		db.settings(settings);

		var docRef = db.collection('User').doc(data.displayName);
		docRef
			.get()
			.then(function(doc) {
				if (!doc.exists) {
					db.collection('User')
						.doc(data.displayName)
						.set({
							fullName: data.displayName,
							email: data.email,
							imgUrl: data.imgUrl,
							likes: 0,
							dislikes: 0,
							skills: [],
							notifications: [],
							notificationsStatus: [],
						})
						.then(() => {
							console.log('Document succesfully written! ✅');
						})
						.catch(error => {
							console.error('Failed writing document:', error);
						});
				}
			})
			.catch(function(error) {
				throw new Error(error);
			});
	}

	static getUserInformation(firebase, username) {
		const db = firebase.firestore();
		const settings = {
			timestampsInSnapshots: true,
		};

		db.settings(settings);

		var docRef = db.collection('User').doc(username);
		return docRef
			.get()
			.then(function(doc) {
				if (doc.exists) {
					let data = doc.data();
					return data;
				} else {
					// doc.data() will be undefined in this case
					console.log('No such document!');
				}
			})
			.catch(function(error) {
				throw new Error(error);
			});
	}
	static getNotifications(username, firebase) {
		const db = firebase.firestore();
		const settings = {
			timestampsInSnapshots: true,
		};

		db.settings(settings);

		var docRef = db.collection('User').doc(username);
		return docRef
			.get()
			.then( async function(doc) {
				if (doc.exists) {
					let notifications=[];
					let data = doc.data();
					for (let i = 0; i < data.notifications.length; i++) {
						await db.collection('Notification')
							.where('id', '==', data.notifications[i])
							.get()
							.then(function(querySnapshot) {
								querySnapshot.forEach(function(doc) {
									notifications.push(doc.data());
								});
							});
					}
					return notifications;
				} else {
					// doc.data() will be undefined in this case
					console.log('No such document!');
				}
			})
			.catch(function(error) {
				throw new Error(error);
			});
	}
}

var user = User;
module.exports = user;
