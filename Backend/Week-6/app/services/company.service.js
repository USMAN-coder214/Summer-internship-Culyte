const { Company } = require('../models');

// Create a company for the authenticated user
const createCompany = async (userId, companyName, phone, address, city) => {

  // Check if this user already has a company
  const existingCompany = await Company.findOne({
    where: { userId }
  });

  if (existingCompany) {
    throw new Error('Company already exists for this user');
  }

  // Create the company
  const company = await Company.create({
    userId,
    companyName,
    phone,
    address,
    city
  });

  return company;
};

module.exports = {
  createCompany
};