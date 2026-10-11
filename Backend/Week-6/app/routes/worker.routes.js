const express = require("express");
const workerController = require("../controllers/worker.controller");
const { authenticate } = require("../middlewares/auth.middleware");

const router = express.Router();


// Get all workers
router.get(
  "/",
  authenticate,
  workerController.getWorkers
);


// Create a worker
router.post(
  "/",
  authenticate,
  workerController.createWorker
);


module.exports = router;