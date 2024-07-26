
const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  url: { type: String, required: true },
  content: { type: String, required: true },
  type: { type: String, required: true } 
});

module.exports = mongoose.model('Avbadmin', resourceSchema);

