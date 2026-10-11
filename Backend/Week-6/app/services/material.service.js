const { Material, MaterialCategory } = require('../models');

// Create a material under an existing category
const createMaterial = async (
  categoryId,
  name,
  unit,
  description
) => {

  // Make sure the category exists
  const category = await MaterialCategory.findByPk(categoryId);

  if (!category) {
    throw new Error('Material category not found');
  }

  // Check if this material already exists
  const existingMaterial = await Material.findOne({
    where: {
      categoryId,
      name
    }
  });

  if (existingMaterial) {
    throw new Error('Material already exists in this category');
  }

  // Create the material
  const material = await Material.create({
    categoryId,
    name,
    unit,
    description
  });

  return material;
};
const getMaterials = async () => {
  const materials = await Material.findAll({
    include: [
      {
        model: MaterialCategory,
        attributes: ['id', 'name']
      }
    ],
    order: [['id', 'DESC']]
  });

  return materials;
};

module.exports = {
  createMaterial,
  getMaterials
};