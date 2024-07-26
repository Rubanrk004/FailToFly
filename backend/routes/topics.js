const express = require('express');
const router = express.Router();
const Topic = require('../models/Topic'); 
const authMiddleware = require('../middleware/authMiddleware');

// Get all topics for the authenticated user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const topics = await Topic.find({ user: req.user.id });
    res.json(topics);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new topic
router.post('/', authMiddleware, async (req, res) => {
  const topic = new Topic({
    ...req.body,
    user: req.user.id 
  });

  try {
    const newTopic = await topic.save();
    res.status(201).json(newTopic);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a topic
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const topic = await Topic.findOne({ _id: req.params.id, user: req.user.id });
    if (!topic) {
      return res.status(404).json({ message: 'Topic not found' });
    }
    // await topic.remove();
    const { id } = req.params;
    await Topic.findByIdAndDelete(id);
    res.status(204).end();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
