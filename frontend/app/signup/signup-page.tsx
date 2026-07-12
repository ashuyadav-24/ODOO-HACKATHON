\
"use client";

import { Building2, Boxes, ShieldCheck, Wrench } from "lucide-react";

export default function SignupPage() {
  return (
    <main className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
      <div className="w-full max-w-7xl overflow-hidden rounded-3xl shadow-2xl grid lg:grid-cols-2 bg-white">
        {/* Left */}
        <section className="relative bg-gradient-to-br from-emerald-950 via-emerald-800 to-emerald-700 text-white p-12 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-3 mb-10">
              <Building2 className="w-8 h-8"/>
              <div>
                <h1 className="text-2xl font-bold">AssetFlow</h1>
                <p className="text-emerald-200 text-sm">
                  Enterprise Asset Management
                </p>
              </div>
            </div>

            <h2 className="text-5xl font-bold leading-tight">
              Manage Every Asset
              <br />
              From One Platform
            </h2>

            <p className="mt-6 text-emerald-100 max-w-lg">
              Digitize asset tracking, employee allocation, maintenance,
              bookings and audits through one centralized ERP platform.
            </p>
          </div>

          <div className="grid gap-4 mt-12">
            {[
              ["Track Assets","Know where every asset is."],
              ["Smart Allocation","Prevent duplicate assignments."],
              ["Maintenance","Approval-based workflow."],
              ["Analytics","Real-time KPI dashboard."]
            ].map(([t,d])=>(
              <div key={t} className="rounded-2xl bg-white/10 backdrop-blur-md p-5 border border-white/10">
                <h3 className="font-semibold">{t}</h3>
                <p className="text-sm text-emerald-100 mt-1">{d}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Right */}
        <section className="p-10 lg:p-16 flex items-center">
          <div className="w-full max-w-md mx-auto">
            <span className="text-emerald-700 font-semibold uppercase tracking-widest text-sm">
              Welcome
            </span>

            <h2 className="text-4xl font-bold mt-2 text-slate-900">
              Create Employee Account
            </h2>

            <p className="text-slate-500 mt-3">
              Sign up to access AssetFlow.
            </p>

            <form className="mt-8 space-y-5">
              {[
                "Full Name",
                "Email Address",
                "Employee ID",
                "Department",
                "Password",
                "Confirm Password"
              ].map((item)=>(
                <div key={item}>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    {item}
                  </label>
                  <input
                    type={item.toLowerCase().includes("password") ? "password":"text"}
                    placeholder={item}
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>
              ))}

              <button
                className="w-full rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white py-3 font-semibold transition"
              >
                Create Employee Account
              </button>
            </form>

            <p className="mt-6 text-center text-slate-500">
              Already have an account?
              <a href="/login" className="ml-2 text-emerald-700 font-semibold">
                Sign In
              </a>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
