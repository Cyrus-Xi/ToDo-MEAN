// Set up.
var express  = require('express');
var app      = express();       // Create our app with express.
var mongoose = require('mongoose');     // Mongoose for mongoDB.
var morgan = require('morgan');     // Log requests to the console (express4).
var bodyParser = require('body-parser');    // Pull information from HTML POST (express4).
var methodOverride = require('method-override');    // Simulate DELETE and PUT (express4).

// Load the config.
var database = require('./config/database');
mongoose.connect(database.url);     // Connect to mongoDB database on modulus.io.

app.use(express.static(__dirname + '/public')); // Set the static files location; /public/img will be /img for users.
app.use(morgan('dev'));     // Log every request to the console.
app.use(bodyParser.urlencoded({'extended':'true'}));    // Parse application/x-www-form-urlencoded.
app.use(bodyParser.json());     // Parse application/json.
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // Parse application/vnd.api+json as json.
app.use(methodOverride());

// Load the routes.
require('./app/routes')(app);

// Listen.
app.listen(8080);
console.log("App listening on port 8080");
