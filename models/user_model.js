const mongoose = require('mongoose');
const schema =  mongoose.Schema;

const user = new schema({
	name: {type: String},
	lastName: {type: String},
	birthday:{type: String},
	country: {type: String},
	email:{type:String},
	password: {type: String}
});
const allowedAttributes = ['name', 'lastName', 'birthday', 'country','email','password'];
module.exports = mongoose.model('users',user);
module.exports.UserAllowedAttributes = allowedAttributes;
