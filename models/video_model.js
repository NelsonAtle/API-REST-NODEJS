const mongoose = require('mongoose');
const schema =  mongoose.Schema;

const video = new schema({
  name: {type: String},
  type: {type: String},
  url:{type: String},
  category: {type: String}
});

module.exports = mongoose.model('videos',video);
