"use client";

import { useEffect, useState } from "react";

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

import {
  getDashboardSummary,
  getRecentActivities,
} from "@/services/api";
interface DashboardSummary {
  total_assets: number;
  available_assets: number;
  allocated_assets: number;
  maintenance_assets: number;
  total_users: number;
  active_bookings: number;
  total_departments: number;
  total_categories: number;
}
interface Activity {
  id: string;
  user_id: string;
  action: string;
  module: string;
  reference_id: string;
  details: Record<string, unknown>;
  timestamp: string;
}

export default function Dashboard() {
  const [summary, setSummary] =
  useState<DashboardSummary | null>(null);

const [activities, setActivities] =
  useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      try {
        const summaryRes = await getDashboardSummary();
        const activityRes = await getRecentActivities();

        setSummary(summaryRes);
        setActivities(activityRes);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  const stats = summary
    ? [
        {
          title: "Assets Available",
          value: summary.available_assets,
          icon: Boxes,
        },
        {
          title: "Assets Allocated",
          value: summary.allocated_assets,
          icon: ClipboardList,
        },
        {
          title: "Maintenance",
          value: summary.maintenance_assets,
          icon: Wrench,
        },
        {
          title: "Active Bookings",
          value: summary.active_bookings,
          icon: CalendarDays,
        },
        {
          title: "Departments",
          value: summary.total_departments,
          icon: ArrowLeftRight,
        },
        {
          title: "Categories",
          value: summary.total_categories,
          icon: AlertTriangle,
        },
      ]
    : [];

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-slate-950 text-white text-2xl">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-950">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <Navbar />

        <main className="flex-1 overflow-y-auto p-8">

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white">
              Dashboard
            </h1>

            <p className="mt-2 text-slate-400">
              Welcome back. Heres whats happening today.
            </p>
          </div>

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

                      <Icon
                        className="text-emerald-400"
                        size={28}
                      />

                    </div>

                  </div>
                </div>
              );
            })}

          </div>

          <div className="mt-8 grid gap-8 lg:grid-cols-2">

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

            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

              <h2 className="mb-5 text-xl font-semibold text-white">
                Recent Activity
              </h2>

              <div className="space-y-4">
              {activities.length > 0 ? (
                 activities.map((activity, index) => (
                    <div
                      key={activity.id || index}
                      className="rounded-xl bg-slate-800 p-4"
                    >
                      <div className="flex items-start justify-between gap-4">

                        <div className="flex-1">

                          <h3 className="font-semibold text-white">
                            {activity.action}
                          </h3>

                          <p className="mt-1 text-sm text-slate-400">
                            Module : {activity.module}
                          </p>

                          {activity.details && (
                            <div className="mt-2 rounded-lg bg-slate-900 p-2">

                              <pre className="overflow-x-auto whitespace-pre-wrap text-xs text-slate-500">
                                {JSON.stringify(
                                  activity.details,
                                  null,
                                  2
                                )}
                              </pre>

                            </div>
                          )}

                        </div>

                        <div className="text-right">

                          <p className="text-xs text-slate-500">
                            {activity.timestamp
                              ? new Date(
                                  activity.timestamp
                                ).toLocaleString()
                              : ""}
                          </p>

                        </div>

                      </div>
                    </div>
                  ))
                ) : (
                  <div className="rounded-xl bg-slate-800 p-4 text-center text-slate-400">
                    No recent activities found.
                  </div>
                )}

              </div>

            </div>

          </div>

        </main>

      </div>

    </div>
  );
}