const express = require('express');
const projectMaterialController = require('../controllers/projectMaterial.controller');
const { authenticate } = require('../middlewares/auth.middleware');


const router = express.Router();

// Add material to project
router.post(
  '/',
  authenticate,
  projectMaterialController.addProjectMaterial
);

// Get all materials for a project
router.get(
  '/:projectId',
  authenticate,
  projectMaterialController.getProjectMaterials
);

module.exports = router;