const express = require('express');
const workerController = require('../controllers/worker.controller');
const { authenticate } = require('../middlewares/auth.middleware');

const router = express.Router();

// Create a worker — requires login
router.post(
  '/',
  authenticate,
  workerController.createWorker
);

module.exports = router;