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

    // Validate required fields
if (
  !projectId ||
  !category ||
  !description ||
  amount === undefined ||
  !expenseDate
) {
  return res.status(400).json({
    message:
      'projectId, category, description, amount and expenseDate are required'
  });
}

// Validate projectId
if (!Number.isInteger(Number(projectId))) {
  return res.status(400).json({
    message: 'projectId must be a valid integer'
  });
}

// Validate amount
if (Number(amount) <= 0 || isNaN(Number(amount))) {
  return res.status(400).json({
    message: 'amount must be a positive number'
  });
}

// Validate expense date
const ParsedExpenseDate = new Date(expenseDate);

if (isNaN(ParsedExpenseDate.getTime())) {
  return res.status(400).json({
    message: 'expenseDate must be a valid date'
  });
}

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