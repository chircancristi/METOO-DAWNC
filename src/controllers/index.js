const path = require('path');
const model = require('../models/place');
const user = require('../models/user');
module.exports.controller = function(app, firebase) {
	app.get('/', function(req, res) {
		res.sendFile(path.resolve('views/index.html'));
	});
	app.get('/favouritePlaces', function(req, res) {
		let promise = model.getFavoritePlaces(firebase);
		promise.then(function(data) {
			res.send(data);
		});
	});
	app.get('/index.html', function(req, res) {
		res.render(path.resolve('views/index.html'));
	});
	app.get('/NotificationsForUser/:username',function(req,res){
		promise= user.getNotifications(req.params.username,firebase);
		promise.then(function(notifications){
			
			res.send(notifications);
		})
	})

	
};
