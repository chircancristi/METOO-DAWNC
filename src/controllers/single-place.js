const path = require('path');
const place = require('../models/place');
const user = require('../models/user');
const listing = require('../models/listing');

module.exports.controller = function (app, firebase) {

    app.get('/single-place.html', function (req, res) {

        res.sendFile(path.resolve('views/single-place.html'));
    });
    app.get('/getLocationInformation/:placeName', function (req, res) {
       
        let promise = place.getPlaceByName(req.params.placeName, firebase);
        let subscribers = [];
        let closedListings = [];
        let openListings = [];
        let i;
        promise.then(async function (data) {

            for ( i = 0; i < data.subscribedUsers.length; i++)
                await user.getUserInformation(firebase,data.subscribedUsers[i]).
                then(function (userData) {
                    subscribers.push(userData);
                })
                .catch(function (error) {
                    console.log("Error getting users:", error);
                });

            listing.getListingsAtLocation(req.params.placeName, firebase).
            then(function (listingData) {
              
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
            .catch(function (error) {
                console.log("Error getting places:", error);
            });
        })
    })
    app.post("/subscribe",function(req,res){
        place.subscribeToPlace(req.body.placeName, req.body.username, firebase)

    })
}