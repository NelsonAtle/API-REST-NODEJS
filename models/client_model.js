const mongoose = require('mongoose');
const schema =  mongoose.Schema;

const client = new schema({
	name: {type: String},
	user:{type: String},
	pin: {type: String},
	years:{type: String}
});
module.exports = mongoose.model('clients',client);
