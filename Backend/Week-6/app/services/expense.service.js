const { Expense, Project, Company } = require('../models');

// Add an expense to a project
const createExpense = async (
  userId,
  projectId,
  category,
  description,
  amount,
  expenseDate,
  notes
) => {

  // Find the company belonging to the logged-in user
  const company = await Company.findOne({
    where: { userId }
  });

  if (!company) {
    throw new Error('Company not found');
  }

  // Find the project only if it belongs to this company
  const project = await Project.findOne({
    where: {
      id: projectId,
      companyId: company.id
    }
  });

  if (!project) {
    throw new Error(
      'Project not found or does not belong to your company'
    );
  }

  // Create the expense
  const expense = await Expense.create({
    projectId,
    category,
    description,
    amount,
    expenseDate,
    notes
  });

  return expense;
};
// Get all expenses for a project
const getProjectExpenses = async (userId, projectId) => {

  // Find the company belonging to the logged-in user
  const company = await Company.findOne({
    where: { userId }
  });

  if (!company) {
    throw new Error('Company not found');
  }

  // Find the project only if it belongs to this company
  const project = await Project.findOne({
    where: {
      id: projectId,
      companyId: company.id
    }
  });

  if (!project) {
    throw new Error(
      'Project not found or does not belong to your company'
    );
  }

  // Get all expenses for this project
  const expenses = await Expense.findAll({
    where: {
      projectId: project.id
    },
    order: [['expenseDate', 'DESC']]
  });

  // Calculate total expenses
  const totalExpense = expenses.reduce(
    (total, expense) => total + Number(expense.amount),
    0
  );

  return {
    project,
    expenses,
    totalExpense
  };
};

module.exports = {
  createExpense,
  getProjectExpenses
};