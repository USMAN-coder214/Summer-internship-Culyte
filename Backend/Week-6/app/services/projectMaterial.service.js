const {
  ProjectMaterial,
  Project,
  Material,
  Company
} = require('../models');

// Add a material to a project
const addProjectMaterial = async (
  userId,
  projectId,
  materialId,
  quantity,
  unitPrice,
  purchaseDate,
  notes
) => {

  // Find the company belonging to the logged-in user
  const company = await Company.findOne({
    where: { userId }
  });

  if (!company) {
    throw new Error('Company not found');
  }

  // Find the project only if it belongs to this company
  const project = await Project.findOne({
    where: {
      id: projectId,
      companyId: company.id
    }
  });

  if (!project) {
    throw new Error(
      'Project not found or does not belong to your company'
    );
  }

  // Check that the material exists
  const material = await Material.findByPk(materialId);

  if (!material) {
    throw new Error('Material not found');
  }

  // Calculate total cost on the server
  const totalCost = quantity * unitPrice;

  // Create the project material record
  const projectMaterial = await ProjectMaterial.create({
    projectId,
    materialId,
    quantity,
    unitPrice,
    totalCost,
    purchaseDate,
    notes
  });

  return projectMaterial;
};
// Get all materials used in a project
const getProjectMaterials = async (userId, projectId) => {

  // Find the company belonging to the logged-in user
  const company = await Company.findOne({
    where: { userId }
  });

  if (!company) {
    throw new Error('Company not found');
  }

  // Find the project only if it belongs to this company
  const project = await Project.findOne({
    where: {
      id: projectId,
      companyId: company.id
    }
  });

  if (!project) {
    throw new Error(
      'Project not found or does not belong to your company'
    );
  }

  // Get all material records for this project
  const projectMaterials = await ProjectMaterial.findAll({
    where: {
      projectId: project.id
    },
    include: [
      {
        model: Material,
        attributes: ['id', 'name', 'unit']
      }
    ]
  });

  // Calculate total material cost
  const totalMaterialCost = projectMaterials.reduce(
    (total, item) => total + Number(item.totalCost),
    0
  );

  return {
    project,
    projectMaterials,
    totalMaterialCost
  };
};


module.exports = {
  addProjectMaterial,
  getProjectMaterials
};