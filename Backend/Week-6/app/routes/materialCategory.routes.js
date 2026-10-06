const express = require('express');
const materialCategoryController = require('../controllers/materialCategory.controller');
const { authenticate } = require('../middlewares/auth.middleware');

const router = express.Router();

// Create a material category — requires login
router.post('/', authenticate, materialCategoryController.createCategory);

module.exports = router;