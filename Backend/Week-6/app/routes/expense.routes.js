const express = require('express');
const expenseController = require('../controllers/expense.controller');
const { authenticate } = require('../middlewares/auth.middleware');

const router = express.Router();

// Create an expense — requires login
router.post(
  '/',
  authenticate,
  expenseController.createExpense
);
// Get all expenses for a project — requires login
router.get(
  '/project/:projectId',
  authenticate,
  expenseController.getProjectExpenses
);

module.exports = router;