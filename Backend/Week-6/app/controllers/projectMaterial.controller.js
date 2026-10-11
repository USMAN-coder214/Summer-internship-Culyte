const projectMaterialService = require('../services/projectMaterial.service');

// Handle adding a material to a project
const addProjectMaterial = async (req, res) => {
  try {
    const userId = req.userId;
    const {
      projectId,
      materialId,
      quantity,
      unitPrice,
      purchaseDate,
      notes
    } = req.body;

    // Validate required fields
if (
  !projectId ||
  !materialId ||
  quantity === undefined ||
  unitPrice === undefined ||
  !purchaseDate
) {
  return res.status(400).json({
    message:
      'projectId, materialId, quantity, unitPrice and purchaseDate are required'
  });
}

// Validate projectId
if (!Number.isInteger(Number(projectId))) {
  return res.status(400).json({
    message: 'projectId must be a valid integer'
  });
}

// Validate materialId
if (!Number.isInteger(Number(materialId))) {
  return res.status(400).json({
    message: 'materialId must be a valid integer'
  });
}

// Validate quantity
if (Number(quantity) <= 0 || isNaN(Number(quantity))) {
  return res.status(400).json({
    message: 'quantity must be a positive number'
  });
}

// Validate unitPrice
if (Number(unitPrice) <= 0 || isNaN(Number(unitPrice))) {
  return res.status(400).json({
    message: 'unitPrice must be a positive number'
  });
}

// Validate purchase date
const purchase = new Date(purchaseDate);

if (isNaN(purchase.getTime())) {
  return res.status(400).json({
    message: 'purchaseDate must be a valid date'
  });
}

    const projectMaterial =
      await projectMaterialService.addProjectMaterial(
        userId,
        projectId,
        materialId,
        quantity,
        unitPrice,
        purchaseDate,
        notes
      );

    res.status(201).json({
      message: 'Material added to project successfully',
      projectMaterial: {
        id: projectMaterial.id,
        projectId: projectMaterial.projectId,
        materialId: projectMaterial.materialId,
        quantity: projectMaterial.quantity,
        unitPrice: projectMaterial.unitPrice,
        totalCost: projectMaterial.totalCost,
        purchaseDate: projectMaterial.purchaseDate,
        notes: projectMaterial.notes
      }
    });

  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};
// Get all materials used in a project
const getProjectMaterials = async (req, res) => {
  try {
    const userId = req.userId;
    const { projectId } = req.params;

    const result =
      await projectMaterialService.getProjectMaterials(
        userId,
        projectId
      );

    res.status(200).json({
      message: 'Project materials retrieved successfully',

      project: {
        id: result.project.id,
        projectName: result.project.projectName
      },

      materials: result.projectMaterials.map(item => ({
        id: item.id,
        materialId: item.materialId,
        material: item.Material.name,
        unit: item.Material.unit,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
        totalCost: item.totalCost,
        purchaseDate: item.purchaseDate,
        notes: item.notes
      })),

      totalMaterialCost: result.totalMaterialCost
    });

  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};

module.exports = {
  addProjectMaterial,
  getProjectMaterials
};