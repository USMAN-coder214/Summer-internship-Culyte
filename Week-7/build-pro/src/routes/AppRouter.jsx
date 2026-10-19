import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/auth/Login";
import Dashboard from "../pages/dashboard/Dashboard";
import Projects from "../pages/projects/Projects";
import Tasks from "../pages/tasks/Tasks";
import ProtectedRoute from "./ProtectedRoute";

import Materials from "../pages/materials/Materials";
import Expenses from "../pages/expenses/Expenses";
import Workers from "../pages/workers/Workers";

import ProjectWorkers from "../pages/workers/ProjectWorkers";
import ProjectMaterials from "../pages/materials/ProjectMaterials";

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>

        {/* ================= PUBLIC ================= */}

        <Route
          path="/login"
          element={<Login />}
        />


        {/* ================= PROTECTED ================= */}

        <Route element={<ProtectedRoute />}>

          {/* Dashboard */}
          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/dashboard/:projectId"
            element={<Dashboard />}
          />


          {/* Projects */}
          <Route
            path="/projects"
            element={<Projects />}
          />


          {/* ================= PROJECT TASKS ================= */}

          <Route
            path="/projects/:projectId/tasks"
            element={<Tasks />}
          />

          {/* Old Tasks link → default project */}
          <Route
            path="/tasks"
            element={
              <Navigate
                to="/projects/1/tasks"
                replace
              />
            }
          />


          {/* ================= MATERIALS ================= */}

          <Route
            path="/materials"
            element={<Materials />}
          />

          <Route
            path="/projects/:projectId/materials"
            element={<ProjectMaterials />}
          />

          {/* Old Project Materials link */}
          <Route
            path="/project-materials"
            element={
              <Navigate
                to="/projects/1/materials"
                replace
              />
            }
          />


          {/* ================= EXPENSES ================= */}

          <Route
            path="/expenses"
            element={<Expenses />}
          />

          <Route
            path="/projects/:projectId/expenses"
            element={<Expenses />}
          />


          {/* ================= WORKERS ================= */}

          <Route
            path="/workers"
            element={<Workers />}
          />

          <Route
            path="/projects/:projectId/workers"
            element={<ProjectWorkers />}
          />

          {/* Old Project Workers link */}
          <Route
            path="/project-workers"
            element={
              <Navigate
                to="/projects/1/workers"
                replace
              />
            }
          />

        </Route>


        {/* ================= FALLBACK ================= */}

        {/* <Route
          path="*"
          element={
            <Navigate
              to="/dashboard"
              replace
            />
          }
        /> */}
        
{/* ================= DEFAULT & FALLBACK ================= */}

<Route
  path="/"
  element={<Navigate to="/login" replace />}
/>

<Route
  path="*"
  element={<Navigate to="/login" replace />}
/>


      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;