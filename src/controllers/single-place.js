var path = require('path');

module.exports.controller = function(app,firebase) {

    app.get('/single-place.html',function(req,res){
        res.sendFile(path.resolve('views/single-place.html'));
    });
}