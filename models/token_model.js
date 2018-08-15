const mongoose = require('mongoose');
const schema =  mongoose.Schema;

const token = new schema({
	user: {type: String},
	token:{type: String}
});
module.exports = mongoose.model('tokens',token);
