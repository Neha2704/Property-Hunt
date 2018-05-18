const express = require('express');
const router = express.Router();

const Owner = require('../models/owner');
const Tenant = require('../models/tenant');
const Property = require('../models/property');

// LOGIN

router.post('/owner/login', function(req, res, next){
	
	var username = req.body.username;
	var password = req.body.password;

	Owner.findOne({username: username, password: password}).then(function(owner){
		res.send(owner); //send status 200, or error logging in
	});
});

router.post('/tenant/login', function(req, res, next){
	
	var username = req.body.username;
	var password = req.body.password;

	Tenant.findOne({username: username, password: password}).then(function(tenant){
		res.send(tenant); //send status 200, or error logging in
	});
});


// SIGNUP

router.post('/owner/signup', function(req, res, next){

	Owner.create(req.body).then(function(owner){
		res.send(owner); //send status 200, or error
	}).catch(next);
});

router.post('/tenant/signup', function(req, res, next){

	Tenant.create(req.body).then(function(tenant){
		res.send(tenant); //send status 200, or error
	}).catch(next);
});


// ADD A NEW PROPERTY

router.post('/property/add', function(req, res, next){
	Property.create(req.body).then(function(property){
		res.send(property); // send status and error
	}).catch(next);

	//add the propID to list of propID owned by owner and available=true
	Owner.findOne({username: req.body.username}).then(function(owner){
		var availablePropID = owner.availablePropID;
		availablePropID.push(req.body.propID);
		
		Owner.updateOne({username: req.body.username}, {availablePropID: availablePropID}).then(function(){
			Owner.findOne({username: req.body.username}).then(function(owner){
				res.send(owner);
			});
		});
	});
});


// VIEW PROFILE INFO

router.get('/owner/profile', function(req, res, next){
	Owner.findOne({username: req.query.username}).then(function(owner){
		//res.send(owner);
		res.send({
			username: owner.username,
			contactinfo: owner.contactinfo
		});
	});
});

router.get('/tenant/profile', function(req, res, next){
	Tenant.findOne({username: req.query.username}).then(function(tenant){
		res.send({
			username: tenant.username,
			contactinfo: tenant.contactinfo
		});
	});
});


// VIEW AVAILABLE PROPERTIES 

router.get('/property/available', function(req, res, next){
	Property.find({available: true}).then(function(property){
		res.send(property);
	});
});


// VIEW OWNER PROPERTIES

router.get('/owner/properties', function(req, res, next){
	Property.find({username: req.query.username}).then(function(property){
		res.send(property);
	});
});


// RAISE AN INTEREST IN PARTICULAR PROPERTY

router.put('/property/interest', function(req, res, next){
	// update interestedPropID in tenant
	Tenant.findOne({username: req.body.username}).then(function(tenant){
		var interestedPropID = tenant.interestedPropID;
		interestedPropID.push(req.body.propID);
		
		Tenant.updateOne({username: req.body.username}, {interestedPropID: interestedPropID}).then(function(){
			Tenant.findOne({username: req.body.username}).then(function(tenant){
				res.send(tenant);
			});
		});
	});
});






/*
// GET: view an existing record

router.get('/owner', function(req, res, next){
	Owner.findOne({username: req.query.username}).then(function(owner){
		res.send(owner);
	});
});

router.get('/tenant', function(req, res, next){
	Tenant.findOne({username: req.query.username}).then(function(tenant){
		res.send(tenant);
	});
});

router.get('/property', function(req, res, next){
	Property.findOne({propID: req.query.propID}).then(function(property){
		res.send(property);
	});
});


// POST: add a  new record

router.post('/owner', function(req, res, next){
	Owner.create(req.body).then(function(owner){
		res.send(owner);
	}).catch(next);
});

router.post('/tenant', function(req, res, next){
	Tenant.create(req.body).then(function(tenant){
		res.send(tenant);
	}).catch(next);
});

router.post('/property', function(req, res, next){
	Property.create(req.body).then(function(property){
		res.send(property);
	}).catch(next);
});


// PUT: update a record

router.put('/owner/:username', function(req, res, next){
	Owner.updateOne({username: req.params.username}, req.body).then(function(){
		Owner.findOne({username: req.params.username}).then(function(owner){
			res.send(owner);
		});
	});
});

router.put('/tenant/:username', function(req, res, next){
	Tenant.updateOne({username: req.params.username}, req.body).then(function(){
		Tenant.findOne({username: req.params.username}).then(function(tenant){
			res.send(tenant);
		});
	});
});

router.put('/property/:propID', function(req, res, next){
	Property.updateOne({propID: req.params.propID}, req.body).then(function(){
		Property.findOne({propID: req.params.propID}).then(function(property){
			res.send(property);
		});
	});
});


// DELETE: delete a record

router.delete('/owner/:username', function(req, res, next){
	Owner.deleteOne({username: req.params.username}).then(function(owner){
		res.send(owner);
	});
});

router.delete('/tenant/:username', function(req, res, next){
	Tenant.deleteOne({username: req.params.username}).then(function(tenant){
		res.send(tenant);
	});
});

router.delete('/property/:propID', function(req, res, next){
	Property.deleteOne({propID: req.params.propID}).then(function(property){
		res.send(property);
	});
});
*/
module.exports = router;
