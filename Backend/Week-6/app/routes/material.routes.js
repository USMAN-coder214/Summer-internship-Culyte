const express = require('express');
const materialController = require('../controllers/material.controller');
const { authenticate } = require('../middlewares/auth.middleware');

const router = express.Router();

// Create a material — requires login
router.post('/', authenticate, materialController.createMaterial);
router.get(
  '/',
  authenticate,
  materialController.getMaterials
);
module.exports = router;