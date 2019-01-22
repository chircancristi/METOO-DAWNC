var path = require('path');

module.exports.controller = function(app, firebase) {
	app.get('/single-listings.html', function(req, res) {
		res.sendFile(path.resolve('views/single-listings.html'));
	});
};
