const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OwnerSchema = new Schema({
	username: {
		type: String,
		required: [true, 'Username is required']
	},
	password: {
		type: String,
		required: [true, 'Password is required']
	},
	contactinfo: {
		phone: {
			type: String,
			required: true
		},
		email: {
			type: String
		}
	},
	properties: {
		availablePropID: [String],
		rentedPropID: [String]
	}
});

const Owner = mongoose.model('owner', OwnerSchema);

module.exports = Owner;
