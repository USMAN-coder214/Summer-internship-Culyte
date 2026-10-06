const { Company, Project, ProjectMaterial,
  Expense,
  ProjectWorker } = require('../models');

// Create a project for the authenticated user's company
const createProject = async (
  userId,
  projectName,
  projectType,
  plotLocation,
  plotSize,
  plotUnit,
  startDate,
  expectedEndDate,
  status
) => {

  // Find the company that belongs to the logged-in user
  const company = await Company.findOne({
    where: { userId }
  });

  // Stop if the user does not have a company
  if (!company) {
    throw new Error('Company not found');
  }

  // Create the project under that company
  const project = await Project.create({
    companyId: company.id,
    projectName,
    projectType,
    plotLocation,
    plotSize,
    plotUnit,
    startDate,
    expectedEndDate,
    status
  });

  return project;
};


// Get complete financial summary of a project
const getProjectCostSummary = async (userId, projectId) => {

  // Find the company belonging to the logged-in user
  const company = await Company.findOne({
    where: { userId }
  });

  if (!company) {
    throw new Error('Company not found');
  }

  // Check that the project belongs to this company
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

  // Get project materials
  const projectMaterials = await ProjectMaterial.findAll({
    where: {
      projectId: project.id
    }
  });

  // Get project expenses
  const expenses = await Expense.findAll({
    where: {
      projectId: project.id
    }
  });

  // Get project workers
  const projectWorkers = await ProjectWorker.findAll({
    where: {
      projectId: project.id
    }
  });

  // Calculate material cost
  const materialCost = projectMaterials.reduce(
    (total, item) => total + Number(item.totalCost),
    0
  );

  // Calculate expense cost
  const expenseCost = expenses.reduce(
    (total, item) => total + Number(item.amount),
    0
  );

  // Calculate labor cost
  const laborCost = projectWorkers.reduce(
    (total, item) => total + Number(item.totalCost),
    0
  );

  // Calculate complete project cost
  const totalProjectCost =
    materialCost +
    expenseCost +
    laborCost;

  return {
    project,
    materialCost,
    expenseCost,
    laborCost,
    totalProjectCost
  };
};

module.exports = {
  createProject,
  getProjectCostSummary
};