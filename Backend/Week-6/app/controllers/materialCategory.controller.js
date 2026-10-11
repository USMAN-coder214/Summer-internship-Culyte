const materialCategoryService = require('../services/materialCategory.service');

// Handle material category creation
const createCategory = async (req, res) => {
  try {
    // Get category data from the request body
    const { name, description } = req.body;

    // Validate category name
 if (!name || typeof name !== 'string' || !name.trim()) {
  return res.status(400).json({
    message: 'name is required and must be a valid text value'
  });
 }

    // Send the data to the service layer
    const category = await materialCategoryService.createCategory(
      name,
      description
    );

    // Return the created category
    res.status(201).json({
      message: 'Material category created successfully',
      category: {
        id: category.id,
        name: category.name,
        description: category.description
      }
    });

  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};

// Get all material categories
const getCategories = async (req, res) => {
  try {
    const categories =
      await materialCategoryService.getCategories();

    res.status(200).json({
      message: 'Material categories retrieved successfully',
      categories
    });

  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};

module.exports = {
  createCategory,
  getCategories
};