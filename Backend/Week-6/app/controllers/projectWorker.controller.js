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

module.exports = {
  assignWorkerToProject
};