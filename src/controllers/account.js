var path = require('path');
var user = require('../models/user');
var listing = require('../models/listing');

module.exports.controller = async function (app, firebase) {

    app.get('/account.html', function (req, res) {
        res.sendFile(path.resolve('views/account.html'));
    });
    app.post("/userInformation", function (req, res) {
        
      
        let data = user.getUserInformation(firebase, req.body.username);

        data.then(function (value) {
            listing.getUserListing(req.body.username,firebase).
            then(function(listings)
            {
                let response={
                    "listings":listings,
                    "userData":value
                }
                res.send(response);
            });
           
        });
    });
}