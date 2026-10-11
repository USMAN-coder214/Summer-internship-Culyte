const workerService = require("../services/worker.service");


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

    if (
      !name ||
      !phone ||
      !skill ||
      dailyWage === undefined
    ) {
      return res.status(400).json({
        message: "name, phone, skill and dailyWage are required"
      });
    }

    if (
      Number(dailyWage) <= 0 ||
      isNaN(Number(dailyWage))
    ) {
      return res.status(400).json({
        message: "dailyWage must be a positive number"
      });
    }

    const worker = await workerService.createWorker(
      userId,
      name,
      phone,
      skill,
      dailyWage
    );

    res.status(201).json({
      message: "Worker created successfully",
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


// Get all workers
const getWorkers = async (req, res) => {
  try {
    const userId = req.userId;

    const workers = await workerService.getWorkers(userId);

    res.status(200).json({
      message: "Workers retrieved successfully",
      workers: workers.map((worker) => ({
        id: worker.id,
        companyId: worker.companyId,
        name: worker.name,
        phone: worker.phone,
        skill: worker.skill,
        dailyWage: worker.dailyWage
      }))
    });

  } catch (error) {
    res.status(400).json({
      message: error.message
    });
  }
};


module.exports = {
  createWorker,
  getWorkers
};