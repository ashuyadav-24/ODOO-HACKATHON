"use client";

export default function MaintenanceForm() {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8">

      <h2 className="mb-6 text-2xl font-bold text-white">
        Raise Maintenance Request
      </h2>

      <form className="grid gap-5 md:grid-cols-2">

        <input
          placeholder="Asset ID"
          className="rounded-xl border border-slate-700 bg-slate-950 p-3 text-white"
        />

        <input
          placeholder="Issue Title"
          className="rounded-xl border border-slate-700 bg-slate-950 p-3 text-white"
        />

        <select className="rounded-xl border border-slate-700 bg-slate-950 p-3 text-white">

          <option>Low</option>

          <option>Medium</option>

          <option>High</option>

        </select>

        <input
          placeholder="Assigned Technician"
          className="rounded-xl border border-slate-700 bg-slate-950 p-3 text-white"
        />

        <input
          type="date"
          className="rounded-xl border border-slate-700 bg-slate-950 p-3 text-white"
        />

        <textarea
          rows={5}
          placeholder="Describe the issue..."
          className="md:col-span-2 rounded-xl border border-slate-700 bg-slate-950 p-3 text-white"
        />

        <button
          className="md:col-span-2 rounded-xl bg-emerald-500 py-3 font-semibold text-white hover:bg-emerald-600"
        >
          Raise Request
        </button>

      </form>

    </div>
  );
}