const express = require('express');
const projectMaterialController = require('../controllers/projectMaterial.controller');
const { authenticate } = require('../middlewares/auth.middleware');

const router = express.Router();

// Add a material to a project — requires login
router.post('/', authenticate, projectMaterialController.addProjectMaterial);
// Get all materials used in a project
router.get(
  '/project/:projectId',
  authenticate,
  projectMaterialController.getProjectMaterials
);

module.exports = router;