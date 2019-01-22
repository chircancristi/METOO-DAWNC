const path = require('path');
const listing = require('../models/listing');

module.exports.controller = function(app, firebase) {
	app.get('/browse-listings.html', function(req, res) {
		res.sendFile(path.resolve('views/browse-listings.html'));
	});
	app.get('/listingsAfterLocation', function(req, res) {
		listing.getUsersListings(firebase, req.query).then(function(listings) {
			res.send(listings);
		});
	});
};
