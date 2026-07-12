import Sidebar from "@/components/sidebar/Sidebar";
import Navbar from "@/components/navbar/Navbar";
import {
  Boxes,
  ClipboardList,
  Wrench,
  CalendarDays,
  ArrowLeftRight,
  AlertTriangle,
} from "lucide-react";

const stats = [
  {
    title: "Assets Available",
    value: "128",
    icon: Boxes,
    color: "emerald",
  },
  {
    title: "Assets Allocated",
    value: "42",
    icon: ClipboardList,
    color: "blue",
  },
  {
    title: "Maintenance Today",
    value: "7",
    icon: Wrench,
    color: "amber",
  },
  {
    title: "Active Bookings",
    value: "15",
    icon: CalendarDays,
    color: "purple",
  },
  {
    title: "Pending Transfers",
    value: "4",
    icon: ArrowLeftRight,
    color: "cyan",
  },
  {
    title: "Overdue Returns",
    value: "2",
    icon: AlertTriangle,
    color: "red",
  },
];

const activities = [
  "Laptop AF-0012 assigned to Rahul Sharma",
  "Projector booked for Conference Room",
  "Printer sent for maintenance",
  "New Department created",
  "Category 'Medical Equipment' added",
];

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-slate-950">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <Navbar />

        <main className="flex-1 overflow-y-auto p-8">

          {/* Header */}

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white">
              Dashboard
            </h1>

            <p className="mt-2 text-slate-400">
              Welcome back. Here's what's happening today.
            </p>
          </div>

          {/* KPI Cards */}

          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

            {stats.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
                >
                  <div className="flex items-center justify-between">

                    <div>
                      <p className="text-sm text-slate-400">
                        {item.title}
                      </p>

                      <h2 className="mt-3 text-4xl font-bold text-white">
                        {item.value}
                      </h2>
                    </div>

                    <div className="rounded-xl bg-emerald-500/20 p-4">
                      <Icon className="text-emerald-400" size={28} />
                    </div>

                  </div>
                </div>
              );
            })}

          </div>

          {/* Bottom Section */}

          <div className="mt-8 grid gap-8 lg:grid-cols-2">

            {/* Quick Actions */}

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

              <h2 className="mb-5 text-xl font-semibold text-white">
                Quick Actions
              </h2>

              <div className="grid gap-4">

                <button className="rounded-xl bg-emerald-500 py-3 font-medium text-white transition hover:bg-emerald-600">
                  Register Asset
                </button>

                <button className="rounded-xl border border-slate-700 py-3 text-white hover:bg-slate-800">
                  Book Resource
                </button>

                <button className="rounded-xl border border-slate-700 py-3 text-white hover:bg-slate-800">
                  Raise Maintenance Request
                </button>

              </div>

            </div>

            {/* Recent Activity */}

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

              <h2 className="mb-5 text-xl font-semibold text-white">
                Recent Activity
              </h2>

              <div className="space-y-4">

                {activities.map((activity, index) => (
                  <div
                    key={index}
                    className="rounded-xl bg-slate-800 p-4 text-slate-300"
                  >
                    {activity}
                  </div>
                ))}

              </div>

            </div>

          </div>

        </main>
      </div>
    </div>
  );
}