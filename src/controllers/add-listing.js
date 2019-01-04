var path = require('path');

module.exports.controller = function(app,firebase) {
    
    app.get('/add-listing.html',function(req,res){
        res.sendFile(path.resolve('views/add-listing.html'));
          });
}