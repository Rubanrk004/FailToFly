const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
  resourceTitle: {
    type: String,
    required: true,
  },
  resourceUrl: {
    type: String,
    required: true,
  },
  resourceContent: {
    type: String,
    required: true,
  },
  endpoint: {
    type: String,
    required: true,
  }
}, { timestamps: true });

const Adminres = mongoose.model('Adminres', resourceSchema);

module.exports = Adminres;
