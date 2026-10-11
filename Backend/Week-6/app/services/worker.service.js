const { Worker, Company } = require("../models");

// Create a worker for the logged-in user's company
const createWorker = async (
  userId,
  name,
  phone,
  skill,
  dailyWage
) => {
  const company = await Company.findOne({
    where: { userId }
  });

  if (!company) {
    throw new Error("Company not found");
  }

  const worker = await Worker.create({
    companyId: company.id,
    name,
    phone,
    skill,
    dailyWage
  });

  return worker;
};


// Get all workers for the logged-in user's company
const getWorkers = async (userId) => {
  const company = await Company.findOne({
    where: { userId }
  });

  if (!company) {
    throw new Error("Company not found");
  }

  const workers = await Worker.findAll({
    where: {
      companyId: company.id
    },
    order: [["id", "DESC"]]
  });

  return workers;
};


module.exports = {
  createWorker,
  getWorkers
};