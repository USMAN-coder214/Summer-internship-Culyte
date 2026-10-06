const materialService = require('../services/material.service');

// Handle material creation request
const createMaterial = async (req, res) => {
  try {
    // Get material information from the request body
    const {
      categoryId,
      name,
      unit,
      description
    } = req.body;

    // Send the data to the service layer
    const material = await materialService.createMaterial(
      categoryId,
      name,
      unit,
      description
    );

    // Return the created material
    res.status(201).json({
      message: 'Material created successfully',
      material: {
        id: material.id,
        categoryId: material.categoryId,
        name: material.name,
        unit: material.unit,
        description: material.description
      }
    });

  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};

module.exports = {
  createMaterial
};