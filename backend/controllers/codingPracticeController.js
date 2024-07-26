const CodingPractice = require('../models/CodingPractice');

exports.getCodingPractices = async (req, res) => {
  try {
    const codingPractices = await CodingPractice.find();
    res.json(codingPractices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createCodingPractice = async (req, res) => {
  const codingPractice = new CodingPractice(req.body);
  try {
    const newCodingPractice = await codingPractice.save();
    res.status(201).json(newCodingPractice);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
