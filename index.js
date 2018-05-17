const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//const routes = require('./routes/api');

// set up express app, contains HTTP functions
const app = express();

// connect to mongo
mongoose.connect('mongodb://localhost/propertyhunt');
mongoose.Promise = global.Promise;

// front end
//app.use(expess.static('./public'));

// watch order of app.use(), its middleware to accept json data
app.use(bodyParser.json()); 

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
