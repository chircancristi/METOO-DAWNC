var path = require('path');
const user = require('../models/user');
const listing = require('../models/listing');
const comment = require('../models/comment')
module.exports.controller = function(app, firebase) {
	app.get('/single-listing', function(req, res) {
		res.sendFile(path.resolve('views/single-listing.html'));
	});
	app.get('/listingAfterName/:listingName', function(req, res) {
		promise = listing.getListingByName(req.params.listingName, firebase);
		promise.then(function(listing) {
				commentPromise=comment.getCommentsByListing(listing.id,firebase) ;
				commentPromise.then(function(comments){
					result={
						listing:listing,
						comments:comments
					}
					res.send(result);
				})
		});
		app.post('/postComment', function(req, res) {
			 comment.addComment(req.body, firebase);
			 res.send("Sucess");
		});
	});
};
