var path = require('path');

module.exports.controller = function(app,firebase) {
    
    app.get('/login',function(req,res){
            console.log("hey");
            res.sendFile(path.resolve('views/login.html'));
          });
}