var path = require('path');
const user = require('../models/user');
const listing = require('../models/listing');

module.exports.controller = function(app, firebase) {
	app.get('/single-listing', function(req, res) {
		res.sendFile(path.resolve('views/single-listing.html'));
	});
	app.get('/listingAfterName/:listingName', function(req,res){
			promise=listing.getListingByName(req.params.listingName,firebase);
			promise.then(function(listing){
				res.send(listing);
			})
	})
};
