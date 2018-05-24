const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;

const Owner = require('../models/owner');
const Tenant = require('../models/tenant');
const Property = require('../models/property');


// replace all req.body.ownername occurences with req.session.ownername

// LOGIN

router.post('/owner/login', function(req, res, next){
	
	var ownername = req.body.ownername;
	var password = req.body.password;
	/*
	Owner.findOne({ownername: ownername, password: password}).then(function(owner){
		res.status(200).send(owner); //send status 200, or error logging in message
	});
	*/
	Owner.findOne({ownername: ownername}).then(function(owner){
		//send status 200, or error logging in message
		
		var hash = owner.password;
		bcrypt.compare(password, hash, function(err, result) {
			if(err) {
				console.log(err);
			} else if (result==true){
				req.session.ownername = ownername;
				res.status(200).send("Succesfully logged in!"); 
			} else {
				req.session.ownername = null;
				res.status(401).send("Incorrect username or password."); //unauthorized
			}
		});
	});
	
});

router.post('/tenant/login', function(req, res, next){
	
	var tenantname = req.body.tenantname;
	var password = req.body.password;

	Tenant.findOne({tenantname: tenantname}).then(function(tenant){
		//send status 200, or error logging in message
		
		var hash = tenant.password;
		bcrypt.compare(password, hash, function(err, result) {
			if(err) {
				console.log(err);
			} else if (result==true){
				req.session.tenantname = tenantname; 
				res.status(200).send("Succesfully logged in!");
			} else {
				req.session.tenantname = null;
				res.status(401).send("Incorrect password or username"); //unauthorized
			}
		});
	});
});

// LOGOUT

router.post('/owner/logout', function(req, res, next){
	req.session.destroy(function(err){
		if(err){
			res.send(err);
		} else {
			res.status(200).send();
		}
	});
});

router.post('/tenant/logout', function(req, res, next){
	req.session.destroy(function(err){
		if(err){
			res.send(err);
		} else {
			res.status(200).send();
		}
	});
});

// SIGNUP

router.post('/owner/signup', function(req, res, next){

	bcrypt.hash(req.body.password, saltRounds, function(err, hash){
		if(err){
			res.send(err);
		} else {
			Owner.create({
				ownername: req.body.ownername, // not in session
				password: hash,
				name: req.body.name,
				contactinfo: req.body.contactinfo
			}).then(function(err){
				if(err){
					res.send(err);
				} else {
					res.status(200).send("Account created succesfully!");
				}
			}).catch(next);
		}
	});
	
});

router.post('/tenant/signup', function(req, res, next){

	bcrypt.hash(req.body.password, saltRounds, function(err, hash){
		if(err){
			res.send(err);
		} else {
			Tenant.create({
				tenantname: req.body.tenantname,
				password: hash,
				name: req.body.name,
				contactinfo: req.body.contactinfo
			}).then(function(err){
				if(err){
					res.send(err);
				} else {
					res.status(200).send("Account created succesfully!");
				}
			}).catch(next);
		}
	});
});


// ADD A NEW PROPERTY

router.post('/property/add', function(req, res, next){

	var propID = req.body.propID;
	var ownername = req.session.ownername;

	Property.create({
		propID: propID,
		ownername: ownername,
		propname: req.body.propname,
		address: req.body.address,
		cost: req.body.cost
	}).then(function(property){
		res.send(property); // send status and error
	}).catch(next);

	//add the propID to list of propID owned by owner and available=true by default
	Owner.findOne({ownername: ownername}).then(function(owner){
		var availablePropID = owner.availablePropID;
		availablePropID.push(propID);
		
		Owner.updateOne({ownername: ownername}, {availablePropID: availablePropID}).then(function(){
			Owner.findOne({ownername: ownername}).then(function(owner){
				res.send(owner);
			});
		});
	});
});


// VIEW PROFILE INFO

router.get('/owner/profile', function(req, res, next){
	Owner.findOne({ownername: req.session.ownername}).then(function(owner){
		res.send({
			ownername: owner.ownername,
			name: owner.name,
			contactinfo: owner.contactinfo
		});
	});
});

router.get('/tenant/profile', function(req, res, next){
	Tenant.findOne({tenantname: req.session.tenantname}).then(function(tenant){
		res.send({
			tenantname: tenant.tenantname,
			name: tenant.name,
			contactinfo: tenant.contactinfo
		});
	});
});


// VIEW AVAILABLE PROPERTIES: TENANT VIEW

router.get('/property/available', function(req, res, next){
	Property.find({available: true}).then(function(property){
		res.send(property); // sends all details of all properties
	});
});


// VIEW OWNER PROPERTIES

router.get('/owner/properties', function(req, res, next){
	Property.find({ownername: req.session.ownername}).then(function(property){
		res.send(property); // see what all details to be sent
	});
});


// RAISE AN INTEREST IN PARTICULAR PROPERTY

router.put('/property/interest', function(req, res, next){

	// json body: propID
	var tenantname = req.session.tenantname; // session variable
	var propID = req.body.propID;

	Tenant.findOne({tenantname: tenantname}).then(function(tenant){
		var interestedPropID = tenant.interestedPropID;
		interestedPropID.push(propID);
		
		Tenant.updateOne({tenantname: tenantname}, {interestedPropID: interestedPropID}).then(function(){
			Tenant.findOne({tenantname: tenantname}).then(function(tenant){
				res.send(tenant);
			});
		});
	});

	// Property: interested tenant list update
	Property.findOne({propID: propID}).then(function(property){
		var interestedTenants = property.interestedTenants;
		interestedTenants.push(tenantname);
		
		Property.updateOne({propID: propID}, {interestedTenants: interestedTenants}).then(function(){
			Property.findOne({propID: propID}).then(function(property){
				res.send(property);
			});
		});
	});
});


// DELETE A PROPERTY

router.delete('/property/remove', function(req, res, next){

	var ownername = req.session.ownername;
	Property.deleteOne({propID: req.body.propID}).then(function(property){
		res.send(property);
	});
	// delete from list of owner
	Owner.findOne({ownername: ownername}).then(function(owner){
		
		var availablePropID = owner.availablePropID;
		var rentedPropID = owner.rentedPropID;

		availablePropID.splice(availablePropID.indexOf(req.body.propID), 1);
		rentedPropID.splice(rentedPropID.indexOf(req.body.propID), 1);

		Owner.updateOne({ownername: ownername}, {availablePropID: availablePropID, rentedPropID: rentedPropID}).then(function(){
			Tenant.findOne({ownername: ownername}).then(function(owner){
				res.send(owner);
			});
		});
	});
	// delete from list of tenant
	// NOTE Tenant can rent only 1 property at a time
	Tenant.findOne({currentPropID: req.body.propID}).then(function(tenant){

		//var currentPropID = tenant.currentPropID;
		//currentPropID.splice(currentPropID.indexOf(req.body.propID), 1);
		Tenant.updateOne({currentPropID: req.body.propID}, {currentPropID: null}).then(function(){
			res.status(200).send();
		});
	});
});


// RENT A PROPERTY

router.post('/property/rent', function(req, res, next){

	// owner logged in will change details

	var propID =  req.body.propID;
	var ownername = req.session.ownername;
	var tenantname = req.body.tenantname;

	// update property paramters: available, tenantname, list of interestedTenants

	Property.findOne({propID: propID}).then(function(property){
		var interestedTenants = property.interestedTenants;
		interestedTenants.splice(interestedTenants.indexOf(tenantname), 1);

		Property.updateOne({propID: propID}, {interestedTenants: interestedTenants, available: false, tenantname: tenantname}).then(function(){
			Property.findOne({propID: propID}).then(function(property){
				res.send(property);
			});
		});
	});

	// update owner parameters: availablePropID, rentedPropID

	Owner.findOne({ownername: ownername}).then(function(owner){
		
		var availablePropID = owner.availablePropID;
		var rentedPropID = owner.rentedPropID;

		availablePropID.splice(availablePropID.indexOf(propID), 1);
		rentedPropID.push(propID);

		Owner.updateOne({ownername: ownername}, {availablePropID: availablePropID, rentedPropID: rentedPropID}).then(function(){
			Tenant.findOne({ownername: ownername}).then(function(owner){
				res.send(owner);
			});
		});
	});

	// update tenant parameters: currentPropID, interestedPropID

	Tenant.findOne({tenantname: tenantname}).then(function(tenant){
		
		//var currentPropID = tenant.currentPropID;
		var interestedPropID = tenant.interestedPropID;
		interestedPropID.splice(interestedPropID.indexOf(propID), 1);
		//currentPropID.push(propID);

		Tenant.updateOne({tenantname: tenantname}, {interestedPropID: interestedPropID, currentPropID: propID}).then(function(){
			Tenant.findOne({tenantname: tenantname}).then(function(tenant){
				res.send(tenant);
			});
		});
	});
});

// RAISE A COMPLAINT

router.post('/property/complaint', function(req, res, next){

	//var propID = req.body.propID;
	var tenantname = req.session.tenantname;
	var contentComplaint = req.body.complaint;
	var complaint = {
		contentComplaint: contentComplaint,
		hasComplaint: true
	};

	Property.updateOne({tenantname: tenantname}, {complaint: complaint}).then(function(){
		Property.findOne({tenantname: tenantname}).then(function(property){
			res.send(property);
		});
	});
});

// RESOLVE A COMPLAINT

router.post('/property/resolve', function(req, res, next){

	var ownername = req.session.ownername;
	var propID = req.body.propID;
	var complaint = {
		contentComplaint: "",
		hasComplaint: false
	};
	
	Property.updateOne({propID: propID}, {complaint: complaint}).then(function(){
		Property.findOne({propID: propID}).then(function(property){
			res.send(property);
		});
	});

});

module.exports = router;
