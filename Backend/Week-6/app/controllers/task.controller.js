const taskService = require("../services/task.service");

// Create a task
const createTask = async (req, res) => {
  try {
    const userId = req.userId;
    //
    const {
      projectId,
      taskName,
      description,
      status,
      priority,
      startDate,
      expectedEndDate,
    } = req.body;

    // Validate required fields
    if (
      !projectId ||
      !taskName ||
      !status ||
      !priority ||
      !startDate ||
      !expectedEndDate
    ) {
      return res.status(400).json({
        message:
          "projectId, taskName, status, priority, startDate and expectedEndDate are required",
      });
    }

    // Validate projectId
    if (!Number.isInteger(Number(projectId))) {
      return res.status(400).json({
        message: "projectId must be a valid integer",
      });
    }

    // Validate status
    const allowedStatuses = ["Pending", "In Progress", "Completed"];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid status. Use Pending, In Progress, or Completed",
      });
    }
    // Validate priority
const allowedPriorities = ["Low", "Medium", "High"];

if (!allowedPriorities.includes(priority)) {
  return res.status(400).json({
    message: "Invalid priority. Use Low, Medium, or High",
  });
}
// Validate task dates
const start = new Date(startDate);
const end = new Date(expectedEndDate);

if (isNaN(start.getTime()) || isNaN(end.getTime())) {
  return res.status(400).json({
    message: "startDate and expectedEndDate must be valid dates",
  });
}

if (end < start) {
  return res.status(400).json({
    message: "expectedEndDate cannot be before startDate",
  });
}
    const task = await taskService.createTask(
      userId,
      projectId,
      taskName,
      description,
      status,
      priority,
      startDate,
      expectedEndDate,
    );

    res.status(201).json({
      message: "Task created successfully",
      task: {
        id: task.id,
        projectId: task.projectId,
        taskName: task.taskName,
        description: task.description,
        status: task.status,
        priority: task.priority,
        startDate: task.startDate,
        expectedEndDate: task.expectedEndDate,
      },
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
// Get all tasks for a project
const getProjectTasks = async (req, res) => {
  try {
    const userId = req.userId;
    const { projectId } = req.params;

    const result = await taskService.getProjectTasks(userId, projectId);

    res.status(200).json({
      message: "Project tasks retrieved successfully",

      project: {
        id: result.project.id,
        projectName: result.project.projectName,
      },

      tasks: result.tasks.map((task) => ({
        id: task.id,
        taskName: task.taskName,
        description: task.description,
        status: task.status,
        priority: task.priority,
        startDate: task.startDate,
        expectedEndDate: task.expectedEndDate,
      })),
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
// Update task status
const updateTaskStatus = async (req, res) => {
  try {
    const userId = req.userId;
    const { taskId } = req.params;
    const { status } = req.body;

    const task = await taskService.updateTaskStatus(userId, taskId, status);

    res.status(200).json({
      message: "Task status updated successfully",
      task: {
        id: task.id,
        projectId: task.projectId,
        taskName: task.taskName,
        description: task.description,
        status: task.status,
        priority: task.priority,
        startDate: task.startDate,
        expectedEndDate: task.expectedEndDate,
      },
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
// Get overall project progress
const getProjectProgress = async (req, res) => {
  try {
    const userId = req.userId;
    const { projectId } = req.params;

    const result = await taskService.getProjectProgress(userId, projectId);

    res.status(200).json({
      message: "Project progress retrieved successfully",

      project: {
        id: result.project.id,
        projectName: result.project.projectName,
      },

      progress: {
        totalTasks: result.totalTasks,
        completedTasks: result.completedTasks,
        inProgressTasks: result.inProgressTasks,
        pendingTasks: result.pendingTasks,
        progressPercentage: result.progressPercentage,
      },
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
// Update a complete task
const updateTask = async (req, res) => {
  try {
    const userId = req.userId;
    const { taskId } = req.params;

    const {
      taskName,
      description,
      status,
      priority,
      startDate,
      expectedEndDate,
    } = req.body;

    // Validate required fields
if (
  !taskName ||
  !status ||
  !priority ||
  !startDate ||
  !expectedEndDate
) {
  return res.status(400).json({
    message:
      "taskName, status, priority, startDate and expectedEndDate are required",
  });
}

// Validate status
const allowedStatuses = ["Pending", "In Progress", "Completed"];

if (!allowedStatuses.includes(status)) {
  return res.status(400).json({
    message: "Invalid status. Use Pending, In Progress, or Completed",
  });
}

// Validate priority
const allowedPriorities = ["Low", "Medium", "High"];

if (!allowedPriorities.includes(priority)) {
  return res.status(400).json({
    message: "Invalid priority. Use Low, Medium, or High",
  });
}

// Validate dates
const start = new Date(startDate);
const end = new Date(expectedEndDate);

if (isNaN(start.getTime()) || isNaN(end.getTime())) {
  return res.status(400).json({
    message: "startDate and expectedEndDate must be valid dates",
  });
}

if (end < start) {
  return res.status(400).json({
    message: "expectedEndDate cannot be before startDate",
  });
}

    const task = await taskService.updateTask(
      userId,
      taskId,
      taskName,
      description,
      status,
      priority,
      startDate,
      expectedEndDate,
    );

    res.status(200).json({
      message: "Task updated successfully",
      task: {
        id: task.id,
        projectId: task.projectId,
        taskName: task.taskName,
        description: task.description,
        status: task.status,
        priority: task.priority,
        startDate: task.startDate,
        expectedEndDate: task.expectedEndDate,
      },
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
// Delete a task
const deleteTask = async (req, res) => {
  try {
    const userId = req.userId;
    const { taskId } = req.params;

    await taskService.deleteTask(userId, taskId);

    res.status(200).json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message,
    });
  }
};
module.exports = {
  createTask,
  getProjectTasks,
  updateTaskStatus,
  getProjectProgress,
  updateTask,
  deleteTask,
};
