const express = require('express');
const bodyParser=require('body-parser'); 
const mongoose=require('mongoose');
var crypto = require('crypto');

// set up express app
const app = express();

//connect to  mdb
mongoose.connect('mongodb://localhost/ownergo');
mongoose.Promise=global.Promise;

var new_db = "mongodb://localhost:27017/ownergo";

//connect to front end
//app.use(express.static('public'));

app.use(bodyParser.json());

app.use('/api',require('./routes/api'));

//error handling middleware
app.use(function(err,req,res,next){
	//console.log(err);
	res.status(422).send({error: err.message});
});
//password encryption
var getHash = ( password, contact ) => {
				
				var hmac = crypto.createHmac('sha512', contact);
				
				//passing the data to be hashed
				data = hmac.update(password);
				//Creating the hmac in the required format
				gen_hmac= data.digest('hex');
				//Printing the output on the console
				console.log("hmac : " + gen_hmac);
				return gen_hmac;
}

// sign-up page code for owner
app.get('/',function(req,res){
	res.set({
		'Access-Control-Allow-Origin' : '*'
	});
	return res.redirect('/public/home.html');
}).listen(5000);

console.log("Server listening at : 5000");
app.use('/public', express.static(__dirname + '/public'));
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
	extended: true
}));


// Sign-up function for owner
app.post('/sign_up_owner' ,function(req,res){
	var o_name = req.body.o_name;
	var o_email= req.body.o_email;
	//var o_contact= req.body.o_contact;
	var o_username= req.body.o_username;
	var o_password = req.body.o_password;
		var o_contact= req.body.o_contact;
	var o_password = getHash(o_password, o_contact);
	
	var data = {
		"o_name": o_name,
		"o_email": o_email,
		"o_contact": o_contact,
		"o_username": o_username,
		"o_password": o_password
	}
	
	mongoose.connect(new_db , function(error , db){
		if (error){
			throw error;
		}
		console.log("connected to database successfully");
		//CREATING A COLLECTION IN MONGODB USING NODE.JS
		db.collection("owners").insertOne(data, (err , owners) => {
			if(err) throw err;
			console.log("Record inserted successfully");
			console.log(owners);
		});
	});
	
	console.log("DATA is " + JSON.stringify(data) );
	res.set({
		'Access-Control-Allow-Origin' : '*'
	});
	return res.redirect('/public/login_owner.html'); 
});

// Sign-up function for tenant
app.post('/sign_up_tenant' ,function(req,res){
	var t_name = req.body.t_name;
	var t_email= req.body.t_email;
	var t_username= req.body.t_username;
	var t_password = req.body.t_password;
	var t_contact= req.body.t_contact;
	var t_password = getHash(t_password, t_contact);
	
	var data = {
		"t_name": t_name,
		"t_email": t_email,
		"t_contact": t_contact,
		"t_username": t_username,
		"t_password": t_password
	}
	
	mongoose.connect(new_db , function(error , db){
		if (error){
			throw error;
		}
		console.log("connected to database successfully");
		//CREATING A COLLECTION IN MONGODB USING NODE.JS
		db.collection("tenants").insertOne(data, (err , tenants) => {
			if(err) throw err;
			console.log("Record inserted successfully");
			console.log(tenants);
		});
	});
	
	console.log("DATA is " + JSON.stringify(data) );
	res.set({
		'Access-Control-Allow-Origin' : '*'
	});
	return res.redirect('/public/login_tenant.html'); 
});

// Add new Property
app.post('/add_new' ,function(req,res){
	var prop_owner = req.body.prop_owner;
	var prop_type= req.body.prop_type;
	var prop_area= req.body.prop_area;
	var prop_street = req.body.prop_street;
	var prop_city= req.body.prop_city;
	var prop_state= req.body.prop_state;
	var prop_deposit = req.body.prop_deposit;
	var prop_rent= req.body.prop_rent;
	var prop_status= req.body.prop_status;
	
	var data = {
		"prop_owner": prop_owner,
		"prop_type": prop_type,
		"prop_area": prop_area,
		"prop_street": prop_street,
		"prop_city": prop_city,
		"prop_state": prop_state,
		"prop_deposit": prop_deposit,
		"prop_rent": prop_rent,
		"prop_status": prop_status
	}
	
	mongoose.connect(new_db , function(error , db){
		if (error){
			throw error;
		}
		console.log("connected to database successfully");
		//CREATING A COLLECTION IN MONGODB USING NODE.JS
		db.collection("properties").insertOne(data, (err , properties) => {
			if(err) throw err;
			console.log("Record inserted successfully");
			console.log(properties);
		});
	});
	
	console.log("DATA is " + JSON.stringify(data) );
	res.set({
		'Access-Control-Allow-Origin' : '*'
	});
	return res.redirect('/public/owner_view_existing.html'); 
});

//display existing properties
app.get('/view_existing', function(req, res) {
	var prop_owner = req.param('prop_owner');
	var prop_type= req.param('prop_type');
	var prop_area= req.param('prop_area');
	var prop_street = req.param('prop_street');
	var prop_city= req.param('prop_city');
	var prop_state= req.param('prop_state');
	var prop_deposit = req.param('prop_deposit');
	var prop_rent= req.param('prop_rent');
	var prop_status= req.param('prop_status'); 

  res.send(user_id + ' ' + token + ' ' + geo);
// listen for requests
/*app.listen(process.env.port || 5000, function(){
    console.log('now listening for requests');
});*/
