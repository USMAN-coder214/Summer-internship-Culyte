const express = require('express');
const companyController = require('../controllers/company.controller');
const { authenticate } = require('../middlewares/auth.middleware');

const router = express.Router();

// Create company — requires login
router.post('/', authenticate, companyController.createCompany);

module.exports = router;