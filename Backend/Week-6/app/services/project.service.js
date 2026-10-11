const {
  Company,
  Project,
  ProjectMaterial,
  Expense,
  ProjectWorker,
  Task
} = require('../models');

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

// Get all projects for the authenticated user's company
const getProjects = async (userId) => {

  // Find the company belonging to the logged-in user
  const company = await Company.findOne({
    where: { userId }
  });

  if (!company) {
    throw new Error('Company not found');
  }

  // Get all projects belonging to this company
  const projects = await Project.findAll({
    where: {
      companyId: company.id
    },
    order: [
      ['createdAt', 'DESC']
    ]
  });

  return projects;
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
// Get complete project dashboard summary
const getProjectDashboard = async (userId, projectId) => {

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

  // Get materials
  const projectMaterials = await ProjectMaterial.findAll({
    where: {
      projectId: project.id
    }
  });

  // Get expenses
  const expenses = await Expense.findAll({
    where: {
      projectId: project.id
    }
  });

  // Get workers
  const projectWorkers = await ProjectWorker.findAll({
    where: {
      projectId: project.id
    }
  });

  // Get tasks
  const tasks = await Task.findAll({
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

  // Calculate total project cost
  const totalProjectCost =
    materialCost +
    expenseCost +
    laborCost;

  // Calculate task progress
  const totalTasks = tasks.length;

  let progressPoints = 0;

  tasks.forEach(task => {
    if (task.status === 'Completed') {
      progressPoints += 100;
    } else if (task.status === 'In Progress') {
      progressPoints += 50;
    }
  });

  const progressPercentage =
    totalTasks === 0
      ? 0
      : progressPoints / totalTasks;

  return {
    project,
    costs: {
      materialCost,
      expenseCost,
      laborCost,
      totalProjectCost
    },
    progress: {
  totalTasks,
  completedTasks: tasks.filter(
    task => task.status === 'Completed'
  ).length,
  inProgressTasks: tasks.filter(
    task => task.status === 'In Progress'
  ).length,
  pendingTasks: tasks.filter(
    task => task.status === 'Pending'
  ).length,
  progressPercentage
}
  };
};

module.exports = {
  createProject,
  getProjects,
  getProjectCostSummary,
  getProjectDashboard,
  
};