"use client";

import { useEffect, useState } from "react";
import { Bell, Search, UserCircle } from "lucide-react";
import { getCurrentUser } from "@/services/api";

interface User {
  first_name: string;
  last_name: string;
  role: string;
}

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function loadUser() {
      try {
        const data = await getCurrentUser();
        setUser(data);
      } catch (err) {
        console.error(err);
      }
    }

    loadUser();
  }, []);

  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-800 bg-slate-900 px-6">

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
            className="w-72 rounded-lg border border-slate-700 bg-slate-800 py-2 pl-10 pr-4 text-white placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none"
          />

        </div>

      </div>

      {/* Right */}

      <div className="flex items-center gap-6">

        <button className="relative text-slate-300 hover:text-white">

          <Bell size={22} />

          <span className="absolute -right-2 -top-2 h-2.5 w-2.5 rounded-full bg-red-500"></span>

        </button>

        <div className="flex items-center gap-3">

          <UserCircle
            size={34}
            className="text-emerald-400"
          />

          <div>

            <p className="text-sm font-semibold text-white">
              {user
                ? `${user.first_name} ${user.last_name}`
                : "Loading..."}
            </p>

            <p className="text-xs capitalize text-slate-400">
              {user?.role ?? ""}
            </p>

          </div>

        </div>

      </div>

    </header>
  );
}