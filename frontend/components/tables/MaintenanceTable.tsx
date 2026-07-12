"use client";

import { Eye, Edit, Trash2 } from "lucide-react";

const requests = [
  {
    id: "MT-001",
    asset: "Dell Latitude 7420",
    issue: "Screen Flickering",
    priority: "High",
    assigned: "John Doe",
    date: "12 Jul 2026",
    status: "In Progress",
  },
  {
    id: "MT-002",
    asset: "HP Printer",
    issue: "Paper Jam",
    priority: "Medium",
    assigned: "Mike Ross",
    date: "11 Jul 2026",
    status: "Pending",
  },
  {
    id: "MT-003",
    asset: "Projector",
    issue: "HDMI Port",
    priority: "Low",
    assigned: "Alex",
    date: "10 Jul 2026",
    status: "Completed",
  },
];

export default function MaintenanceTable() {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">

      <div className="border-b border-slate-800 p-6">
        <h2 className="text-xl font-bold text-white">
          Maintenance Requests
        </h2>
      </div>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead className="bg-slate-800 text-slate-300">

            <tr>

              <th className="px-6 py-4 text-left">Asset</th>

              <th className="px-6 py-4 text-left">Issue</th>

              <th className="px-6 py-4 text-left">Priority</th>

              <th className="px-6 py-4 text-left">Assigned To</th>

              <th className="px-6 py-4 text-left">Date</th>

              <th className="px-6 py-4 text-left">Status</th>

              <th className="px-6 py-4 text-center">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {requests.map((item) => (

              <tr
                key={item.id}
                className="border-b border-slate-800 hover:bg-slate-800/50"
              >

                <td className="px-6 py-4 text-white">
                  {item.asset}
                </td>

                <td className="px-6 py-4 text-slate-300">
                  {item.issue}
                </td>

                <td className="px-6 py-4">

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      item.priority === "High"
                        ? "bg-red-500/20 text-red-400"
                        : item.priority === "Medium"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-green-500/20 text-green-400"
                    }`}
                  >
                    {item.priority}
                  </span>

                </td>

                <td className="px-6 py-4 text-slate-300">
                  {item.assigned}
                </td>

                <td className="px-6 py-4 text-slate-300">
                  {item.date}
                </td>

                <td className="px-6 py-4">

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      item.status === "Completed"
                        ? "bg-green-500/20 text-green-400"
                        : item.status === "Pending"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : "bg-blue-500/20 text-blue-400"
                    }`}
                  >
                    {item.status}
                  </span>

                </td>

                <td className="px-6 py-4">

                  <div className="flex justify-center gap-3">

                    <button className="text-cyan-400">
                      <Eye size={18} />
                    </button>

                    <button className="text-yellow-400">
                      <Edit size={18} />
                    </button>

                    <button className="text-red-400">
                      <Trash2 size={18} />
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
}