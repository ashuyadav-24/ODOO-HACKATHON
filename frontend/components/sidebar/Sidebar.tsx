"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  Building2,
  Package,
  ArrowLeftRight,
  CalendarDays,
  Wrench,
  ClipboardCheck,
  BarChart3,
  Bell,
  UserCircle,
  LogOut,
  Boxes,
} from "lucide-react";

const menuItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Organization",
    href: "/organization",
    icon: Building2,
  },
  {
    title: "Assets",
    href: "/assets",
    icon: Package,
  },
  {
    title: "Allocation",
    href: "/allocation",
    icon: ArrowLeftRight,
  },
  {
    title: "Bookings",
    href: "/bookings",
    icon: CalendarDays,
  },
  {
    title: "Maintenance",
    href: "/maintenance",
    icon: Wrench,
  },
  {
    title: "Audit",
    href: "/audit",
    icon: ClipboardCheck,
  },
  {
    title: "Reports",
    href: "/reports",
    icon: BarChart3,
  },
  {
    title: "Notifications",
    href: "/notifications",
    icon: Bell,
  },
  {
    title: "Profile",
    href: "/profile",
    icon: UserCircle,
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.replace("/login");
  };

  return (
    <aside className="flex h-screen w-72 flex-col border-r border-slate-800 bg-slate-950">

      {/* Logo */}

      <div className="flex items-center gap-3 border-b border-slate-800 p-6">

        <div className="rounded-xl bg-emerald-500 p-3">
          <Boxes className="text-white" size={24} />
        </div>

        <div>
          <h2 className="text-xl font-bold text-white">
            AssetFlow
          </h2>

          <p className="text-xs text-slate-400">
            Enterprise ERP
          </p>
        </div>

      </div>

      {/* Navigation */}

      <nav className="flex-1 space-y-2 p-4">

        {menuItems.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          return (
            <Link
              key={item.title}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-4 py-3 transition-all ${
                active
                  ? "bg-emerald-500 text-white shadow-lg"
                  : "text-slate-400 hover:bg-slate-900 hover:text-white"
              }`}
            >
              <Icon size={20} />
              <span>{item.title}</span>
            </Link>
          );
        })}

      </nav>

      {/* Logout */}

      <div className="border-t border-slate-800 p-4">

        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-red-400 transition hover:bg-red-500 hover:text-white"
        >
          <LogOut size={20} />

          Logout
        </button>

      </div>

    </aside>
  );
}