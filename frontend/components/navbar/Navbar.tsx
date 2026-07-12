"use client";

import { Bell, Search, UserCircle } from "lucide-react";

export default function Navbar() {
  return (
    <header className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-6">

      {/* Left */}
      <div className="flex items-center gap-4">
        <h1 className="text-xl font-bold text-white">
          AssetFlow ERP
        </h1>

        <div className="relative hidden md:block">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            placeholder="Search assets..."
            className="w-72 rounded-lg bg-slate-800 border border-slate-700 py-2 pl-10 pr-4 text-white placeholder:text-slate-400 focus:outline-none focus:border-emerald-500"
          />
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center gap-6">

        <button className="relative text-slate-300 hover:text-white">
          <Bell size={22} />

          <span className="absolute -top-2 -right-2 h-2.5 w-2.5 rounded-full bg-red-500"></span>
        </button>

        <div className="flex items-center gap-3">
          <UserCircle size={34} className="text-emerald-400" />

          <div>
            <p className="text-sm font-semibold text-white">
              Ashutosh
            </p>

            <p className="text-xs text-slate-400">
              Employee
            </p>
          </div>
        </div>

      </div>

    </header>
  );
}