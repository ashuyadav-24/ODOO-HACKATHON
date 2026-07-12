"use client";

import { useState } from "react";

export default function CategoryForm() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log({
      name,
      description,
    });

    alert("Category Created (API will be connected next)");

    setName("");
    setDescription("");
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
      <h2 className="mb-6 text-2xl font-bold text-white">
        Add Category
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">

        <div>
          <label className="mb-2 block text-slate-300">
            Category Name
          </label>

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Laptops"
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-emerald-500"
          />
        </div>

        <div>
          <label className="mb-2 block text-slate-300">
            Description
          </label>

          <textarea
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Category description..."
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-emerald-500"
          />
        </div>

        <button
          type="submit"
          className="rounded-xl bg-emerald-500 px-6 py-3 font-semibold text-white transition hover:bg-emerald-600"
        >
          Create Category
        </button>

      </form>
    </div>
  );
}