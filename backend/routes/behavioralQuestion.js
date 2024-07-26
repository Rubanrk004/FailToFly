const express = require('express');
const router = express.Router();
const behavioralQuestionController = require('../controllers/behavioralQuestionController');

router.get('/', behavioralQuestionController.getBehavioralQuestions);
router.post('/', behavioralQuestionController.createBehavioralQuestion);

module.exports = router;
