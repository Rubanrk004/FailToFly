const mongoose = require('mongoose');

const CodingPracticeSchema = new mongoose.Schema({
  title: String,
  description: String,
  link: String,
  imageUrl: String,
});

module.exports = mongoose.model('CodingPractice', CodingPracticeSchema);
