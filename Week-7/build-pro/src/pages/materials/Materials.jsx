import { useState } from "react";

import MainLayout from "../../components/layout/MainLayout";
import { useCreateCategoryMutation } from "../../api/materials/useCreateCategoryMutation";
import { useCreateMaterialMutation } from "../../api/materials/useCreateMaterialMutation";

function Materials() {
  const createCategory = useCreateCategoryMutation();
  const createMaterial = useCreateMaterialMutation();

  const [categoryForm, setCategoryForm] = useState({
    name: "",
    description: "",
  });

  const [materialForm, setMaterialForm] = useState({
    categoryId: "",
    name: "",
    unit: "",
    description: "",
  });

  const handleCategoryChange = (e) => {
    setCategoryForm({
      ...categoryForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleMaterialChange = (e) => {
    setMaterialForm({
      ...materialForm,
      [e.target.name]: e.target.value,
    });
  };

  const submitCategory = (e) => {
    e.preventDefault();

    createCategory.mutate(categoryForm, {
      onSuccess: () => {
        setCategoryForm({
          name: "",
          description: "",
        });
      },
    });
  };

  const submitMaterial = (e) => {
    e.preventDefault();

    createMaterial.mutate(
      {
        ...materialForm,
        categoryId: Number(materialForm.categoryId),
      },
      {
        onSuccess: () => {
          setMaterialForm({
            categoryId: "",
            name: "",
            unit: "",
            description: "",
          });
        },
      }
    );
  };

  return (
    <MainLayout>
      <main className="min-h-screen bg-[#f4f7fb]">

        {/* Page Header */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm font-medium text-blue-600">
              Inventory Management
            </p>

            <h1 className="mt-1 text-3xl font-bold text-slate-900">
              Materials
            </h1>

            <p className="mt-2 text-slate-500">
              Manage material categories and your construction material catalog.
            </p>
          </div>
        </div>

        {/* Summary */}
        <div className="mt-8 grid gap-5 md:grid-cols-3">

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-xl">
              📦
            </div>

            <p className="mt-4 text-sm text-slate-500">
              Material Catalog
            </p>

            <p className="mt-1 text-2xl font-bold text-slate-900">
              Manage
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50 text-xl">
              🗂️
            </div>

            <p className="mt-4 text-sm text-slate-500">
              Categories
            </p>

            <p className="mt-1 text-2xl font-bold text-slate-900">
              Organize
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-xl">
              ✓
            </div>

            <p className="mt-4 text-sm text-slate-500">
              Inventory System
            </p>

            <p className="mt-1 text-2xl font-bold text-slate-900">
              Active
            </p>
          </div>

        </div>

        {/* Forms */}
        <div className="mt-8 grid gap-6 xl:grid-cols-2">

          {/* Category */}
          <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">

            <div className="border-b border-slate-100 px-6 py-5">
              <h2 className="text-lg font-bold text-slate-900">
                Create Material Category
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Create a category for organizing construction materials.
              </p>
            </div>

            <form
              onSubmit={submitCategory}
              className="space-y-5 p-6"
            >

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Category Name
                </label>

                <input
                  name="name"
                  value={categoryForm.name}
                  onChange={handleCategoryChange}
                  required
                  placeholder="e.g. Electrical"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-blue-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Description
                </label>

                <textarea
                  name="description"
                  value={categoryForm.description}
                  onChange={handleCategoryChange}
                  rows="5"
                  placeholder="Describe this material category..."
                  className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-blue-500 focus:bg-white"
                />
              </div>

              {createCategory.isSuccess && (
                <div className="rounded-xl bg-emerald-50 p-4 text-sm font-medium text-emerald-700">
                  Category created successfully.
                </div>
              )}

              {createCategory.isError && (
                <div className="rounded-xl bg-red-50 p-4 text-sm font-medium text-red-700">
                  {createCategory.error?.response?.data?.message ||
                    "Failed to create category."}
                </div>
              )}

              <button
                type="submit"
                disabled={createCategory.isPending}
                className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {createCategory.isPending
                  ? "Creating..."
                  : "Create Category"}
              </button>

            </form>
          </section>

          {/* Material */}
          <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">

            <div className="border-b border-slate-100 px-6 py-5">
              <h2 className="text-lg font-bold text-slate-900">
                Create Material
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Add a material to your construction catalog.
              </p>
            </div>

            <form
              onSubmit={submitMaterial}
              className="space-y-5 p-6"
            >

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Category ID
                </label>

                <input
                  type="number"
                  name="categoryId"
                  value={materialForm.categoryId}
                  onChange={handleMaterialChange}
                  required
                  min="1"
                  placeholder="e.g. 1"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-blue-500 focus:bg-white"
                />

                <p className="mt-2 text-xs text-slate-400">
                  Enter the ID of an existing material category.
                </p>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Material Name
                </label>

                <input
                  name="name"
                  value={materialForm.name}
                  onChange={handleMaterialChange}
                  required
                  placeholder="e.g. Steel Reinforcement Bar"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-blue-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Unit
                </label>

                <input
                  name="unit"
                  value={materialForm.unit}
                  onChange={handleMaterialChange}
                  required
                  placeholder="e.g. kg, bag, piece"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-blue-500 focus:bg-white"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Description
                </label>

                <textarea
                  name="description"
                  value={materialForm.description}
                  onChange={handleMaterialChange}
                  rows="3"
                  placeholder="Describe the material..."
                  className="w-full resize-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 outline-none transition focus:border-blue-500 focus:bg-white"
                />
              </div>

              {createMaterial.isSuccess && (
                <div className="rounded-xl bg-emerald-50 p-4 text-sm font-medium text-emerald-700">
                  Material created successfully.
                </div>
              )}

              {createMaterial.isError && (
                <div className="rounded-xl bg-red-50 p-4 text-sm font-medium text-red-700">
                  {createMaterial.error?.response?.data?.message ||
                    "Failed to create material."}
                </div>
              )}

              <button
                type="submit"
                disabled={createMaterial.isPending}
                className="rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {createMaterial.isPending
                  ? "Creating..."
                  : "Create Material"}
              </button>

            </form>
          </section>

        </div>

      </main>
    </MainLayout>
  );
}

export default Materials;