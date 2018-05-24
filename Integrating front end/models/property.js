const mongoose=require('mongoose');
const Schema=mongoose.Schema;
//var fs = require(‘fs’);
//const bcrypt = require('bcrypt');

const PropertySchema= new Schema({
	prop_owner: {
		type: String,
		required: [true, 'Name field is required']
	},
	prop_type: {
		type: String,
		required: [true, 'email field is required']
	},
	prop_area: {
		type: Number,
		required: [true, 'email field is required']
	},
	prop_street: {
		type: String,
		required: [true, 'username field is required']
	},
	prop_city: {
		type: String,
		required: [true, 'username field is required']
	},
	prop_state: {
		type: String,
		required: [true, 'username field is required']
	},
	prop_deposit: {
		type: Number,
		required: [true, 'email field is required']
	},
	prop_rent: {
		type: Number,
		required: [true, 'email field is required']
	},
	prop_status: {
		type: String,
		required: [true, 'email field is required']
	}
	/*prop_image: {
		type: String,
		required: [true, 'username field is required']
	}*/
});

const Property=mongoose.model('property', PropertySchema);

module.exports=Property;