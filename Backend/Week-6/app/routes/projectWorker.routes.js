const express = require('express');
const projectWorkerController = require('../controllers/projectWorker.controller');
const { authenticate } = require('../middlewares/auth.middleware');

const router = express.Router();

// Assign a worker to a project — requires login
router.post(
  '/',
  authenticate,
  projectWorkerController.assignWorkerToProject
);

module.exports = router;