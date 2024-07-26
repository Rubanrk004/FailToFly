const mongoose = require('mongoose');

const reminderSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

module.exports = mongoose.model('Reminder', reminderSchema);
