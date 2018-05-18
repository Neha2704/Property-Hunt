const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TenantSchema = new Schema({
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
			type: String
		},
		email: {
			type: String
		}
	},
	complaints: {
		complaint: String,
		complaintPropID: String
	},
	currentPropID: [String],
	interestedPropID: [String]
});

const Tenant = mongoose.model('tenant', TenantSchema);

module.exports = Tenant;
