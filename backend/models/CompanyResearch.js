const mongoose = require('mongoose');

const CompanyResearchSchema = new mongoose.Schema({
  title: String,
  description: String,
  link: String,
  imageUrl: String,
});

module.exports = mongoose.model('CompanyResearch', CompanyResearchSchema);
