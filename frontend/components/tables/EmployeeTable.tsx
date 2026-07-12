"use client";

import { Edit, Trash2, Eye } from "lucide-react";

const employees = [
  {
    id: "EMP001",
    name: "Ashutosh Singh",
    email: "ashu@gmail.com",
    department: "IT",
    role: "Admin",
    status: "Active",
  },
  {
    id: "EMP002",
    name: "Rahul Kumar",
    email: "rahul@gmail.com",
    department: "HR",
    role: "Employee",
    status: "Active",
  },
  {
    id: "EMP003",
    name: "Ankit Sharma",
    email: "ankit@gmail.com",
    department: "Finance",
    role: "Manager",
    status: "Inactive",
  },
];

export default function EmployeeTable() {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 shadow-lg overflow-hidden">
      <div className="flex items-center justify-between border-b border-slate-800 p-6">
        <h2 className="text-xl font-bold text-white">Employees</h2>

        <button className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-600">
          + Add Employee
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-slate-800 text-slate-300">
            <tr>
              <th className="px-6 py-4 text-left">Employee ID</th>
              <th className="px-6 py-4 text-left">Name</th>
              <th className="px-6 py-4 text-left">Email</th>
              <th className="px-6 py-4 text-left">Department</th>
              <th className="px-6 py-4 text-left">Role</th>
              <th className="px-6 py-4 text-left">Status</th>
              <th className="px-6 py-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {employees.map((employee) => (
              <tr
                key={employee.id}
                className="border-b border-slate-800 hover:bg-slate-800/60 transition"
              >
                <td className="px-6 py-4 text-slate-300">
                  {employee.id}
                </td>

                <td className="px-6 py-4 font-medium text-white">
                  {employee.name}
                </td>

                <td className="px-6 py-4 text-slate-300">
                  {employee.email}
                </td>

                <td className="px-6 py-4 text-slate-300">
                  {employee.department}
                </td>

                <td className="px-6 py-4 text-slate-300">
                  {employee.role}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      employee.status === "Active"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {employee.status}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <div className="flex justify-center gap-3">
                    <button className="text-cyan-400 hover:text-cyan-300">
                      <Eye size={18} />
                    </button>

                    <button className="text-yellow-400 hover:text-yellow-300">
                      <Edit size={18} />
                    </button>

                    <button className="text-red-400 hover:text-red-300">
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