const projectService = require("../services/project.service");

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
      status,
    } = req.body;
    // Validate required fields
    if (
      !projectName ||
      !projectType ||
      !plotLocation ||
      plotSize === undefined ||
      !plotUnit ||
      !startDate ||
      !expectedEndDate ||
      !status
    ) {
      return res.status(400).json({
        message:
          "projectName, projectType, plotLocation, plotSize, plotUnit, startDate, expectedEndDate and status are required",
      });
    }

    // Validate plotSize
    if (Number(plotSize) <= 0 || isNaN(Number(plotSize))) {
      return res.status(400).json({
        message: "plotSize must be a positive number",
      });
    }

    // Validate dates
    const parsedStartDate = new Date(startDate);
    const parsedEndDate = new Date(expectedEndDate);

    if (isNaN(parsedStartDate.getTime()) || isNaN(parsedEndDate.getTime())) {
      return res.status(400).json({
        message: "startDate and expectedEndDate must be valid dates",
      });
    }

    if (parsedEndDate < parsedStartDate) {
      return res.status(400).json({
        message: "expectedEndDate cannot be before startDate",
      });
    }

    // Validate status
    const allowedStatuses = ["Planning", "In Progress", "Completed", "On Hold"];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message:
          "Invalid status. Use Planning, In Progress, Completed, or On Hold",
      });
    }
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
      status,
    );

    // Return the created project
    res.status(201).json({
      message: "Project created successfully",
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
        status: project.status,
      },
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

// Get all projects for the authenticated user's company
const getProjects = async (req, res) => {
  try {
    const userId = req.userId;

    const projects = await projectService.getProjects(userId);

    res.status(200).json({
      message: 'Projects retrieved successfully',

      projects: projects.map((project) => ({
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
      }))
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

    const result = await projectService.getProjectCostSummary(
      userId,
      projectId,
    );

    res.status(200).json({
      message: "Project cost summary retrieved successfully",

      project: {
        id: result.project.id,
        projectName: result.project.projectName,
      },

      costs: {
        materialCost: result.materialCost,
        expenseCost: result.expenseCost,
        laborCost: result.laborCost,
        totalProjectCost: result.totalProjectCost,
      },
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
// Get complete project dashboard
const getProjectDashboard = async (req, res) => {
  try {
    const userId = req.userId;
    const { projectId } = req.params;

    const result = await projectService.getProjectDashboard(userId, projectId);

    res.status(200).json({
      message: "Project dashboard retrieved successfully",

      project: {
        id: result.project.id,
        projectName: result.project.projectName,
      },

      costs: {
        materialCost: result.costs.materialCost,
        expenseCost: result.costs.expenseCost,
        laborCost: result.costs.laborCost,
        totalProjectCost: result.costs.totalProjectCost,
      },

      progress: {
        totalTasks: result.progress.totalTasks,
        completedTasks: result.progress.completedTasks,
        inProgressTasks: result.progress.inProgressTasks,
        pendingTasks: result.progress.pendingTasks,
        progressPercentage: result.progress.progressPercentage,
      },
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};

module.exports = {
  createProject,
    getProjects,
  getProjectCostSummary,
  getProjectDashboard,
};
