// controllers/behavioralQuestionController.js
const BehavioralQuestion = require('../models/BehavioralQuestion');

exports.getBehavioralQuestions = async (req, res) => {
  try {
    const behavioralQuestions = await BehavioralQuestion.find();
    res.json(behavioralQuestions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createBehavioralQuestion = async (req, res) => {
  const behavioralQuestion = new BehavioralQuestion(req.body);
  try {
    const newBehavioralQuestion = await behavioralQuestion.save();
    res.status(201).json(newBehavioralQuestion);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

