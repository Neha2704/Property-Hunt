const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OwnerSchema = new Schema({
	
	// username
	ownername: {
		type: String,
		required: [true, 'Username is required'],
		unique: true
	},
	password: {
		type: String,
		//required: [true, 'Password is required']
	},
	name: {
		type: String,
		required: true
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
	availablePropID: [String],
	rentedPropID: [String]
});

const Owner = mongoose.model('owner', OwnerSchema);

module.exports = Owner;
