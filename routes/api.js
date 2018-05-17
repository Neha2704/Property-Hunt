const express = require('express');
const router = express.Router();

const Owner = require('../models/owner');
const Tenant = require('../models/tenant');
const Property = require('../models/property');

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
	/*Owner.findByIdAndUpdate({_id: req.params.username}, req.body).then(function(){
		Owner.findOne({_id: req.params.username}).then(function(owner){
			res.send(owner);
		});
	});*/
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

module.exports = router;
