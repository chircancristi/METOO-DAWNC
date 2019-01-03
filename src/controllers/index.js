

//import { index } from '../models/index'; 
var model = require('../models/index');


module.exports.controller = function(app,firebase) {
    
        app.post('/index', function (req, res) {
        model.loginWithGoogle(firebase,req.body);
        res.send('Hello POST');
     })
   
   
    
    }

