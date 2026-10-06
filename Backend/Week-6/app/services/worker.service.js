const { Worker, Company } = require('../models');

// Create a worker for the logged-in user's company
const createWorker = async (
  userId,
  name,
  phone,
  skill,
  dailyWage
) => {

  // Find the company belonging to the logged-in user
  const company = await Company.findOne({
    where: { userId }
  });

  if (!company) {
    throw new Error('Company not found');
  }

  // Create the worker under this company
  const worker = await Worker.create({
    companyId: company.id,
    name,
    phone,
    skill,
    dailyWage
  });

  return worker;
};

module.exports = {
  createWorker
};