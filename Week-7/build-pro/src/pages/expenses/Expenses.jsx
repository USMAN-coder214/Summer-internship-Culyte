import { useState } from "react";
import { Link,useParams } from "react-router-dom";
import { useProjectExpensesQuery } from "../../api/expenses/useProjectExpensesQuery";
import { useCreateExpenseMutation } from "../../api/expenses/useCreateExpenseMutation";
import MainLayout from "../../components/layout/MainLayout";

function Expenses() {
  const { projectId } = useParams();

  const { data, isLoading, error } =
    useProjectExpensesQuery(projectId);

  const createExpense = useCreateExpenseMutation();

  const [form, setForm] = useState({
    category: "",
    description: "",
    amount: "",
    expenseDate: "",
    notes: "",
  });

  const expenses = data?.expenses || [];

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

   createExpense.mutate({
  projectId: Number(projectId),
  category: form.category,
  description: form.description,
  amount: Number(form.amount),
  expenseDate: form.expenseDate,
  notes: form.notes,
});
  };

  return (
    <MainLayout className="min-h-screen bg-slate-100">

      

      <main className="p-8">

        <h2 className="text-3xl font-bold text-slate-900">
          Expenses
        </h2>

        <p className="mt-2 text-slate-500">
          {data?.project?.projectName || "Project"}
        </p>

        {/* Create Expense */}
        <div className="mt-8 rounded-xl bg-white p-8 shadow-sm">

          <h3 className="text-xl font-semibold">
            Add Expense
          </h3>

          <form
            onSubmit={handleSubmit}
            className="mt-6 grid gap-5 md:grid-cols-2"
          >

            <div>
              <label className="mb-2 block text-sm font-medium">
                Category
              </label>

              <input
                name="category"
                value={form.category}
                onChange={handleChange}
                required
                placeholder="Transportation"
                className="w-full rounded-lg border border-slate-300 px-4 py-3"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Amount
              </label>

              <input
                type="number"
                name="amount"
                value={form.amount}
                onChange={handleChange}
                required
                placeholder="2500"
                className="w-full rounded-lg border border-slate-300 px-4 py-3"
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium">
                Description
              </label>

              <input
                name="description"
                value={form.description}
                onChange={handleChange}
                required
                placeholder="Final regression expense"
                className="w-full rounded-lg border border-slate-300 px-4 py-3"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Expense Date
              </label>

              <input
                type="date"
                name="expenseDate"
                value={form.expenseDate}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-slate-300 px-4 py-3"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">
                Notes
              </label>

              <input
                name="notes"
                value={form.notes}
                onChange={handleChange}
                placeholder="Optional notes"
                className="w-full rounded-lg border border-slate-300 px-4 py-3"
              />
            </div>

            <div className="md:col-span-2">

              {createExpense.isSuccess && (
                <p className="mb-4 rounded-lg bg-green-50 p-3 text-green-700">
                  Expense created successfully.
                </p>
              )}

              {createExpense.isError && (
                <p className="mb-4 rounded-lg bg-red-50 p-3 text-red-700">
                  {createExpense.error?.response?.data?.message ||
                    "Failed to create expense."}
                </p>
              )}

              <button
                type="submit"
                disabled={createExpense.isPending}
                className="rounded-lg bg-slate-900 px-6 py-3 font-medium text-white hover:bg-slate-800 disabled:opacity-50"
              >
                {createExpense.isPending
                  ? "Saving..."
                  : "Add Expense"}
              </button>

            </div>

          </form>
        </div>

        {/* Expense List */}
        <div className="mt-8 overflow-hidden rounded-xl bg-white shadow-sm">

          <div className="flex items-center justify-between border-b px-6 py-4">
            <h3 className="font-semibold">
              Project Expenses
            </h3>

            <p className="text-sm text-slate-500">
              {expenses.length} records
            </p>
          </div>

          {isLoading && (
            <p className="p-6 text-slate-500">
              Loading expenses...
            </p>
          )}

          {error && (
            <p className="p-6 text-red-600">
              Failed to load expenses.
            </p>
          )}

          {!isLoading && !error && (
            <div className="divide-y">

              {expenses.map((expense) => (
                <div
                  key={expense.id}
                  className="grid gap-4 px-6 py-5 md:grid-cols-5"
                >
                  <div>
                    <p className="font-semibold">
                      {expense.category}
                    </p>

                    <p className="text-sm text-slate-500">
                      {expense.description}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-400">
                      Amount
                    </p>

                    <p className="font-semibold">
                      Rs.{" "}
                      {Number(expense.amount || 0).toLocaleString()}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-slate-400">
                      Date
                    </p>

                    <p className="text-sm">
                      {expense.expenseDate?.slice(0, 10)}
                    </p>
                  </div>

                  <div className="md:col-span-2">
                    <p className="text-xs text-slate-400">
                      Notes
                    </p>

                    <p className="text-sm text-slate-600">
                      {expense.notes || "—"}
                    </p>
                  </div>
                </div>
              ))}

              {expenses.length === 0 && (
                <p className="p-8 text-center text-slate-500">
                  No expenses found.
                </p>
              )}

            </div>
          )}

        </div>

      </main>
    </MainLayout>
  );
}

export default Expenses;