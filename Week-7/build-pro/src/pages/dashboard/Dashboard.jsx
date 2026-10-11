import {
  BriefcaseBusiness,
  ClipboardList,
  Users,
  Wallet,
  TrendingUp,
  Clock3,
  CheckCircle2,
  CircleDollarSign,
} from "lucide-react";

import { useAuthStore } from "../../store/useAuthStore";
import { useProjectDashboardQuery } from "../../api/projects/useProjectDashboardQuery";
import MainLayout from "../../components/layout/MainLayout";
import { useParams } from "react-router-dom";

function Dashboard() {
  const user = useAuthStore((state) => state.user);

  const { projectId } = useParams();

  const { data, isLoading, error } = useProjectDashboardQuery(projectId);

  const costs = data?.costs;
  const progress = data?.progress;

  const formatCurrency = (value) =>
    `Rs. ${Number(value || 0).toLocaleString()}`;

  return (
    <MainLayout>
      {/* Page Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-medium text-blue-600">Overview</p>

          <h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
            Dashboard
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Welcome back, {user?.name || "User"}. Here's what's happening with
            your construction projects.
          </p>
        </div>

        {data?.project && (
          <div className="rounded-xl border border-slate-200 bg-white px-5 py-3 shadow-sm">
            <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
              Active Project
            </p>

            <p className="mt-1 font-semibold text-slate-900">
              {data.project.projectName}
            </p>
          </div>
        )}
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <p className="text-sm text-slate-500">Loading project dashboard...</p>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-6">
          <p className="font-semibold text-red-700">
            Failed to load project dashboard.
          </p>

          <p className="mt-1 text-sm text-red-600">
            Please check that the Week-6 backend is running on port 5000.
          </p>
        </div>
      )}

      {/* Dashboard */}
      {!isLoading && !error && data && (
        <>
          {/* KPI Cards */}
          <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {/* Projects */}
            {/* Active Project */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Active Project
                  </p>

                  <p className="mt-3 text-3xl font-bold text-slate-900">
                    #{projectId}
                  </p>

                  <p className="mt-2 text-xs text-slate-400">Current project</p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <BriefcaseBusiness size={21} />
                </div>
              </div>
            </div>

            {/* Tasks */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Total Tasks
                  </p>

                  <p className="mt-3 text-3xl font-bold text-slate-900">
                    {progress?.totalTasks ?? 0}
                  </p>

                  <p className="mt-2 text-xs text-slate-400">Project tasks</p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-50 text-violet-600">
                  <ClipboardList size={21} />
                </div>
              </div>
            </div>

            {/* Progress */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Project Progress
                  </p>

                  <p className="mt-3 text-3xl font-bold text-slate-900">
                    {Number(progress?.progressPercentage ?? 0).toFixed(1)}%
                  </p>

                  <p className="mt-2 text-xs text-slate-400">
                    Overall completion
                  </p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <TrendingUp size={21} />
                </div>
              </div>

              <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
                <div
                  className="h-full rounded-full bg-blue-600 transition-all"
                  style={{
                    width: `${Math.min(
                      progress?.progressPercentage ?? 0,
                      100,
                    )}%`,
                  }}
                />
              </div>
            </div>

            {/* Cost */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    Project Cost
                  </p>

                  <p className="mt-3 text-2xl font-bold text-slate-900">
                    {formatCurrency(costs?.totalProjectCost)}
                  </p>

                  <p className="mt-2 text-xs text-slate-400">
                    Total recorded cost
                  </p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
                  <CircleDollarSign size={21} />
                </div>
              </div>
            </div>
          </div>

          {/* Main Grid */}
          <div className="mt-6 grid gap-6 xl:grid-cols-3">
            {/* Project Progress */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm xl:col-span-2">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-slate-900">
                    Project Progress
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Current task completion status
                  </p>
                </div>

                <div className="rounded-lg bg-blue-50 px-3 py-1.5 text-sm font-semibold text-blue-600">
                  {Number(progress?.progressPercentage ?? 0).toFixed(1)}%
                </div>
              </div>

              {/* Progress bar */}
              <div className="mt-7">
                <div className="flex justify-between text-sm">
                  <span className="font-medium text-slate-600">
                    Overall completion
                  </span>

                  <span className="font-semibold text-slate-900">
                    {progress?.completedTasks ?? 0}/{progress?.totalTasks ?? 0}
                  </span>
                </div>

                <div className="mt-3 h-3 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-blue-600"
                    style={{
                      width: `${Math.min(
                        progress?.progressPercentage ?? 0,
                        100,
                      )}%`,
                    }}
                  />
                </div>
              </div>

              {/* Status Cards */}
              <div className="mt-8 grid gap-4 sm:grid-cols-3">
                <div className="rounded-xl bg-emerald-50 p-4">
                  <div className="flex items-center gap-2 text-emerald-600">
                    <CheckCircle2 size={18} />

                    <span className="text-sm font-medium">Completed</span>
                  </div>

                  <p className="mt-3 text-2xl font-bold text-slate-900">
                    {progress?.completedTasks ?? 0}
                  </p>
                </div>

                <div className="rounded-xl bg-blue-50 p-4">
                  <div className="flex items-center gap-2 text-blue-600">
                    <Clock3 size={18} />

                    <span className="text-sm font-medium">In Progress</span>
                  </div>

                  <p className="mt-3 text-2xl font-bold text-slate-900">
                    {progress?.inProgressTasks ?? 0}
                  </p>
                </div>

                <div className="rounded-xl bg-orange-50 p-4">
                  <div className="flex items-center gap-2 text-orange-600">
                    <ClipboardList size={18} />

                    <span className="text-sm font-medium">Pending</span>
                  </div>

                  <p className="mt-3 text-2xl font-bold text-slate-900">
                    {progress?.pendingTasks ?? 0}
                  </p>
                </div>
              </div>
            </div>

            {/* Cost Summary */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Cost Summary
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Project expenditure breakdown
                </p>
              </div>

              <div className="mt-7 space-y-5">
                {/* Materials */}
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-500">Materials</span>

                    <span className="font-semibold text-slate-900">
                      {formatCurrency(costs?.materialCost)}
                    </span>
                  </div>

                  <div className="mt-2 h-2 rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-blue-500"
                      style={{
                        width: `${
                          costs?.totalProjectCost
                            ? Math.min(
                                (costs.materialCost / costs.totalProjectCost) *
                                  100,
                                100,
                              )
                            : 0
                        }%`,
                      }}
                    />
                  </div>
                </div>

                {/* Expenses */}
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-500">Expenses</span>

                    <span className="font-semibold text-slate-900">
                      {formatCurrency(costs?.expenseCost)}
                    </span>
                  </div>

                  <div className="mt-2 h-2 rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-orange-500"
                      style={{
                        width: `${
                          costs?.totalProjectCost
                            ? Math.min(
                                (costs.expenseCost / costs.totalProjectCost) *
                                  100,
                                100,
                              )
                            : 0
                        }%`,
                      }}
                    />
                  </div>
                </div>

                {/* Labor */}
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-500">Labor</span>

                    <span className="font-semibold text-slate-900">
                      {formatCurrency(costs?.laborCost)}
                    </span>
                  </div>

                  <div className="mt-2 h-2 rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-emerald-500"
                      style={{
                        width: `${
                          costs?.totalProjectCost
                            ? Math.min(
                                (costs.laborCost / costs.totalProjectCost) *
                                  100,
                                100,
                              )
                            : 0
                        }%`,
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Total */}
              <div className="mt-7 border-t border-slate-200 pt-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Wallet size={18} className="text-slate-400" />

                    <span className="text-sm font-medium text-slate-500">
                      Total Cost
                    </span>
                  </div>

                  <span className="text-xl font-bold text-slate-900">
                    {formatCurrency(costs?.totalProjectCost)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Overview */}
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                  <CheckCircle2 size={20} />
                </div>

                <div>
                  <p className="text-sm text-slate-500">Completed Tasks</p>

                  <p className="text-xl font-bold text-slate-900">
                    {progress?.completedTasks ?? 0}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Users size={20} />
                </div>

                <div>
                  <p className="text-sm text-slate-500">Workforce</p>

                  <p className="text-xl font-bold text-slate-900">—</p>

                  <p className="text-xs text-slate-400">Worker module</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
                  <CircleDollarSign size={20} />
                </div>

                <div>
                  <p className="text-sm text-slate-500">Labor Cost</p>

                  <p className="text-xl font-bold text-slate-900">
                    {formatCurrency(costs?.laborCost)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </MainLayout>
  );
}

export default Dashboard;
