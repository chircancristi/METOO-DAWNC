var express = require('express');
var app = express() ,fs = require('fs');;
var path    = require("path");

var firebase = require("firebase");
app.use(express.json());

require('firebase/auth');
require('firebase/database');
var config = {
  apiKey: "AIzaSyB-wcY0u8Sk6m5WBv6dYG1B7W_4Clo5rjw",
  authDomain: "metoo-c7619.firebaseapp.com",
  databaseURL: "https://metoo-c7619.firebaseio.com",
  projectId: "metoo-c7619",
  storageBucket: "metoo-c7619.appspot.com",
  messagingSenderId: "295303057551"
};
firebase.initializeApp(config); 

app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));

fs.readdirSync('./controllers').forEach(function (file) {
  if(file.substr(-3) == '.js') {
      route = require('./controllers/' + file);
      route.controller(app,firebase);
  }
});

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)
})