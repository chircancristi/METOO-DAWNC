
var path = require('path');
var model = require('../models/place');
module.exports.controller = function (app, firebase) {
        app.get('/', function (req, res) {
                res.sendFile(path.resolve('views/index.html'));

        });
        app.post('/favouritePlaces', function (req, res) {
                let promise=model.getFavoritePlaces(firebase);
                promise.then(function (data) {
                        res.send(data);
                })
        })
        app.get('/index.html', function (req, res) {
               
                res.sendFile(path.resolve('views/index.html'));
        });

}

