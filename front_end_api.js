const express = require('express');
const router=express.Router();
const Owner=require('../models/owner');
//add
const Property=require('../models/property');
const Tenant=require('../models/tenant');

//get a list of owners from db
router.get('/propertyhunt/owner', function(req,res,next){
	Owner.find({}).then(function(owner){
		res.send(owner);
	});
});

//Create new owner
router.post('/propertyhunt/owner', function(req,res,next){	
	Owner.create(req.body).then(function(owner){
		res.send(owner);
	}).catch(next);
});

//update existing owner info
router.put('/propertyhunt/owner/:id', function(req,res,next){ //update
	Owner.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
		Owner.findOne({_id: req.params.id}).then(function(owner){
			res.send(owner);
		});
	});;
	//res.send({type: 'PUT'});
});

router.delete('/propertyhunt/owner/:id', function(req,res,next){ //delete
	Owner.findByIdAndRemove({_id: req.params.id}).then(function(owner){
		res.send(owner);
	});												//console.log(req.params.id);
	//res.send({type: 'DELETE'});
});

//Tenant
router.get('/propertyhunt/tenant', function(req,res,next){
	Tenant.find({}).then(function(tenant){
		res.send(tenant);
	});
});

//Create new tenant
router.post('/propertyhunt/tenant', function(req,res,next){	
	Tenant.create(req.body).then(function(tenant){
		res.send(tenant);
	}).catch(next);
});

//update existing tenant info
router.put('/propertyhunt/tenant/:id', function(req,res,next){ //update
	Tenant.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
		Tenant.findOne({_id: req.params.id}).then(function(tenant){
			res.send(tenant);
		});
	});;
	//res.send({type: 'PUT'});
});

router.delete('/propertyhunt/tenant/:id', function(req,res,next){ //delete
	Tenant.findByIdAndRemove({_id: req.params.id}).then(function(tenant){
		res.send(tenant);
	});												//console.log(req.params.id);
	//res.send({type: 'DELETE'});
});

//add 
//get a list of property from db
router.get('/propertyhunt/property', function(req,res,next){
	Property.find({}).then(function(property){
		res.send(property);
	});
});

//Add new properties to db
router.post('/propertyhunt/property', function(req,res,next){	
	Property.create(req.body).then(function(property){
		res.send(property);
	}).catch(next);
});

//Update existing property info
router.put('/propertyhunt//property/:id', function(req,res,next){ //update
	Property.findByIdAndUpdate({_id: req.params.id}, req.body).then(function(){
		Property.findOne({_id: req.params.id}).then(function(property){
			res.send(property);
		});
	});;
	//res.send({type: 'PUT'});
});

//Delete property
router.delete('/propertyhunt/property/:id', function(req,res,next){ //delete
	Property.findByIdAndRemove({_id: req.params.id}).then(function(property){
		res.send(property);
	});												//console.log(req.params.id);
	//res.send({type: 'DELETE'});
});

module.exports= router;
