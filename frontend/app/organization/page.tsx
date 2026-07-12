"use client";

import { useState } from "react";

import Navbar from "@/components/navbar/Navbar";
import Sidebar from "@/components/sidebar/Sidebar";

import EmployeeTable from "@/components/tables/EmployeeTable";
import DepartmentForm from "@/components/forms/DepartmentForm";
import CategoryForm from "@/components/forms/CategoryForm";

export default function OrganizationPage() {
  const [activeTab, setActiveTab] = useState("employees");

  return (
    <div className="flex min-h-screen bg-slate-950">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <Navbar />

        <main className="flex-1 p-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Organization
          </h1>

          <p className="text-slate-400 mb-8">
            Manage employees, departments and categories.
          </p>

          {/* Tabs */}
          <div className="flex gap-4 mb-8">
            <button
              onClick={() => setActiveTab("employees")}
              className={`px-5 py-2 rounded-xl ${
                activeTab === "employees"
                  ? "bg-emerald-500 text-white"
                  : "bg-slate-800 text-slate-300"
              }`}
            >
              Employees
            </button>

            <button
              onClick={() => setActiveTab("departments")}
              className={`px-5 py-2 rounded-xl ${
                activeTab === "departments"
                  ? "bg-emerald-500 text-white"
                  : "bg-slate-800 text-slate-300"
              }`}
            >
              Departments
            </button>

            <button
              onClick={() => setActiveTab("categories")}
              className={`px-5 py-2 rounded-xl ${
                activeTab === "categories"
                  ? "bg-emerald-500 text-white"
                  : "bg-slate-800 text-slate-300"
              }`}
            >
              Categories
            </button>
          </div>

          {activeTab === "employees" && <EmployeeTable />}

          {activeTab === "departments" && <DepartmentForm />}

          {activeTab === "categories" && <CategoryForm />}
        </main>
      </div>
    </div>
  );
}