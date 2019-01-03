var express = require('express');
var app = express() ,fs = require('fs');;
var path    = require("path");

var firebase = require("firebase");  
var config = {
  apiKey: "<API_KEY>",
  authDomain: "<PROJECT_ID>.firebaseapp.com",
  databaseURL: "https://<DATABASE_NAME>.firebaseio.com",
  storageBucket: "<BUCKET>.appspot.com",
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



app.get('/',function(req,res){
    res.sendFile(__dirname+'/views/index.html');
  });

app.get('/index.html',function(req,res){
    res.sendFile(__dirname+'/views/index.html');
  });  

app.get('/account.html',function(req,res){
    res.sendFile(__dirname+'/views/account.html');
  });

app.get('/add-listing.html',function(req,res){
    res.sendFile(__dirname+'/views/add-listing.html');
  });

app.get('/browse-listings.html',function(req,res){
    res.sendFile(__dirname+'/views/browse-listings.html');
  });

app.get('/browse-places.html',function(req,res){
    res.sendFile(__dirname+'/views/browse-places.html');
  });

app.get('/single-listings.html',function(req,res){
    res.sendFile(__dirname+'/views/single-listings.html');
  });

app.get('/single-place.html',function(req,res){
    res.sendFile(__dirname+'/views/single-place.html');
  });


var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)
})