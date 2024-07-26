const express = require('express');
const router = express.Router();
const Resource = require('../models/Resource');

// POST a new coding practice resource
router.post('/coding', async (req, res) => {
  const { resourceTitle, resourceContent, resourceUrl } = req.body;
  
  try {
    const newResource = new Resource({
      resourceTitle,
      resourceContent,
      resourceUrl
    });
  
    const savedResource = await newResource.save();
    res.status(201).json(savedResource);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// POST a new behavioral questions resource
router.post('/behavioral-questions', async (req, res) => {
  const { resourceTitle, resourceContent, resourceUrl } = req.body;
  
  try {
    const newResource = new Resource({
      resourceTitle,
      resourceContent,
      resourceUrl
    });
  
    const savedResource = await newResource.save();
    res.status(201).json(savedResource);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// POST a new company research resource
router.post('/company-research', async (req, res) => {
  const { resourceTitle, resourceContent, resourceUrl } = req.body;
  
  try {
    const newResource = new Resource({
      resourceTitle,
      resourceContent,
      resourceUrl
    });
  
    const savedResource = await newResource.save();
    res.status(201).json(savedResource);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
