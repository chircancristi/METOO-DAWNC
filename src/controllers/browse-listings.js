const path = require('path');
const listing = require('../models/listing');
const request = require('../models/request');
module.exports.controller = function(app, firebase) {
	app.get('/browse-listings.html', function(req, res) {
		res.sendFile(path.resolve('views/browse-listings.html'));
	});
	app.get('/listingsAfterLocation', function(req, res) {
		listing.getUsersListings(firebase, req.query).then(function(listings) {
			for (let i = 0; i < listings.length; i++) {
			
				if (listings[i].status === 'completed') {
					listings.splice(i, 1);
					i = i - 1;
				} else {
					if (listings[i].author === req.query.username) {
						listings.splice(i, 1);
						i = i - 1;
					} else {
						for (let j = 0; j < listings[i].contributors.length; j++) {
							if (listings[i].contributors[j] === req.query.username) {
								listings.splice(i, 1);
								i = i - 1;
								break;
							}
						}
					}
				}
			}
			request.removeListingsWithRequests(firebase,listings,req.query.username)
			.then(function(listings){
				res.send(listings);
			})
			
		});
	});
	app.post('/joinListing', function(req, res) {
		request.createRequest(firebase, req.body);
	});
};
