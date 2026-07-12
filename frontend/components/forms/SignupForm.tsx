"use client";

import { useState } from "react";
import Link from "next/link";
import {
  User,
  Mail,
  Building2,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Boxes,
  ShieldCheck,
  ClipboardList,
} from "lucide-react";

export default function SignupForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-slate-950">

      {/* ================= LEFT SECTION ================= */}

      <div className="relative hidden lg:flex overflow-hidden">

        {/* Background */}

        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950 via-emerald-900 to-slate-950" />

        <div className="absolute top-20 left-20 h-72 w-72 rounded-full bg-emerald-500/20 blur-[120px]" />

        <div className="absolute bottom-0 right-10 h-80 w-80 rounded-full bg-green-400/10 blur-[140px]" />

        {/* Grid */}

        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px),linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative z-10 flex flex-col justify-between p-16 w-full">

          {/* Logo */}

          <div className="flex items-center gap-3">

            <div className="bg-emerald-500 p-3 rounded-xl">

              <Boxes className="text-white w-6 h-6" />

            </div>

            <div>

              <h2 className="text-2xl font-bold text-white">
                AssetFlow
              </h2>

              <p className="text-sm text-emerald-200">
                Enterprise Asset ERP
              </p>

            </div>

          </div>

          {/* Heading */}

          <div className="max-w-xl">

            <span className="text-emerald-300 uppercase tracking-widest text-sm">
              Smart Asset Management
            </span>

            <h1 className="text-6xl font-bold text-white leading-tight mt-4">
              Manage Assets
              <br />
              Smarter.
            </h1>

            <p className="mt-6 text-slate-300 text-lg leading-8">
              Digitize your organization's assets, maintenance,
              bookings and audit workflow from one unified platform.
            </p>

          </div>

          {/* Floating Cards */}

          <div className="grid grid-cols-2 gap-6">

            <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-5 border border-white/10">

              <ShieldCheck className="text-emerald-400 mb-3" />

              <h3 className="text-white font-semibold">
                Secure Access
              </h3>

              <p className="text-slate-300 text-sm mt-2">
                Role-based employee authentication.
              </p>

            </div>

            <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-5 border border-white/10">

              <ClipboardList className="text-green-400 mb-3" />

              <h3 className="text-white font-semibold">
                Track Everything
              </h3>

              <p className="text-slate-300 text-sm mt-2">
                Assets, bookings and maintenance in one place.
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* ================= RIGHT SECTION ================= */}

      <div className="flex items-center justify-center px-6 py-12">

        <div className="w-full max-w-md">

          <div className="mb-10 text-center">

            <h2 className="text-4xl font-bold text-white">
              Create Account
            </h2>

            <p className="text-slate-400 mt-3">
              Register as an employee to access AssetFlow
            </p>

          </div>

          <form className="space-y-5">

            {/* Name */}

            <div>

              <label className="text-sm text-slate-300">
                Full Name
              </label>

              <div className="mt-2 relative">

                <User className="absolute left-4 top-4 w-5 h-5 text-slate-500" />

                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full rounded-xl border border-slate-700 bg-slate-900 py-3 pl-12 pr-4 text-white outline-none focus:border-emerald-500"
                />

              </div>

            </div>

            {/* Email */}

            <div>

              <label className="text-sm text-slate-300">
                Work Email
              </label>

              <div className="mt-2 relative">

                <Mail className="absolute left-4 top-4 w-5 h-5 text-slate-500" />

                <input
                  type="email"
                  placeholder="name@company.com"
                  className="w-full rounded-xl border border-slate-700 bg-slate-900 py-3 pl-12 pr-4 text-white outline-none focus:border-emerald-500"
                />

              </div>

            </div>

            {/* Department */}

            <div>

              <label className="text-sm text-slate-300">
                Department
              </label>

              <div className="mt-2 relative">

                <Building2 className="absolute left-4 top-4 w-5 h-5 text-slate-500" />

                <input
                  type="text"
                  placeholder="Computer Science"
                  className="w-full rounded-xl border border-slate-700 bg-slate-900 py-3 pl-12 pr-4 text-white outline-none focus:border-emerald-500"
                />

              </div>

            </div>

            {/* Password */}

            <div>

              <label className="text-sm text-slate-300">
                Password
              </label>

              <div className="mt-2 relative">

                <Lock className="absolute left-4 top-4 w-5 h-5 text-slate-500" />

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="********"
                  className="w-full rounded-xl border border-slate-700 bg-slate-900 py-3 pl-12 pr-12 text-white outline-none focus:border-emerald-500"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-4 top-3.5 text-slate-400"
                >
                  {showPassword ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>

              </div>

            </div>

            {/* Confirm */}

            <div>

              <label className="text-sm text-slate-300">
                Confirm Password
              </label>

              <div className="mt-2 relative">

                <Lock className="absolute left-4 top-4 w-5 h-5 text-slate-500" />

                <input
                  type={showConfirm ? "text" : "password"}
                  placeholder="********"
                  className="w-full rounded-xl border border-slate-700 bg-slate-900 py-3 pl-12 pr-12 text-white outline-none focus:border-emerald-500"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowConfirm(!showConfirm)
                  }
                  className="absolute right-4 top-3.5 text-slate-400"
                >
                  {showConfirm ? (
                    <EyeOff size={20} />
                  ) : (
                    <Eye size={20} />
                  )}
                </button>

              </div>

            </div>

            {/* Terms */}

            <div className="flex items-center gap-2">

              <input
                type="checkbox"
                className="accent-emerald-500"
              />

              <span className="text-sm text-slate-400">
                I agree to the Terms & Privacy Policy
              </span>

            </div>

            {/* Button */}

            {/* Create Account Button */}
<button
  type="submit"
  className="w-full rounded-xl bg-gradient-to-r from-emerald-500 to-green-500 py-3 font-semibold text-white transition hover:scale-[1.02]"
>
  <div className="flex items-center justify-center gap-2">
    Create Account
    <ArrowRight size={18} />
  </div>
</button>

{/* Login Button */}
<Link href="/login" className="block mt-4">
  <button
    type="button"
    className="w-full rounded-xl border border-emerald-500 py-3 font-semibold text-emerald-400 transition hover:bg-emerald-500 hover:text-white"
  >
    Login Instead
  </button>
</Link>

          </form>

          

        </div>

      </div>

    </div>
  );
}