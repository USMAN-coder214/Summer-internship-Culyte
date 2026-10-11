import { useState } from "react";
import { Link, useParams } from "react-router-dom";

import MainLayout from "../../components/layout/MainLayout";
import { useAddProjectMaterialMutation } from "../../api/materials/useAddProjectMaterialMutation";

function ProjectMaterials() {
  const { projectId } = useParams();

  const addMaterial = useAddProjectMaterialMutation();

  const [form, setForm] = useState({
    materialId: "",
    quantity: "",
    unitPrice: "",
    purchaseDate: "",
    notes: "",
  });

  const [addedMaterial, setAddedMaterial] = useState(null);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    addMaterial.mutate(
      {
        projectId: Number(projectId),
        materialId: Number(form.materialId),
        quantity: Number(form.quantity),
        unitPrice: Number(form.unitPrice),
        purchaseDate: form.purchaseDate,
        notes: form.notes,
      },
      {
        onSuccess: (response) => {
          setAddedMaterial(response.projectMaterial);

          setForm({
            materialId: form.materialId,
            quantity: "",
            unitPrice: "",
            purchaseDate: "",
            notes: "",
          });
        },
      }
    );
  };

  return (
    <MainLayout>

      <main className="p-6 md:p-8">

        {/* Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

          <div>
            <p className="text-sm font-medium text-blue-600">
              Inventory Management
            </p>

            <h1 className="mt-1 text-3xl font-bold text-slate-900">
              Project Materials
            </h1>

            <p className="mt-2 text-slate-500">
              Add and track materials used in Project #{projectId}.
            </p>
          </div>

          <div className="flex gap-3">

            <Link
              to={`/dashboard/${projectId}`}
              className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
            >
              Dashboard
            </Link>

            <Link
              to="/materials"
              className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-700"
            >
              Material Catalog
            </Link>

          </div>

        </div>

        {/* Summary */}
        <div className="mt-8 grid gap-5 md:grid-cols-3">

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">
              Project
            </p>

            <p className="mt-2 text-2xl font-bold text-slate-900">
              #{projectId}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">
              Material Tracking
            </p>

            <p className="mt-2 text-2xl font-bold text-slate-900">
              Active
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <p className="text-sm text-slate-500">
              Latest Material Cost
            </p>

            <p className="mt-2 text-2xl font-bold text-slate-900">
              Rs.{" "}
              {addedMaterial
                ? Number(
                    addedMaterial.totalCost || 0
                  ).toLocaleString()
                : "0"}
            </p>
          </div>

        </div>

        {/* Add Material */}
        <section className="mt-8 rounded-2xl border border-slate-200 bg-white shadow-sm">

          <div className="border-b border-slate-100 px-6 py-5">

            <h2 className="text-lg font-bold text-slate-900">
              Add Material to Project
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Record material quantity, price and purchase information.
            </p>

          </div>

          <form
            onSubmit={handleSubmit}
            className="grid gap-5 p-6 md:grid-cols-2"
          >

            {/* Material ID */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Material ID
              </label>

              <input
                type="number"
                name="materialId"
                value={form.materialId}
                onChange={handleChange}
                required
                min="1"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-blue-500 focus:bg-white"
              />

              <p className="mt-2 text-xs text-slate-400">
                Use an existing material ID from the catalog.
              </p>
            </div>

            {/* Quantity */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Quantity
              </label>

              <input
                type="number"
                step="0.01"
                name="quantity"
                value={form.quantity}
                onChange={handleChange}
                required
                min="0.01"
                placeholder="10"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-blue-500 focus:bg-white"
              />
            </div>

            {/* Unit Price */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Unit Price
              </label>

              <input
                type="number"
                step="0.01"
                name="unitPrice"
                value={form.unitPrice}
                onChange={handleChange}
                required
                min="0"
                placeholder="1500"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-blue-500 focus:bg-white"
              />
            </div>

            {/* Purchase Date */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Purchase Date
              </label>

              <input
                type="date"
                name="purchaseDate"
                value={form.purchaseDate}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-blue-500 focus:bg-white"
              />
            </div>

            {/* Notes */}
            <div className="md:col-span-2">

              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Notes
              </label>

              <textarea
                name="notes"
                value={form.notes}
                onChange={handleChange}
                rows="3"
                placeholder="Optional purchase notes..."
                className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none focus:border-blue-500 focus:bg-white"
              />

            </div>

            {/* Result / Errors */}
            <div className="md:col-span-2">

              {addMaterial.isSuccess && (
                <div className="mb-4 rounded-xl bg-emerald-50 p-4 text-sm font-medium text-emerald-700">
                  Material added to project successfully.
                </div>
              )}

              {addMaterial.isError && (
                <div className="mb-4 rounded-xl bg-red-50 p-4 text-sm font-medium text-red-700">
                  {addMaterial.error?.response?.data?.message ||
                    "Failed to add material."}
                </div>
              )}

              <button
                type="submit"
                disabled={addMaterial.isPending}
                className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {addMaterial.isPending
                  ? "Adding..."
                  : "Add Material"}
              </button>

            </div>

          </form>

        </section>

        {/* Latest Added Material */}
        {addedMaterial && (
          <section className="mt-6 rounded-2xl border border-slate-200 bg-white shadow-sm">

            <div className="border-b border-slate-100 px-6 py-5">

              <h2 className="text-lg font-bold text-slate-900">
                Latest Project Material
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Material record successfully added to the project.
              </p>

            </div>

            <div className="grid gap-5 p-6 sm:grid-cols-2 lg:grid-cols-4">

              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs font-medium text-slate-400">
                  Material ID
                </p>

                <p className="mt-2 text-lg font-bold text-slate-900">
                  #{addedMaterial.materialId}
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs font-medium text-slate-400">
                  Quantity
                </p>

                <p className="mt-2 text-lg font-bold text-slate-900">
                  {addedMaterial.quantity}
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-xs font-medium text-slate-400">
                  Unit Price
                </p>

                <p className="mt-2 text-lg font-bold text-slate-900">
                  Rs.{" "}
                  {Number(
                    addedMaterial.unitPrice || 0
                  ).toLocaleString()}
                </p>
              </div>

              <div className="rounded-xl bg-blue-50 p-4">
                <p className="text-xs font-medium text-blue-500">
                  Total Cost
                </p>

                <p className="mt-2 text-lg font-bold text-blue-700">
                  Rs.{" "}
                  {Number(
                    addedMaterial.totalCost || 0
                  ).toLocaleString()}
                </p>
              </div>

            </div>

          </section>
        )}

      </main>

    </MainLayout>
  );
}

export default ProjectMaterials;