const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
  resourceTitle: { type: String, required: true },
  resourceContent: { type: String, required: true },
  resourceUrl: { type: String, required: true }
});
const Resource = mongoose.models.Resource || mongoose.model('Resource', resourceSchema);

module.exports = Resource;
