const projectService = require('../services/project.service');

// Handle project creation request
const createProject = async (req, res) => {
  try {
    // Project information comes from the request body
    const {
      projectName,
      projectType,
      plotLocation,
      plotSize,
      plotUnit,
      startDate,
      expectedEndDate,
      status
    } = req.body;

    // User ID comes from the verified JWT
    const userId = req.userId;

    // Send the data to the service layer
    const project = await projectService.createProject(
      userId,
      projectName,
      projectType,
      plotLocation,
      plotSize,
      plotUnit,
      startDate,
      expectedEndDate,
      status
    );

    // Return the created project
    res.status(201).json({
      message: 'Project created successfully',
      project: {
        id: project.id,
        companyId: project.companyId,
        projectName: project.projectName,
        projectType: project.projectType,
        plotLocation: project.plotLocation,
        plotSize: project.plotSize,
        plotUnit: project.plotUnit,
        startDate: project.startDate,
        expectedEndDate: project.expectedEndDate,
        status: project.status
      }
    });

  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};
// Get complete financial summary of a project
const getProjectCostSummary = async (req, res) => {
  try {
    const userId = req.userId;
    const { projectId } = req.params;

    const result =
      await projectService.getProjectCostSummary(
        userId,
        projectId
      );

    res.status(200).json({
      message: 'Project cost summary retrieved successfully',

      project: {
        id: result.project.id,
        projectName: result.project.projectName
      },

      costs: {
        materialCost: result.materialCost,
        expenseCost: result.expenseCost,
        laborCost: result.laborCost,
        totalProjectCost: result.totalProjectCost
      }
    });

  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};

module.exports = {
  createProject,
  getProjectCostSummary
};