const path = require('path');

module.exports.controller = function(app,firebase) {
    
    app.get('/browse-listings.html',function(req,res){
            res.sendFile(path.resolve('views/browse-listings.html'));
          });
  
}