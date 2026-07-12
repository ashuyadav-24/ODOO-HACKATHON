"use client";

import Navbar from "@/components/navbar/Navbar";
import Sidebar from "@/components/sidebar/Sidebar";
import {
  Download,
  FileBarChart,
  Boxes,
  ClipboardList,
  Wrench,
  CalendarDays,
  ArrowRight,
} from "lucide-react";

const reports = [
  {
    title: "Asset Inventory Report",
    description:
      "Complete inventory of all registered assets with their current status.",
    icon: Boxes,
    color: "bg-emerald-500/20 text-emerald-400",
  },
  {
    title: "Allocation Report",
    description:
      "Track allocated assets, employee assignments and return history.",
    icon: ClipboardList,
    color: "bg-blue-500/20 text-blue-400",
  },
  {
    title: "Maintenance Report",
    description:
      "View maintenance requests, technician assignments and repair history.",
    icon: Wrench,
    color: "bg-yellow-500/20 text-yellow-400",
  },
  {
    title: "Booking Report",
    description:
      "Analyze booking activity and resource utilization across departments.",
    icon: CalendarDays,
    color: "bg-purple-500/20 text-purple-400",
  },
];

export default function ReportsPage() {
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
                Reports
              </h1>

              <p className="mt-2 text-slate-400">
                Generate reports and monitor organizational insights.
              </p>
            </div>

            <button className="flex items-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 font-semibold text-white transition hover:bg-emerald-600">
              <Download size={18} />
              Export Reports
            </button>
          </div>

          {/* Report Cards */}

          <div className="grid gap-6 md:grid-cols-2">
            {reports.map((report) => {
              const Icon = report.icon;

              return (
                <div
                  key={report.title}
                  className="rounded-2xl border border-slate-800 bg-slate-900 p-6 transition hover:border-emerald-500"
                >
                  <div className="mb-5 flex items-center justify-between">
                    <div className={`rounded-xl p-4 ${report.color}`}>
                      <Icon size={28} />
                    </div>

                    <FileBarChart
                      size={24}
                      className="text-slate-500"
                    />
                  </div>

                  <h2 className="text-2xl font-bold text-white">
                    {report.title}
                  </h2>

                  <p className="mt-3 leading-7 text-slate-400">
                    {report.description}
                  </p>

                  <button className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl border border-slate-700 py-3 font-medium text-white transition hover:bg-slate-800">
                    Generate Report
                    <ArrowRight size={18} />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Summary */}

          <div className="mt-10 rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="mb-6 text-2xl font-bold text-white">
              Report Summary
            </h2>

            <div className="grid gap-6 md:grid-cols-4">
              <div className="rounded-xl bg-slate-800 p-5">
                <p className="text-slate-400">
                  Total Assets
                </p>

                <h3 className="mt-2 text-3xl font-bold text-white">
                  128
                </h3>
              </div>

              <div className="rounded-xl bg-slate-800 p-5">
                <p className="text-slate-400">
                  Allocations
                </p>

                <h3 className="mt-2 text-3xl font-bold text-white">
                  42
                </h3>
              </div>

              <div className="rounded-xl bg-slate-800 p-5">
                <p className="text-slate-400">
                  Maintenance
                </p>

                <h3 className="mt-2 text-3xl font-bold text-white">
                  7
                </h3>
              </div>

              <div className="rounded-xl bg-slate-800 p-5">
                <p className="text-slate-400">
                  Bookings
                </p>

                <h3 className="mt-2 text-3xl font-bold text-white">
                  15
                </h3>
              </div>
            </div>
          </div>

          {/* Recent Reports */}

          <div className="mt-10 rounded-2xl border border-slate-800 bg-slate-900 p-6">
            <h2 className="mb-6 text-2xl font-bold text-white">
              Recently Generated Reports
            </h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-xl bg-slate-800 p-4">
                <div>
                  <h3 className="font-semibold text-white">
                    Asset Inventory Report
                  </h3>

                  <p className="text-sm text-slate-400">
                    Generated on 12 July 2026
                  </p>
                </div>

                <button className="text-emerald-400 hover:text-emerald-300">
                  Download
                </button>
              </div>

              <div className="flex items-center justify-between rounded-xl bg-slate-800 p-4">
                <div>
                  <h3 className="font-semibold text-white">
                    Maintenance Report
                  </h3>

                  <p className="text-sm text-slate-400">
                    Generated on 10 July 2026
                  </p>
                </div>

                <button className="text-emerald-400 hover:text-emerald-300">
                  Download
                </button>
              </div>

              <div className="flex items-center justify-between rounded-xl bg-slate-800 p-4">
                <div>
                  <h3 className="font-semibold text-white">
                    Booking Report
                  </h3>

                  <p className="text-sm text-slate-400">
                    Generated on 09 July 2026
                  </p>
                </div>

                <button className="text-emerald-400 hover:text-emerald-300">
                  Download
                </button>
              </div>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}