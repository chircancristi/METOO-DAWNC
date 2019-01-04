

//import { index } from '../models/index'; 
var model = require('../models/index');
var path = require('path');

module.exports.controller = function(app,firebase) {
        app.get('/',function(req,res){
                res.sendFile(path.resolve('views/index.html'));
              });
            
        app.get('/index.html',function(req,res){
                res.sendFile(path.resolve('views/index.html'));
              });  
    
        app.post('/loginGoogle', function (req, res) {
                model.loginWithGoogle(firebase,req.body);
                res.send('Hello POST');
               });
   
}

