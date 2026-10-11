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

    // Validate required fields
if (!categoryId || !name || !unit) {
  return res.status(400).json({
    message: 'categoryId, name and unit are required'
  });
}

// Validate categoryId
if (!Number.isInteger(Number(categoryId))) {
  return res.status(400).json({
    message: 'categoryId must be a valid integer'
  });
}

// Validate name
if (typeof name !== 'string' || !name.trim()) {
  return res.status(400).json({
    message: 'name must be a valid text value'
  });
}

// Validate unit
if (typeof unit !== 'string' || !unit.trim()) {
  return res.status(400).json({
    message: 'unit must be a valid text value'
  });
}

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
const getMaterials = async (req, res) => {
  try {
    const materials =
      await materialService.getMaterials();

    res.status(200).json({
      message: 'Materials retrieved successfully',
      materials
    });

  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};

module.exports = {
  createMaterial,
  getMaterials
};