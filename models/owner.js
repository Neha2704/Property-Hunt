const mongoose=require('mongoose');
const Schema=mongoose.Schema;
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;

const OwnerSchema= new Schema({
	o_name: {
		type: String,
		required: [true, 'Name field is required']
	},
	o_email: {
		type: String,
		required: [true, 'email field is required']
	},
	o_contact: {
		type: Number,
		required: [true, 'email field is required']
	},
	o_username: {
		type: String,
		required: [true, 'username field is required']
	},
	o_password: {
		type: String,
		required: [true, 'username field is required']
	}
});
const Owner=mongoose.model('owner', OwnerSchema);

OwnerSchema.pre('save', function(next){
    var Owner = this;
    if (!Owner.isModified('o_password')) return next();
 
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
        if(err) return next(err);
 
        bcrypt.hash(Owner.o_password, salt, function(err, hash){
            if(err) return next(err);
 
            Owner.o_password = hash;
            next();
        });
    });
});

//const Owner=mongoose.model('owner', OwnerSchema);

module.exports=Owner;