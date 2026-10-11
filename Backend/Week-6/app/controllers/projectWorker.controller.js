const projectWorkerService = require('../services/projectWorker.service');

// Assign a worker to a project
const assignWorkerToProject = async (req, res) => {
  try {
    const userId = req.userId;

    const {
      projectId,
      workerId,
      daysWorked,
      startDate,
      endDate
    } = req.body;

    // Validate required fields
    if (
      !projectId ||
      !workerId ||
      daysWorked === undefined ||
      !startDate ||
      !endDate
    ) {
      return res.status(400).json({
        message:
          'projectId, workerId, daysWorked, startDate and endDate are required'
      });
    }

    // Validate projectId
    if (!Number.isInteger(Number(projectId))) {
      return res.status(400).json({
        message: 'projectId must be a valid integer'
      });
    }

    // Validate workerId
    if (!Number.isInteger(Number(workerId))) {
      return res.status(400).json({
        message: 'workerId must be a valid integer'
      });
    }

    // Validate daysWorked
    if (Number(daysWorked) <= 0 || isNaN(Number(daysWorked))) {
      return res.status(400).json({
        message: 'daysWorked must be a positive number'
      });
    }

    // Validate dates
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      return res.status(400).json({
        message: 'startDate and endDate must be valid dates'
      });
    }

    if (end < start) {
      return res.status(400).json({
        message: 'endDate cannot be before startDate'
      });
    }

    const projectWorker =
      await projectWorkerService.assignWorkerToProject(
        userId,
        projectId,
        workerId,
        daysWorked,
        startDate,
        endDate
      );

    res.status(201).json({
      message: 'Worker assigned to project successfully',
      projectWorker: {
        id: projectWorker.id,
        projectId: projectWorker.projectId,
        workerId: projectWorker.workerId,
        daysWorked: projectWorker.daysWorked,
        dailyWage: projectWorker.dailyWage,
        totalCost: projectWorker.totalCost,
        startDate: projectWorker.startDate,
        endDate: projectWorker.endDate
      }
    });

  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};


// Get all workers assigned to a project
const getProjectWorkers = async (req, res) => {
  try {
    const userId = req.userId;
    const { projectId } = req.params;

    // Validate projectId
    if (!Number.isInteger(Number(projectId))) {
      return res.status(400).json({
        message: 'projectId must be a valid integer'
      });
    }

    const result =
      await projectWorkerService.getProjectWorkers(
        userId,
        Number(projectId)
      );

    res.status(200).json({
      message: 'Project workers retrieved successfully',
      project: result.project,
      projectWorkers: result.projectWorkers,
      totalLaborCost: result.totalLaborCost
    });

  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};


module.exports = {
  assignWorkerToProject,
  getProjectWorkers
};