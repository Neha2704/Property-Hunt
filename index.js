var express = require('express');
var bodyParser = require('body-parser');
//const cookieParser = require('cookie-parser');
var session = require('express-session');
var mongoose = require('mongoose');

//const routes = require('./routes/api');

// set up express app, contains HTTP functions
var app = express();

// connect to mongo
mongoose.connect('mongodb://localhost/propertyhunt');
mongoose.Promise = global.Promise;

// front end
//app.use(express.static(path.join(__dirname, 'public')));

// watch order of app.use(), its middleware to accept json data
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended: false}));
//app.use(cookieParser());
app.use(session({secret: "w7vdssbcd8ewtdbyx", resave: false, saveUninitializd: true}));

// initialize routes
app.use('/api', require('./routes/api'));

// error handling middleware
app.use(function(err, req, res, next){
	//console.log(err);
	res.status(422).send({error: err.message});
});

// listen for requests
app.listen(process.env.port||4000, function(){
	console.log('Listening to requests');
});
