const express = require('express');
const projectController = require('../controllers/project.controller');
const { authenticate } = require('../middlewares/auth.middleware');

const router = express.Router();

// Create a project — requires authentication
router.post('/', authenticate, projectController.createProject);

// Get all projects — requires authentication
router.get('/', authenticate, projectController.getProjects);

// Get complete financial summary of a project
router.get(
  '/:projectId/cost-summary',
  authenticate,
  projectController.getProjectCostSummary
);
// Get complete project dashboard
router.get(
  '/:projectId/dashboard',
  authenticate,
  projectController.getProjectDashboard
);
module.exports = router;