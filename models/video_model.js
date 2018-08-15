const mongoose = require('mongoose');
const schema =  mongoose.Schema;

const video = new schema({
  user: {type: String},
  name: {type: String},
  url:{type: String}
});

module.exports = mongoose.model('videos',video);
