const express = require('express');
const taskController = require('../controllers/task.controller');
const { authenticate } = require('../middlewares/auth.middleware');

const router = express.Router();

// Create a task — requires login
router.post(
  '/',
  authenticate,
  taskController.createTask
);
// Get all tasks for a project
router.get(
  '/project/:projectId',
  authenticate,
  taskController.getProjectTasks
);
// Update task status
router.patch(
  '/:taskId/status',
  authenticate,
  taskController.updateTaskStatus
);
// Get overall project progress
router.get(
  '/project/:projectId/progress',
  authenticate,
  taskController.getProjectProgress
);
// Update a complete task
router.patch(
  '/:taskId',
  authenticate,
  taskController.updateTask
);
// Delete a task
router.delete(
  '/:taskId',
  authenticate,
  taskController.deleteTask
);
module.exports = router;