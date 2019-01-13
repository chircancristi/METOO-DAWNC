var path = require('path');
var model = require('../models/user');
module.exports.controller = async function (app, firebase) {

    app.get('/account.html', function (req, res) {
        res.sendFile(path.resolve('views/account.html'));
    });
    app.post("/userInformation", function (req, res) {
        
        console.log("aici am primit asta: " +req.body.username);
        let data = model.getUserInformation(firebase, req.body.username);

        data.then(function (value) {

            res.send(value);
        });
    });
}