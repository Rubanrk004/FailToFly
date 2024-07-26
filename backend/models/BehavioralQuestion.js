// models/BehavioralQuestion.js
const mongoose = require('mongoose');

const BehavioralQuestionSchema = new mongoose.Schema({
  title: String,
  description: String,
  link: String,
  imageUrl: String,
});

module.exports = mongoose.model('BehavioralQuestion', BehavioralQuestionSchema);