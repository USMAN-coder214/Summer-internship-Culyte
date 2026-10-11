import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useWorkersQuery } from "../../api/workers/useWorkersQuery";
import MainLayout from "../../components/layout/MainLayout";
import { useCreateWorkerMutation } from "../../api/workers/useCreateWorkerMutation";

function Workers() {
  const navigate = useNavigate();
  const createWorker = useCreateWorkerMutation();

  const { data, isLoading, error } = useWorkersQuery();

  const workers = data?.workers || [];

  const [form, setForm] = useState({
    name: "",
    phone: "",
    skill: "",
    dailyWage: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    createWorker.mutate(
      {
        name: form.name,
        phone: form.phone,
        skill: form.skill,
        dailyWage: Number(form.dailyWage),
      },
      {
        onSuccess: () => {
          setForm({
            name: "",
            phone: "",
            skill: "",
            dailyWage: "",
          });
        },
      },
    );
  };

  return (
    <MainLayout>
      <main className="min-h-screen bg-[#f4f7fb]">
        {/* Page Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-medium text-blue-600">
              Workforce Management
            </p>

            <h1 className="mt-1 text-3xl font-bold text-slate-900">Workers</h1>

            <p className="mt-2 text-slate-500">
              Manage your construction workforce and daily wages.
            </p>
          </div>

          <button
            onClick={() => navigate("/projects/1/workers")}
            className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
          >
            Assign to Project
          </button>
        </div>

        {/* Summary Cards */}
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-xl">
              👷
            </div>

            <p className="mt-4 text-sm text-slate-500">Workers Added</p>

            <p className="mt-1 text-3xl font-bold text-slate-900">
              {workers.length}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-xl">
              ✓
            </div>

            <p className="mt-4 text-sm text-slate-500">Workforce Status</p>

            <p className="mt-1 text-2xl font-bold text-emerald-600">Active</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-xl">
              Rs.
            </div>

            <p className="mt-4 text-sm text-slate-500">Average Daily Wage</p>

            <p className="mt-1 text-2xl font-bold text-slate-900">
              Rs.{" "}
              {workers.length
                ? Math.round(
                    workers.reduce(
                      (total, worker) => total + Number(worker.dailyWage || 0),
                      0,
                    ) / workers.length,
                  ).toLocaleString()
                : "0"}
            </p>
          </div>
        </div>

        {/* Create Worker */}
        <section className="mt-8 rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 px-6 py-5">
            <h2 className="text-lg font-bold text-slate-900">Add New Worker</h2>

            <p className="mt-1 text-sm text-slate-500">
              Add a worker to your company workforce.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="grid gap-5 p-6 md:grid-cols-2"
          >
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Worker Name
              </label>

              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="Ahmed Khan"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-blue-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Phone Number
              </label>

              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
                placeholder="03001234567"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-blue-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Skill
              </label>

              <input
                name="skill"
                value={form.skill}
                onChange={handleChange}
                required
                placeholder="Mason"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-blue-500 focus:bg-white"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Daily Wage
              </label>

              <input
                type="number"
                name="dailyWage"
                value={form.dailyWage}
                onChange={handleChange}
                required
                min="0"
                placeholder="2500"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-blue-500 focus:bg-white"
              />
            </div>

            <div className="md:col-span-2">
              {createWorker.isSuccess && (
                <div className="mb-4 rounded-xl bg-emerald-50 p-4 text-sm font-medium text-emerald-700">
                  Worker created successfully.
                </div>
              )}

              {createWorker.isError && (
                <div className="mb-4 rounded-xl bg-red-50 p-4 text-sm font-medium text-red-700">
                  {createWorker.error?.response?.data?.message ||
                    "Failed to create worker."}
                </div>
              )}

              <button
                type="submit"
                disabled={createWorker.isPending}
                className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {createWorker.isPending ? "Creating..." : "Add Worker"}
              </button>
            </div>
          </form>
        </section>

        {isLoading && (
          <div className="mt-8 rounded-2xl bg-white p-8 text-center text-slate-500 shadow-sm">
            Loading workers...
          </div>
        )}

        {error && (
          <div className="mt-8 rounded-2xl bg-red-50 p-6 text-red-700">
            Failed to load workers.
          </div>
        )}

        {/* Workers */}
        <section className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-100 px-6 py-5">
            <h2 className="text-lg font-bold text-slate-900">
              Recently Added Workers
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Workers added during this session.
            </p>
          </div>

          {workers.length === 0 ? (
            <div className="p-10 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-2xl">
                👷
              </div>

              <p className="mt-4 font-semibold text-slate-700">
                No workers added yet
              </p>

              <p className="mt-1 text-sm text-slate-400">
                Add your first worker using the form above.
              </p>
            </div>
          ) : (
            <div className="divide-y">
              {workers.map((worker) => (
                <div
                  key={worker.id}
                  className="grid gap-5 px-6 py-5 md:grid-cols-4"
                >
                  <div>
                    <p className="text-xs font-medium text-slate-400">Worker</p>

                    <p className="mt-1 font-semibold text-slate-900">
                      {worker.name}
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                      {worker.phone}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-medium text-slate-400">Skill</p>

                    <p className="mt-1 font-semibold text-slate-700">
                      {worker.skill}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-medium text-slate-400">
                      Daily Wage
                    </p>

                    <p className="mt-1 font-semibold text-slate-900">
                      Rs. {Number(worker.dailyWage || 0).toLocaleString()}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-medium text-slate-400">
                      Worker ID
                    </p>

                    <p className="mt-1 font-semibold text-blue-600">
                      #{worker.id}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </MainLayout>
  );
}

export default Workers;
