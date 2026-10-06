const expenseService = require('../services/expense.service');

// Handle expense creation
const createExpense = async (req, res) => {
  try {
    const userId = req.userId;

    const {
      projectId,
      category,
      description,
      amount,
      expenseDate,
      notes
    } = req.body;

    const expense = await expenseService.createExpense(
      userId,
      projectId,
      category,
      description,
      amount,
      expenseDate,
      notes
    );

    res.status(201).json({
      message: 'Expense created successfully',
      expense: {
        id: expense.id,
        projectId: expense.projectId,
        category: expense.category,
        description: expense.description,
        amount: expense.amount,
        expenseDate: expense.expenseDate,
        notes: expense.notes
      }
    });

  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};
// Get all expenses for a project
const getProjectExpenses = async (req, res) => {
  try {
    const userId = req.userId;
    const { projectId } = req.params;

    const result =
      await expenseService.getProjectExpenses(
        userId,
        projectId
      );

    res.status(200).json({
      message: 'Project expenses retrieved successfully',

      project: {
        id: result.project.id,
        projectName: result.project.projectName
      },

      expenses: result.expenses.map(expense => ({
        id: expense.id,
        projectId: expense.projectId,
        category: expense.category,
        description: expense.description,
        amount: expense.amount,
        expenseDate: expense.expenseDate,
        notes: expense.notes
      })),

      totalExpense: result.totalExpense
    });

  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};

module.exports = {
  createExpense,
  getProjectExpenses
};