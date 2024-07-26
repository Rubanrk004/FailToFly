const express = require('express');
const router = express.Router();
const codingPracticeController = require('../controllers/codingPracticeController');

router.get('/', codingPracticeController.getCodingPractices);
router.post('/', codingPracticeController.createCodingPractice);

module.exports = router;
