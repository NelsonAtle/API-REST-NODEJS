const mongoose = require('mongoose');
const schema =  mongoose.Schema;

const client_video = new schema({
	client: {type: String},
	video:{type: String}
});
module.exports = mongoose.model('clients_videos',client_video);
