const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PropertySchema = new Schema({
	propID: {
		type: String,
		required: [true, 'ID is required']
	},
	// owner username
	username: {
		type: String,
		required: true
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
	}
});

const Property = mongoose.model('property', PropertySchema);

module.exports = Property;
