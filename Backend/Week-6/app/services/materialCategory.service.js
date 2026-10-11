const { MaterialCategory } = require('../models');

// Create a material category
const createCategory = async (name, description) => {

  // Check if this category already exists
  const existingCategory = await MaterialCategory.findOne({
    where: { name }
  });

  if (existingCategory) {
    throw new Error('Material category already exists');
  }

  // Create the category
  const category = await MaterialCategory.create({
    name,
    description
  });

  return category;
};
// Get all material categories
const getCategories = async () => {
  const categories = await MaterialCategory.findAll({
    order: [['id', 'DESC']]
  });

  return categories;
};


module.exports = {
  createCategory,
  getCategories
};