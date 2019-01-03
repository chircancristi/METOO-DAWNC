

//import { index } from '../models/index'; 
var model = require('../models/index');


module.exports.controller = function(app,firebase) {
    app.get('/index.html/logInGoogle', function(req, res) {
     
        model.loginWithGoogle(firebase);
    });

    /**
     * a home page route
     */
      app.get('/signup', function(req, res) {
          // any logic goes here
          res.render('users/signup')
      });
    
    /**
     * About page route
     */
      app.get('/login', function(req, res) {
          // any logic goes here
          res.render('users/login')
      });
    
    }

