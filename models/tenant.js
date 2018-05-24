const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TenantSchema = new Schema({
	
	// username
	tenantname: {
		type: String,
		required: [true, 'Username is required'],
		unique: true
	},
	password: {
		type: String,
		required: [true, 'Password is required']
	},
	name: {
		type: String,
		required: true
	},
	contactinfo: {
		phone: {
			type: String
		},
		email: {
			type: String
		}
	},
	currentPropID: String,
	interestedPropID: [String]
});

const Tenant = mongoose.model('tenant', TenantSchema);

module.exports = Tenant;
