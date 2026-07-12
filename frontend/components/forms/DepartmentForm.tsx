"use client";

import { useState } from "react";

export default function DepartmentForm() {
  const [departmentName, setDepartmentName] = useState("");
  const [departmentCode, setDepartmentCode] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log({
      departmentName,
      departmentCode,
      description,
    });

    alert("Department Created (API will be connected next)");

    setDepartmentName("");
    setDepartmentCode("");
    setDescription("");
  };

  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8">

      <h2 className="mb-6 text-2xl font-bold text-white">
        Add Department
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">

        <div>
          <label className="mb-2 block text-slate-300">
            Department Name
          </label>

          <input
            type="text"
            value={departmentName}
            onChange={(e) => setDepartmentName(e.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-emerald-500"
            placeholder="IT Department"
          />
        </div>

        <div>
          <label className="mb-2 block text-slate-300">
            Department Code
          </label>

          <input
            type="text"
            value={departmentCode}
            onChange={(e) => setDepartmentCode(e.target.value)}
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-emerald-500"
            placeholder="IT001"
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
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-emerald-500"
            placeholder="Department description..."
          />
        </div>

        <button
          type="submit"
          className="rounded-xl bg-emerald-500 px-6 py-3 font-semibold text-white hover:bg-emerald-600"
        >
          Create Department
        </button>

      </form>
    </div>
  );
}