var path = require('path');
const place = require('../models/place');
const listing = require('../models/listing');

module.exports.controller = function (app, firebase) {

    app.get('/add-listing.html', function (req, res) {
        res.sendFile(path.resolve('views/add-listing.html'));
    });
    app.get('/getPlaces', function (req, res) {
        promise = place.getAllPlaces(firebase);
        promise.then(function (data) {
            res.send(data);
        })
    });
    app.post('/addListing',function (req,res){
        listing.addListing(firebase,req.body);
    });
}