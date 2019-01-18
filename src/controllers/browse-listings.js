const path = require('path');
const listing = require('../models/listing');

module.exports.controller = function(app,firebase) {
    
    app.get('/browse-listings.html',function(req,res){
            res.sendFile(path.resolve('views/browse-listings.html'));
          });
    app.post('/listingsAfterLocation',function(req,res){
      listing.getUsersListings(firebase,req.body).then(function(listings){
        console.log(listings);
      })
    })
  
}