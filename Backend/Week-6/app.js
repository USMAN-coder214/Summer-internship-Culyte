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


// Simple test route
app.get('/', (req, res) => {
  res.json({
    message: 'Culyte Construction API is running'
  });
});

// Start the server
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});