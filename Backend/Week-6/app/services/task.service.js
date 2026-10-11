const {
  Task,
  Project,
  Company
} = require('../models');

// Create a task for a project
const createTask = async (
  userId,
  projectId,
  taskName,
  description,
  status,
  priority,
  startDate,
  expectedEndDate
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

  // Create the task
  const task = await Task.create({
    projectId,
    taskName,
    description,
    status,
    priority,
    startDate,
    expectedEndDate
  });

  return task;
};
// Get all tasks for a project
const getProjectTasks = async (userId, projectId) => {

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

  // Get all tasks belonging to this project
  const tasks = await Task.findAll({
    where: {
      projectId: project.id
    },
    order: [['id', 'ASC']]
  });

  return {
    project,
    tasks
  };
};
// Update task status
const updateTaskStatus = async (
  userId,
  taskId,
  status
) => {

  // Find the company belonging to the logged-in user
  const company = await Company.findOne({
    where: { userId }
  });

  if (!company) {
    throw new Error('Company not found');
  }

  // Find the task and its project
  const task = await Task.findByPk(taskId);

  if (!task) {
    throw new Error('Task not found');
  }

  // Check that the task's project belongs to this company
  const project = await Project.findOne({
    where: {
      id: task.projectId,
      companyId: company.id
    }
  });

  if (!project) {
    throw new Error(
      'Task not found or does not belong to your company'
    );
  }

  // Validate status
  const allowedStatuses = [
    'Pending',
    'In Progress',
    'Completed'
  ];

  if (!allowedStatuses.includes(status)) {
    throw new Error(
      'Invalid status. Use Pending, In Progress, or Completed'
    );
  }

  // Update status
  task.status = status;

  await task.save();

  return task;
};
// Get overall project progress
const getProjectProgress = async (userId, projectId) => {

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

  // Get all tasks for this project
  const tasks = await Task.findAll({
    where: {
      projectId: project.id
    }
  });

  const totalTasks = tasks.length;

  let completedTasks = 0;
  let inProgressTasks = 0;
  let pendingTasks = 0;

  let progressPoints = 0;

  tasks.forEach(task => {

    if (task.status === 'Completed') {
      completedTasks++;
      progressPoints += 100;
    }

    else if (task.status === 'In Progress') {
      inProgressTasks++;
      progressPoints += 50;
    }

    else if (task.status === 'Pending') {
      pendingTasks++;
    }
  });

  const progressPercentage =
    totalTasks === 0
      ? 0
      : progressPoints / totalTasks;

  return {
    project,
    totalTasks,
    completedTasks,
    inProgressTasks,
    pendingTasks,
    progressPercentage
  };
};
// Update a complete task
const updateTask = async (
  userId,
  taskId,
  taskName,
  description,
  status,
  priority,
  startDate,
  expectedEndDate
) => {

  // Find the company belonging to the logged-in user
  const company = await Company.findOne({
    where: { userId }
  });

  if (!company) {
    throw new Error('Company not found');
  }

  // Find the task
  const task = await Task.findByPk(taskId);

  if (!task) {
    throw new Error('Task not found');
  }

  // Check that the task's project belongs to this company
  const project = await Project.findOne({
    where: {
      id: task.projectId,
      companyId: company.id
    }
  });

  if (!project) {
    throw new Error(
      'Task not found or does not belong to your company'
    );
  }

  // Validate status
  const allowedStatuses = [
    'Pending',
    'In Progress',
    'Completed'
  ];

  if (!allowedStatuses.includes(status)) {
    throw new Error(
      'Invalid status. Use Pending, In Progress, or Completed'
    );
  }

  // Update task
  task.taskName = taskName;
  task.description = description;
  task.status = status;
  task.priority = priority;
  task.startDate = startDate;
  task.expectedEndDate = expectedEndDate;

  await task.save();

  return task;
};
// Delete a task
const deleteTask = async (userId, taskId) => {

  // Find the company belonging to the logged-in user
  const company = await Company.findOne({
    where: { userId }
  });

  if (!company) {
    throw new Error('Company not found');
  }

  // Find the task
  const task = await Task.findByPk(taskId);

  if (!task) {
    throw new Error('Task not found');
  }

  // Check that the task's project belongs to this company
  const project = await Project.findOne({
    where: {
      id: task.projectId,
      companyId: company.id
    }
  });

  if (!project) {
    throw new Error(
      'Task not found or does not belong to your company'
    );
  }

  // Delete the task
  await task.destroy();

  return task;
};

module.exports = {
  createTask,
  getProjectTasks,
  updateTaskStatus,
  getProjectProgress,
  updateTask,
  deleteTask
};