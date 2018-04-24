// Heroku
// https://murmuring-citadel-16021.herokuapp.com/
// https://git.heroku.com/murmuring-citadel-16021.git
//

// ---import---
var express        = require('express');
var app            = express();
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
// var morgan = require("morgan");



// ----init---
var port = process.env.PORT || 8080; //so that we dont necessarily have to hard code it. 

app.use(bodyParser.json()); // makes it easy to parse data from body param
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); //... parse ^ as JSON
app.use(bodyParser.urlencoded({ extended: true })); //... encoding
app.use(methodOverride('X-HTTP-Method-Override')); 

app.use(express.static(__dirname + '/public')); 

//----logging------
// app.use(morgan('dev'));

// ---set up api router---
require('./app/routes')(app); // defer to this file for app routes
app.use(function(req, res) {
    res.sendfile(__dirname + '/public/index.html');
});

//start the app!
app.listen(port);               
//... and confirm that we are good to go.
console.log("app running on port " + port)

// make this app globally available          
exports = module.exports = app;     