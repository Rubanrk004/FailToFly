const express = require('express');
const router = express.Router();
const companyResearchController = require('../controllers/companyResearchController');

router.get('/', companyResearchController.getCompanyResearches);
router.post('/', companyResearchController.createCompanyResearch);

module.exports = router;
