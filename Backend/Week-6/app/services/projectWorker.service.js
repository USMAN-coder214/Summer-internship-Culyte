const {
  ProjectWorker,
  Project,
  Worker,
  Company
} = require('../models');

// Assign a worker to a project
const assignWorkerToProject = async (
  userId,
  projectId,
  workerId,
  daysWorked,
  startDate,
  endDate
) => {

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

  // Check that the worker belongs to this company
  const worker = await Worker.findOne({
    where: {
      id: workerId,
      companyId: company.id
    }
  });

  if (!worker) {
    throw new Error(
      'Worker not found or does not belong to your company'
    );
  }

  // Use the worker's stored daily wage
  const dailyWage = Number(worker.dailyWage);

  // Calculate labor cost on the server
  const totalCost = Number(daysWorked) * dailyWage;

  // Create project-worker record
  const projectWorker = await ProjectWorker.create({
    projectId,
    workerId,
    daysWorked,
    dailyWage,
    totalCost,
    startDate,
    endDate
  });

  return projectWorker;
};
// Get all workers assigned to a project
const getProjectWorkers = async (userId, projectId) => {

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

  // Get all workers assigned to this project
  const projectWorkers = await ProjectWorker.findAll({
    where: {
      projectId: project.id
    },
    include: [
      {
        model: Worker,
        attributes: ['id', 'name', 'skill', 'phone', 'dailyWage']
      }
    ]
  });

  // Calculate total labor cost
  const totalLaborCost = projectWorkers.reduce(
    (total, item) => total + Number(item.totalCost),
    0
  );

  return {
    project,
    projectWorkers,
    totalLaborCost
  };
};

module.exports = {
  assignWorkerToProject,
  getProjectWorkers
};