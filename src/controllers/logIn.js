var path = require('path');
var model = require('../models/user');

module.exports.controller = function(app,firebase) {
    
    app.get('/login',function(req,res){
           
            res.sendFile(path.resolve('views/login.html'));
          });
    app.post('/loginUser', function (req, res) {
            
            model.login(firebase,req.body);
            
           });
}