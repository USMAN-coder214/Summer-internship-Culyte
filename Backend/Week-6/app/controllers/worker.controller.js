const workerService = require('../services/worker.service');

// Create a worker
const createWorker = async (req, res) => {
  try {
    const userId = req.userId;

    const {
      name,
      phone,
      skill,
      dailyWage
    } = req.body;

    const worker = await workerService.createWorker(
      userId,
      name,
      phone,
      skill,
      dailyWage
    );

    res.status(201).json({
      message: 'Worker created successfully',
      worker: {
        id: worker.id,
        companyId: worker.companyId,
        name: worker.name,
        phone: worker.phone,
        skill: worker.skill,
        dailyWage: worker.dailyWage
      }
    });

  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};

module.exports = {
  createWorker
};