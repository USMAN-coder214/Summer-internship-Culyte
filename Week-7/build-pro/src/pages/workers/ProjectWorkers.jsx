import { useState } from "react";
import { Link, useParams } from "react-router-dom";

import MainLayout from "../../components/layout/MainLayout";

import { useWorkersQuery } from "../../api/workers/useWorkersQuery";
import { useAssignWorkerMutation } from "../../api/workers/useAssignWorkerMutation";
import { useProjectWorkersQuery } from "../../api/workers/useProjectWorkersQuery";

function ProjectWorkers() {
  const { projectId } = useParams();

  // Get all company workers
  const {
    data: workersData,
    isLoading: workersLoading,
    error: workersError,
  } = useWorkersQuery();

  // Get workers already assigned to this project
  const {
    data,
    isLoading,
    error,
  } = useProjectWorkersQuery(projectId);

  const assignWorker = useAssignWorkerMutation();

  const workers = workersData?.workers || [];

  const [form, setForm] = useState({
    workerId: "",
    daysWorked: "",
    startDate: "",
    endDate: "",
  });

  const [assignment, setAssignment] = useState(null);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    assignWorker.mutate(
      {
        projectId: Number(projectId),
        workerId: Number(form.workerId),
        daysWorked: Number(form.daysWorked),
        startDate: form.startDate,
        endDate: form.endDate,
      },
      {
        onSuccess: (response) => {
          setAssignment(response.projectWorker);

          setForm({
            workerId: "",
            daysWorked: "",
            startDate: "",
            endDate: "",
          });
        },
      }
    );
  };

  return (
    <MainLayout className="min-h-screen bg-slate-100">

      {/* Header */}
      <header className="flex items-center justify-between bg-slate-900 px-8 py-5 text-white">
        <div>
          <h1 className="text-2xl font-bold">
            Build-Pro
          </h1>

          <p className="text-sm text-slate-400">
            Construction Management Platform
          </p>
        </div>

        <Link
          to="/workers"
          className="rounded-lg bg-white/10 px-4 py-2 text-sm hover:bg-white/20"
        >
          Workers
        </Link>
      </header>

      <main>

        {/* Page Heading */}
        <div>
          <h2 className="text-3xl font-bold text-slate-900">
            Project Workers
          </h2>

          <p className="mt-2 text-slate-500">
            Assign workers to construction projects.
          </p>
        </div>

        {/* Assign Worker */}
        <div className="mt-8 rounded-xl bg-white p-8 shadow-sm">

          <h3 className="text-xl font-semibold">
            Assign Worker
          </h3>

          <p className="mt-1 text-sm text-slate-500">
            Select a worker from your company and assign them to this project.
          </p>

          <form
            onSubmit={handleSubmit}
            className="mt-6 grid gap-5 md:grid-cols-2"
          >

            {/* Worker */}
            <div className="md:col-span-2">

              <label className="mb-2 block text-sm font-medium">
                Worker
              </label>

              {workersLoading ? (
                <div className="rounded-lg border border-slate-300 bg-slate-50 px-4 py-3 text-slate-500">
                  Loading workers...
                </div>
              ) : workersError ? (
                <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-red-600">
                  Failed to load workers.
                </div>
              ) : (
                <select
                  name="workerId"
                  value={form.workerId}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 outline-none focus:border-blue-500"
                >
                  <option value="">
                    Select Worker
                  </option>

                  {workers.map((worker) => (
                    <option
                      key={worker.id}
                      value={worker.id}
                    >
                      {worker.name} — {worker.skill} — Rs.{" "}
                      {Number(worker.dailyWage || 0).toLocaleString()}
                      /day
                    </option>
                  ))}
                </select>
              )}

              {workers.length === 0 &&
                !workersLoading &&
                !workersError && (
                  <p className="mt-2 text-sm text-slate-500">
                    No workers available. Add a worker first.
                  </p>
                )}

            </div>

            {/* Days Worked */}
            <div>

              <label className="mb-2 block text-sm font-medium">
                Days Worked
              </label>

              <input
                type="number"
                name="daysWorked"
                value={form.daysWorked}
                onChange={handleChange}
                required
                min="1"
                placeholder="10"
                className="w-full rounded-lg border border-slate-300 px-4 py-3"
              />

            </div>

            {/* Start Date */}
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
                className="w-full rounded-lg border border-slate-300 px-4 py-3"
              />

            </div>

            {/* End Date */}
            <div>

              <label className="mb-2 block text-sm font-medium">
                End Date
              </label>

              <input
                type="date"
                name="endDate"
                value={form.endDate}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-slate-300 px-4 py-3"
              />

            </div>

            {/* Information */}
            <div className="md:col-span-2">

              <div className="rounded-lg bg-blue-50 p-4 text-sm text-blue-700">
                The worker's registered daily wage will be used
                automatically. Labor cost is calculated securely by
                the backend.
              </div>

            </div>

            {/* Success / Error / Button */}
            <div className="md:col-span-2">

              {assignWorker.isSuccess && (
                <div className="mb-4 rounded-lg bg-green-50 p-4 text-green-700">
                  Worker assigned successfully.
                </div>
              )}

              {assignWorker.isError && (
                <div className="mb-4 rounded-lg bg-red-50 p-4 text-red-700">
                  {assignWorker.error?.response?.data?.message ||
                    "Failed to assign worker."}
                </div>
              )}

              <button
                type="submit"
                disabled={
                  assignWorker.isPending ||
                  workersLoading ||
                  workers.length === 0
                }
                className="rounded-lg bg-slate-900 px-6 py-3 font-medium text-white hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {assignWorker.isPending
                  ? "Assigning..."
                  : "Assign Worker"}
              </button>

            </div>

          </form>
        </div>

        {/* Project Workers */}
        <div className="mt-8 rounded-xl bg-white shadow-sm">

          <div className="border-b px-6 py-5">

            <h3 className="text-xl font-semibold">
              Project Workers
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Workers currently assigned to this project.
            </p>

          </div>

          {isLoading && (
            <p className="p-6 text-slate-500">
              Loading project workers...
            </p>
          )}

          {error && (
            <p className="p-6 text-red-600">
              Failed to load project workers.
            </p>
          )}

          {!isLoading && !error && (
            <div className="divide-y">

              {data?.projectWorkers?.map((item) => (

                <div
                  key={item.id}
                  className="grid gap-5 px-6 py-5 md:grid-cols-5"
                >

                  {/* Worker */}
                  <div>

                    <p className="text-xs text-slate-400">
                      Worker
                    </p>

                    <p className="mt-1 font-semibold text-slate-900">
                      {item.Worker?.name ||
                        `Worker #${item.workerId}`}
                    </p>

                    <p className="text-sm text-slate-500">
                      {item.Worker?.skill}
                    </p>

                  </div>

                  {/* Days */}
                  <div>

                    <p className="text-xs text-slate-400">
                      Days Worked
                    </p>

                    <p className="mt-1 font-semibold">
                      {item.daysWorked}
                    </p>

                  </div>

                  {/* Daily Wage */}
                  <div>

                    <p className="text-xs text-slate-400">
                      Daily Wage
                    </p>

                    <p className="mt-1 font-semibold">
                      Rs.{" "}
                      {Number(
                        item.dailyWage || 0
                      ).toLocaleString()}
                    </p>

                  </div>

                  {/* Total Cost */}
                  <div>

                    <p className="text-xs text-slate-400">
                      Total Cost
                    </p>

                    <p className="mt-1 font-semibold text-blue-600">
                      Rs.{" "}
                      {Number(
                        item.totalCost || 0
                      ).toLocaleString()}
                    </p>

                  </div>

                  {/* Period */}
                  <div>

                    <p className="text-xs text-slate-400">
                      Period
                    </p>

                    <p className="mt-1 text-sm">
                      {item.startDate?.slice(0, 10)}
                    </p>

                    <p className="text-sm text-slate-500">
                      to {item.endDate?.slice(0, 10)}
                    </p>

                  </div>

                </div>
              ))}

              {data?.projectWorkers?.length === 0 && (
                <p className="p-8 text-center text-slate-500">
                  No workers assigned to this project yet.
                </p>
              )}

            </div>
          )}

          {/* Total Labor Cost */}
          {!isLoading && !error && (
            <div className="border-t bg-slate-50 px-6 py-5 text-right">

              <span className="text-sm text-slate-500">
                Total Labor Cost
              </span>

              <span className="ml-3 text-xl font-bold text-slate-900">
                Rs.{" "}
                {Number(
                  data?.totalLaborCost || 0
                ).toLocaleString()}
              </span>

            </div>
          )}

        </div>

        {/* Assignment Created */}
        {assignment && (
          <div className="mt-8 rounded-xl bg-white p-6 shadow-sm">

            <h3 className="text-xl font-semibold">
              Assignment Created
            </h3>

            <div className="mt-5 grid gap-5 md:grid-cols-4">

              <div>
                <p className="text-sm text-slate-500">
                  Worker ID
                </p>

                <p className="mt-1 font-semibold">
                  #{assignment.workerId}
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  Days Worked
                </p>

                <p className="mt-1 font-semibold">
                  {assignment.daysWorked}
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  Daily Wage
                </p>

                <p className="mt-1 font-semibold">
                  Rs.{" "}
                  {Number(
                    assignment.dailyWage || 0
                  ).toLocaleString()}
                </p>
              </div>

              <div>
                <p className="text-sm text-slate-500">
                  Total Cost
                </p>

                <p className="mt-1 font-semibold">
                  Rs.{" "}
                  {Number(
                    assignment.totalCost || 0
                  ).toLocaleString()}
                </p>
              </div>

            </div>

          </div>
        )}

      </main>

    </MainLayout>
  );
}

export default ProjectWorkers;