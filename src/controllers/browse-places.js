var path = require('path');

module.exports.controller = function(app,firebase) {
    
    app.get('/browse-places.html',function(req,res){
        res.sendFile(path.resolve('views/browse-places.html'));
    });
}
