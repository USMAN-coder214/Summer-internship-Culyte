const express = require('express');
const projectWorkerController = require('../controllers/projectWorker.controller');
const { authenticate } = require('../middlewares/auth.middleware');

const router = express.Router();

// Assign a worker to a project
router.post(
  '/',
  authenticate,
  projectWorkerController.assignWorkerToProject
);

// Get all workers assigned to a project
router.get(
  '/:projectId',
  authenticate,
  projectWorkerController.getProjectWorkers
);

module.exports = router;