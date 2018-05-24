const mongoose=require('mongoose');
const Schema=mongoose.Schema;
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;

const TenantSchema= new Schema({
	t_name: {
		type: String,
		required: [true, 'Name field is required']
	},
	t_email: {
		type: String,
		required: [true, 'email field is required']
	},
	t_contact: {
		type: Number,
		required: [true, 'email field is required']
	},
	t_username: {
		type: String,
		required: [true, 'username field is required']
	},
	t_password: {
		type: String,
		required: [true, 'username field is required']
	}
});
const Tenant=mongoose.model('tenant', TenantSchema);

TenantSchema.pre('save', function(next){
    var Tenant = this;
    if (!Tenant.isModified('t_password')) return next();
 
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
        if(err) return next(err);
 
        bcrypt.hash(Tenant.t_password, salt, function(err, hash){
            if(err) return next(err);
 
            Tenant.t_password = hash;
            next();
        });
    });
});

//const Owner=mongoose.model('owner', OwnerSchema);

module.exports=Tenant;