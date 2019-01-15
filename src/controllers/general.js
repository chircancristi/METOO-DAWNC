var path = require('path');
const place = require('../models/place');
const listing = require('../models/listing');

module.exports.controller = function (app, firebase) {

    app.get('/getPlaces', function (req, res) {
        promise = place.getAllPlaces(firebase);
        promise.then(function (data) {
            res.send(data);
        })
    });
    
}