const path = require('path');
const place = require('../models/place');
const user = require('../models/user');
const listing = require('../models/listing');

module.exports.controller = function (app, firebase) {

    app.get('/single-place', function (req, res) {

        res.sendFile(path.resolve('views/single-place.html'));
    });
    app.post('/getLocationInformation', function (req, res) {

        let promise = place.getPlaceByName(req.body.name, firebase);
        let subscribers = [];
        let closedListings = [];
        let openListings = [];
        let i;
        promise.then(function (data) {

            for ( i = 0; i < data.subscribedUsers.length; i++)
                user.getUserInformation(data.subcribedUsers[i]).then(function (userData) {
                    subscribers.push();
                })
          
            listing.getListingsAtLocation(req.body.name, firebase).then(function (listingData) {
              
                for (let i = 0; i < listingData.length; i++) {
                    if (listingData[i].status === "opened") {
                        openListings.push(listingData[i]);
                    }
                    else {
                        closedListings.push(listingData[i]);
                    }
                }
            })
                .finally(function () {
                    let response = {
                        "locationInformation": data,
                        "subscribers": subscribers,
                        "openListings": openListings,
                        "closeListings": closedListings
                    }

                    res.send(response);
                })
        })

    })
}