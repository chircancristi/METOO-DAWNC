class Comment {
	static addComment(data, firebase) {
		const db = firebase.firestore();
		const settings = {
			timestampsInSnapshots: true,
		};

		db.settings(settings);
		db.collection('Comment')
			.get()
			.then(function(querySnapshot) {
				let size = querySnapshot.size;
				let commentId = `c${size + 1}`;

				db.collection('Comment')
					.doc(commentId)
					.set({
            author: data.author,
            listing: data.listing,
            imgUrl: data.imgUrl,
            content: data.content,
            date: data.date,
            role: data.role,
            id:commentId
						
					})
					.then(() => {
					
						console.log('Document succesfully written! ✅');
					})
					.catch(error => {
						throw new Error(error);
					});
			});
  }
  static getCommentsByListing(listingId,firebase){
    const db = firebase.firestore();
		const settings = {
			timestampsInSnapshots: true,
		};

		db.settings(settings);

		comment = db
			.collection('Comment')
			.where('listing', '==', listingId)
			.get()
			.then(function(comments) {
				let returnComment=[];
				comments.forEach(function(doc) {
					returnComment.push(doc.data());
				});
				return returnComment;
			});
		return comment;
  }
}
var comment = Comment;
module.exports = comment;
