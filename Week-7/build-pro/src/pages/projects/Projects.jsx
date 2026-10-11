import { Link } from "react-router-dom";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { projectService } from "../../services/project.service";
import { useProjectsQuery } from "../../api/projects/useProjectsQuery";
import MainLayout from "../../components/layout/MainLayout";

function Projects() {
  const queryClient = useQueryClient();

  const [form, setForm] = useState({
    projectName: "",
    projectType: "Residential",
    plotLocation: "",
    plotSize: "",
    plotUnit: "Marla",
    startDate: "",
    expectedEndDate: "",
    status: "Planning",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);

  const {
    data: projectsData,
    isLoading: projectsLoading,
    error: projectsError,
  } = useProjectsQuery();

  const projects = projectsData?.projects || [];

  const filteredProjects = projects.filter((project) => {
    const matchesSearch =
      project.projectName?.toLowerCase().includes(search.toLowerCase()) ||
      project.plotLocation?.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || project.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const closeModal = () => {
    setShowModal(false);
    setMessage("");
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");
    setError("");

    try {
      const data = await projectService.createProject({
        ...form,
        plotSize: Number(form.plotSize),
      });

      setMessage(`Project "${data.project.projectName}" created successfully.`);

      setForm({
        projectName: "",
        projectType: "Residential",
        plotLocation: "",
        plotSize: "",
        plotUnit: "Marla",
        startDate: "",
        expectedEndDate: "",
        status: "Planning",
      });

      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });

      setTimeout(() => {
        setShowModal(false);
        setMessage("");
      }, 1200);
    } catch (err) {
      console.error("CREATE PROJECT ERROR:", err);

      setError(err.response?.data?.message || "Failed to create project.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <main className="min-h-screen bg-slate-100 p-6 md:p-8">
        {/* Header */}
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-sm font-medium text-blue-600">Workspace</p>

            <h2 className="mt-1 text-3xl font-bold text-slate-900">Projects</h2>

            <p className="mt-2 text-slate-500">
              Create and manage your construction projects.
            </p>
          </div>

          <button
            onClick={() => {
              setMessage("");
              setError("");
              setShowModal(true);
            }}
            className="rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-blue-700"
          >
            + New Project
          </button>
        </div>

        {/* Search + Filter */}
        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="relative flex-1">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                🔎
              </span>

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search projects or locations..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 outline-none transition focus:border-blue-500 focus:bg-white"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-xl border border-slate-200 bg-slate-50 px-5 py-3 outline-none focus:border-blue-500"
            >
              <option value="All">All Status</option>
              <option value="Planning">Planning</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="On Hold">On Hold</option>
            </select>
          </div>
        </div>

        {/* Project count */}
        <div className="mt-6 flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-slate-900">Your Projects</h3>

            <p className="mt-1 text-sm text-slate-500">
              {filteredProjects.length} of {projects.length} projects
            </p>
          </div>
        </div>

        {/* Loading */}
        {projectsLoading && (
          <div className="mt-5 rounded-2xl bg-white p-10 text-center shadow-sm">
            <p className="text-slate-500">Loading projects...</p>
          </div>
        )}

        {/* Error */}
        {projectsError && (
          <div className="mt-5 rounded-2xl border border-red-200 bg-red-50 p-6">
            <p className="font-medium text-red-700">Failed to load projects.</p>
          </div>
        )}

        {/* Projects */}
        {!projectsLoading && !projectsError && (
          <div className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg"
              >
                {/* Card top */}
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Project #{project.id}
                    </p>

                    <h4 className="mt-2 truncate text-xl font-bold text-slate-900">
                      {project.projectName}
                    </h4>
                  </div>

                  <span
                    className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${
                      project.status === "Completed"
                        ? "bg-emerald-50 text-emerald-700"
                        : project.status === "In Progress"
                          ? "bg-blue-50 text-blue-700"
                          : project.status === "On Hold"
                            ? "bg-red-50 text-red-700"
                            : "bg-orange-50 text-orange-700"
                    }`}
                  >
                    {project.status}
                  </span>
                </div>

                {/* Details */}
                <div className="mt-6 space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <span className="text-sm text-slate-500">Type</span>

                    <span className="text-sm font-semibold text-slate-800">
                      {project.projectType}
                    </span>
                  </div>

                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <span className="text-sm text-slate-500">Location</span>

                    <span className="max-w-[60%] truncate text-right text-sm font-semibold text-slate-800">
                      {project.plotLocation}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-500">Plot Size</span>

                    <span className="text-sm font-semibold text-slate-800">
                      {project.plotSize} {project.plotUnit}
                    </span>
                  </div>
                </div>

                {/* Dates */}
                <div className="mt-6 rounded-xl bg-slate-50 p-4">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">Start</span>

                    <span className="font-medium text-slate-600">
                      {new Date(project.startDate).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="mt-3 flex justify-between text-xs">
                    <span className="text-slate-400">Expected End</span>

                    <span className="font-medium text-slate-600">
                      {new Date(project.expectedEndDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {/* Button */}
                {/* Project Actions */}
                <div className="mt-5 grid grid-cols-2 gap-3">
                  <Link
                    to={`/dashboard/${project.id}`}
                    className="rounded-xl bg-slate-900 px-4 py-3 text-center text-sm font-semibold text-white transition hover:bg-blue-600"
                  >
                    Dashboard
                  </Link>

                  <Link
                    to={`/projects/${project.id}/tasks`}
                    className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-center text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                  >
                    Tasks
                  </Link>

                  <Link
                    to={`/projects/${project.id}/materials`}
                    className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-center text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                  >
                    Materials
                  </Link>

                  <Link
                    to={`/projects/${project.id}/expenses`}
                    className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-center text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                  >
                    Expenses
                  </Link>
                  <Link
                    to={`/projects/${project.id}/workers`}
                    className="col-span-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-center text-sm font-semibold text-slate-700 hover:bg-blue-50 hover:text-blue-600"
                  >
                    Workers
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {!projectsLoading &&
          !projectsError &&
          filteredProjects.length === 0 && (
            <div className="mt-5 rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
              <div className="text-4xl">📁</div>

              <h3 className="mt-4 text-lg font-semibold text-slate-900">
                No projects found
              </h3>

              <p className="mt-2 text-sm text-slate-500">
                Try changing your search or status filter.
              </p>
            </div>
          )}
      </main>

      {/* Create Project Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
          <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white shadow-2xl">
            {/* Modal header */}
            <div className="sticky top-0 flex items-center justify-between border-b bg-white px-6 py-5">
              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  Create New Project
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Enter the project information below.
                </p>
              </div>

              <button
                onClick={closeModal}
                className="rounded-lg px-3 py-2 text-xl text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                ×
              </button>
            </div>

            <form
              onSubmit={handleSubmit}
              className="grid gap-5 p-6 md:grid-cols-2"
            >
              <div>
                <label className="mb-2 block text-sm font-medium">
                  Project Name
                </label>

                <input
                  name="projectName"
                  value={form.projectName}
                  onChange={handleChange}
                  required
                  placeholder="10-Marla House"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Project Type
                </label>

                <select
                  name="projectType"
                  value={form.projectType}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                >
                  <option>Residential</option>
                  <option>Commercial</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Plot Location
                </label>

                <input
                  name="plotLocation"
                  value={form.plotLocation}
                  onChange={handleChange}
                  required
                  placeholder="Islamabad"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Plot Size
                </label>

                <input
                  type="number"
                  name="plotSize"
                  value={form.plotSize}
                  onChange={handleChange}
                  required
                  min="1"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Plot Unit
                </label>

                <select
                  name="plotUnit"
                  value={form.plotUnit}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                >
                  <option>Marla</option>
                  <option>Kanal</option>
                  <option>Sq Ft</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">Status</label>

                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                >
                  <option>Planning</option>
                  <option>In Progress</option>
                  <option>Completed</option>
                  <option>On Hold</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Start Date
                </label>

                <input
                  type="date"
                  name="startDate"
                  value={form.startDate}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium">
                  Expected End Date
                </label>

                <input
                  type="date"
                  name="expectedEndDate"
                  value={form.expectedEndDate}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>

              {/* Messages */}
              <div className="md:col-span-2">
                {message && (
                  <div className="mb-4 rounded-xl bg-emerald-50 p-4 text-sm font-medium text-emerald-700">
                    {message}
                  </div>
                )}

                {error && (
                  <div className="mb-4 rounded-xl bg-red-50 p-4 text-sm font-medium text-red-700">
                    {error}
                  </div>
                )}

                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="rounded-xl border border-slate-200 px-5 py-3 font-medium text-slate-600 hover:bg-slate-50"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={loading}
                    className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
                  >
                    {loading ? "Creating..." : "Create Project"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </MainLayout>
  );
}

export default Projects;
