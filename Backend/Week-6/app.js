process.on("exit", (code) => {
  console.log("NODE PROCESS EXITED WITH CODE:", code);
});

process.on("uncaughtException", (error) => {
  console.error("UNCAUGHT EXCEPTION:", error);
});

process.on("unhandledRejection", (error) => {
  console.error("UNHANDLED REJECTION:", error);
});


require('dotenv').config();

const express = require('express');
const cors = require('cors');

// Import authentication routes
const authRoutes = require('./app/routes/auth.routes');

const companyRoutes = require('./app/routes/company.routes');
const projectRoutes = require('./app/routes/project.routes');
const materialCategoryRoutes = require('./app/routes/materialCategory.routes');
const materialRoutes = require('./app/routes/material.routes');
const projectMaterialRoutes = require('./app/routes/projectMaterial.routes');
const expenseRoutes = require('./app/routes/expense.routes');
const workerRoutes = require('./app/routes/worker.routes');
const projectWorkerRoutes = require('./app/routes/projectWorker.routes');
const taskRoutes = require('./app/routes/task.routes');

const app = express();

// Allow requests from our frontend
app.use(cors());

// Allow Express to read JSON request bodies
app.use(express.json());

// Authentication routes
app.use('/api/auth', authRoutes);
app.use('/api/company', companyRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/material-categories', materialCategoryRoutes);
app.use('/api/materials', materialRoutes);
app.use('/api/project-materials', projectMaterialRoutes);
app.use('/api/expenses', expenseRoutes);
app.use('/api/workers', workerRoutes);
app.use('/api/project-workers', projectWorkerRoutes);
app.use('/api/tasks', taskRoutes);


// Simple test route
app.get('/', (req, res) => {
  res.json({
    message: 'Culyte Construction API is running'
  });
});

// Start the server

 // Export the Express app for Vercel
module.exports = app;

// Start the server only when running locally
if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 5000;

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}
