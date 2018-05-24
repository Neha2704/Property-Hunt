const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PropertySchema = new Schema({
	propID: {
		type: String,
		required: [true, 'ID is required'],
		unique: true
	},
	ownername: {
		type: String,
		required: true
	},
	tenantname: {
		type: String
	},
	propname: {
		type: String
	},
	address: {
		street: {
			type: String,
			//required: true
		},
		area: String,
		city: String,
		state: String
	},
	available: {	
		type: Boolean,
		default: true
	},
	complaint: {
		hasComplaint: {
			type: Boolean,
			default: false
		},
		contentComplaint: String
	},
	cost: {
		deposit: Number,
		rent: Number
	},
	interestedTenants: [String]
});

const Property = mongoose.model('property', PropertySchema);

module.exports = Property;
