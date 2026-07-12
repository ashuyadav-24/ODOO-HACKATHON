"use client";

import { useState } from "react";

import Navbar from "@/components/navbar/Navbar";
import Sidebar from "@/components/sidebar/Sidebar";
import AssetTable from "@/components/tables/AssetTable";
import AssetForm from "@/components/forms/AssetForm";

export default function AssetsPage() {
  const [open, setOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div className="flex min-h-screen bg-slate-950">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <Navbar />

        <main className="flex-1 p-8">
          {/* Header */}

          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">
                Assets
              </h1>

              <p className="mt-2 text-slate-400">
                Manage all organizational assets.
              </p>
            </div>

            <button
              onClick={() => setOpen(true)}
              className="rounded-xl bg-emerald-500 px-6 py-3 font-semibold text-white hover:bg-emerald-600"
            >
              + Add Asset
            </button>
          </div>

          {/* Search */}

          <div className="mb-6">
            <input
              type="text"
              placeholder="Search assets..."
              className="w-full rounded-xl border border-slate-700 bg-slate-900 px-5 py-3 text-white placeholder:text-slate-500 focus:border-emerald-500 focus:outline-none"
            />
          </div>

          {/* Asset Table */}

          <AssetTable key={refreshKey} />
        </main>
      </div>

      {/* Modal */}

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="relative max-h-[90vh] w-full max-w-5xl overflow-y-auto rounded-2xl bg-slate-900 p-6">

            <button
              onClick={() => setOpen(false)}
              className="absolute right-5 top-5 text-3xl text-white hover:text-red-500"
            >
              ×
            </button>

            <AssetForm
              onSuccess={() => {
                setOpen(false);
                setRefreshKey((prev) => prev + 1);
              }}
            />

          </div>
        </div>
      )}
    </div>
  );
}