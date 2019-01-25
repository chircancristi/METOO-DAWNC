const path = require('path');
const user = require('../models/user');
const listing = require('../models/listing');
const request = require('../models/request');
module.exports.controller = async function(app, firebase) {
	app.get('/account.html', function(req, res) {
		res.sendFile(path.resolve('views/account.html'));
	});
	app.post('/userInformation', function(req, res) {
		let data = user.getUserInformation(firebase, req.body.username);
		let requestsFinal = [];
		data.then(function(value) {
			listing.getUserListing(req.body.username, firebase).then(async function(listings) {
				for (let i = 0; i < listings.length; i++) {
					if (listings[i].author === req.body.username) {
						await request.getRequestsAtListing(listings[i].id, firebase).then(function(requests) {
							for (let j = 0; j < requests.length; j++) {
								requestsFinal.push(requests[j]);
							}
						});
					}
				}
				let response = {
					listings,
					userData: value,
					requests: requestsFinal,
				};
				res.send(response);
			});
		});
	});
	app.post('/manageRequest', function(req, res) {
			request.manageRequest(firebase,req.body);
	});
};
