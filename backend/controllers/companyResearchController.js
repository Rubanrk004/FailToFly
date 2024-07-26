const CompanyResearch = require('../models/CompanyResearch');

exports.getCompanyResearches = async (req, res) => {
  try {
    const companyResearches = await CompanyResearch.find();
    res.json(companyResearches);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createCompanyResearch = async (req, res) => {
  const companyResearch = new CompanyResearch(req.body);
  try {
    const newCompanyResearch = await companyResearch.save();
    res.status(201).json(newCompanyResearch);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
