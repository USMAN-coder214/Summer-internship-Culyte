const companyService = require('../services/company.service');

// Handle company creation request
const createCompany = async (req, res) => {
  try {
    // Get company information from the request body
    const {
      companyName,
      phone,
      address,
      city
    } = req.body;

    // The user ID comes from the verified JWT middleware
    const userId = req.userId;

    // Send the data to the service layer
    const company = await companyService.createCompany(
      userId,
      companyName,
      phone,
      address,
      city
    );

    // Send the created company back to the client
    res.status(201).json({
      message: 'Company created successfully',
      company: {
        id: company.id,
        companyName: company.companyName,
        phone: company.phone,
        address: company.address,
        city: company.city
      }
    });

  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};

module.exports = {
  createCompany
};