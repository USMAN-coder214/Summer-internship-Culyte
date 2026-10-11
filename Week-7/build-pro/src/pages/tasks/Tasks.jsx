import { useState } from "react";
import { Link, useParams } from "react-router-dom";

import { useProjectTasksQuery } from "../../api/tasks/useProjectTasksQuery";
import { useCreateTaskMutation } from "../../api/tasks/useCreateTaskMutation";
import MainLayout from "../../components/layout/MainLayout";

function Tasks() {
  const { projectId } = useParams();

  const {
    data,
    isLoading,
    error,
  } = useProjectTasksQuery(projectId);

  const createTaskMutation = useCreateTaskMutation();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    taskName: "",
    description: "",
    status: "Pending",
    priority: "Medium",
    startDate: "",
    expectedEndDate: "",
  });

  const tasks = data?.tasks || [];

  const filteredTasks = tasks.filter((task) => {
    const searchText = search.toLowerCase();

    const matchesSearch =
      task.taskName?.toLowerCase().includes(searchText) ||
      task.description?.toLowerCase().includes(searchText);

    const matchesStatus =
      statusFilter === "All" ||
      task.status === statusFilter;

    const matchesPriority =
      priorityFilter === "All" ||
      task.priority === priorityFilter;

    return (
      matchesSearch &&
      matchesStatus &&
      matchesPriority
    );
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const closeModal = () => {
    setShowModal(false);
    createTaskMutation.reset();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    createTaskMutation.mutate(
      {
        projectId: Number(projectId),
        ...form,
      },
      {
        onSuccess: () => {
          setForm({
            taskName: "",
            description: "",
            status: "Pending",
            priority: "Medium",
            startDate: "",
            expectedEndDate: "",
          });

          setTimeout(() => {
            setShowModal(false);
            createTaskMutation.reset();
          }, 1000);
        },
      }
    );
  };

  const getStatusClass = (status) => {
    if (status === "Completed") {
      return "bg-emerald-50 text-emerald-700";
    }

    if (status === "In Progress") {
      return "bg-blue-50 text-blue-700";
    }

    return "bg-orange-50 text-orange-700";
  };

  const getPriorityClass = (priority) => {
    if (priority === "High") {
      return "bg-red-50 text-red-700";
    }

    if (priority === "Low") {
      return "bg-slate-100 text-slate-600";
    }

    return "bg-amber-50 text-amber-700";
  };

  return (
    <MainLayout>

      <main className=" p-6 md:p-8">

        {/* Header */}
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

          <div>
            <p className="text-sm font-medium text-blue-600">
              Project Management
            </p>

            <h1 className="mt-1 text-3xl font-bold text-slate-900">
              Tasks
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              {data?.project?.projectName || "Project"}
            </p>
          </div>

          <div className="flex gap-3">

            <Link
              to={`/dashboard/${projectId}`}
              className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
            >
              View Dashboard
            </Link>

            <button
              onClick={() => {
                createTaskMutation.reset();
                setShowModal(true);
              }}
              className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
            >
              + New Task
            </button>

          </div>

        </div>

        {/* Summary cards */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">
              Total Tasks
            </p>

            <p className="mt-2 text-3xl font-bold text-slate-900">
              {tasks.length}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">
              Completed
            </p>

            <p className="mt-2 text-3xl font-bold text-emerald-600">
              {tasks.filter(
                (task) => task.status === "Completed"
              ).length}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">
              In Progress
            </p>

            <p className="mt-2 text-3xl font-bold text-blue-600">
              {tasks.filter(
                (task) => task.status === "In Progress"
              ).length}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">
              Pending
            </p>

            <p className="mt-2 text-3xl font-bold text-orange-600">
              {tasks.filter(
                (task) => task.status === "Pending"
              ).length}
            </p>
          </div>

        </div>

        {/* Search + filters */}
        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">

          <div className="flex flex-col gap-4 lg:flex-row">

            <div className="relative flex-1">

              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                🔎
              </span>

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search tasks..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 outline-none focus:border-blue-500 focus:bg-white"
              />

            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-xl border border-slate-200 bg-slate-50 px-5 py-3 outline-none focus:border-blue-500"
            >
              <option value="All">All Status</option>
              <option value="Pending">Pending</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>

            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="rounded-xl border border-slate-200 bg-slate-50 px-5 py-3 outline-none focus:border-blue-500"
            >
              <option value="All">All Priority</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>

          </div>

        </div>

        {/* Task list */}
        <div className="mt-6">

          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900">
                Project Tasks
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                {filteredTasks.length} of {tasks.length} tasks
              </p>
            </div>
          </div>

          {isLoading && (
            <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
              <p className="text-slate-500">
                Loading tasks...
              </p>
            </div>
          )}

          {error && (
            <div className="rounded-2xl border border-red-200 bg-red-50 p-6">
              <p className="font-medium text-red-700">
                Failed to load tasks.
              </p>
            </div>
          )}

          {!isLoading && !error && (
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

              {/* Desktop heading */}
              <div className="hidden grid-cols-12 gap-4 border-b bg-slate-50 px-6 py-4 text-xs font-semibold uppercase tracking-wide text-slate-400 md:grid">

                <div className="col-span-4">
                  Task
                </div>

                <div className="col-span-2">
                  Status
                </div>

                <div className="col-span-2">
                  Priority
                </div>

                <div className="col-span-2">
                  Start
                </div>

                <div className="col-span-2">
                  Expected End
                </div>

              </div>

              {filteredTasks.map((task) => (

                <div
                  key={task.id}
                  className="grid gap-4 border-b border-slate-100 px-6 py-5 last:border-0 md:grid-cols-12 md:items-center"
                >

                  {/* Task */}
                  <div className="md:col-span-4">

                    <div className="flex items-start gap-3">

                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-sm font-bold text-blue-600">
                        #{task.id}
                      </div>

                      <div className="min-w-0">

                        <h3 className="font-semibold text-slate-900">
                          {task.taskName || "Unnamed Task"}
                        </h3>

                        <p className="mt-1 line-clamp-2 text-sm text-slate-500">
                          {task.description}
                        </p>

                      </div>

                    </div>

                  </div>

                  {/* Status */}
                  <div className="md:col-span-2">

                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getStatusClass(
                        task.status
                      )}`}
                    >
                      {task.status}
                    </span>

                  </div>

                  {/* Priority */}
                  <div className="md:col-span-2">

                    <span
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${getPriorityClass(
                        task.priority
                      )}`}
                    >
                      {task.priority}
                    </span>

                  </div>

                  {/* Start */}
                  <div className="md:col-span-2">

                    <p className="text-xs text-slate-400 md:hidden">
                      Start
                    </p>

                    <p className="mt-1 text-sm font-medium text-slate-700">
                      {task.startDate?.slice(0, 10)}
                    </p>

                  </div>

                  {/* End */}
                  <div className="md:col-span-2">

                    <p className="text-xs text-slate-400 md:hidden">
                      Expected End
                    </p>

                    <p className="mt-1 text-sm font-medium text-slate-700">
                      {task.expectedEndDate?.slice(0, 10)}
                    </p>

                  </div>

                </div>

              ))}

              {filteredTasks.length === 0 && (
                <div className="p-12 text-center">

                  <div className="text-4xl">
                    📋
                  </div>

                  <h3 className="mt-4 font-semibold text-slate-900">
                    No tasks found
                  </h3>

                  <p className="mt-2 text-sm text-slate-500">
                    Try changing your search or filters.
                  </p>

                </div>
              )}

            </div>
          )}

        </div>

      </main>

      {/* Create Task Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">

          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">

            {/* Modal header */}
            <div className="sticky top-0 flex items-center justify-between border-b bg-white px-6 py-5">

              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  Create New Task
                </h3>

                <p className="mt-1 text-sm text-slate-500">
                  Add a task to this project.
                </p>
              </div>

              <button
                type="button"
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
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Task Name
                </label>

                <input
                  name="taskName"
                  value={form.taskName}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Brickwork"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Priority
                </label>

                <select
                  name="priority"
                  value={form.priority}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                >
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>
              </div>

              <div className="md:col-span-2">

                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Description
                </label>

                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  required
                  rows="4"
                  placeholder="Describe the task..."
                  className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                />

              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Status
                </label>

                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
                >
                  <option>Pending</option>
                  <option>In Progress</option>
                  <option>Completed</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
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
                <label className="mb-2 block text-sm font-medium text-slate-700">
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

              <div className="md:col-span-2">

                {createTaskMutation.isSuccess && (
                  <div className="mb-4 rounded-xl bg-emerald-50 p-4 text-sm font-medium text-emerald-700">
                    Task created successfully.
                  </div>
                )}

                {createTaskMutation.isError && (
                  <div className="mb-4 rounded-xl bg-red-50 p-4 text-sm font-medium text-red-700">
                    {createTaskMutation.error?.response?.data?.message ||
                      "Failed to create task."}
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
                    disabled={createTaskMutation.isPending}
                    className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
                  >
                    {createTaskMutation.isPending
                      ? "Creating..."
                      : "Create Task"}
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

export default Tasks;