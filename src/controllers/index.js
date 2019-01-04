
var path = require('path');

module.exports.controller = function(app,firebase) {
        app.get('/',function(req,res){
                res.sendFile(path.resolve('views/index.html'));
              });
            
        app.get('/index.html',function(req,res){
                res.sendFile(path.resolve('views/index.html'));
              });  
    
   
   
}

