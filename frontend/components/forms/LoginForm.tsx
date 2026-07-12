"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Boxes,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  ClipboardList,
} from "lucide-react";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-slate-950">

      {/* LEFT PANEL */}
      <div className="relative hidden lg:flex overflow-hidden">

        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950 via-emerald-900 to-slate-950" />

        <div className="absolute top-20 left-20 h-72 w-72 rounded-full bg-emerald-500/20 blur-[120px]" />
        <div className="absolute bottom-10 right-10 h-80 w-80 rounded-full bg-green-500/10 blur-[140px]" />

        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px),linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative z-10 flex flex-col justify-between p-16 w-full">

          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-emerald-500 p-3">
              <Boxes className="h-6 w-6 text-white" />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-white">AssetFlow</h2>
              <p className="text-sm text-emerald-200">
                Enterprise Asset ERP
              </p>
            </div>
          </div>

          <div className="max-w-xl">
            <span className="text-sm uppercase tracking-[0.3em] text-emerald-300">
              Welcome Back
            </span>

            <h1 className="mt-4 text-6xl font-bold leading-tight text-white">
              Access Your
              <br />
              Workspace.
            </h1>

            <p className="mt-6 text-lg leading-8 text-slate-300">
              Track assets, manage maintenance, approve requests,
              and monitor your organization's resources from one
              secure dashboard.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">

            <div className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur-xl">
              <ShieldCheck className="mb-3 text-emerald-400" />
              <h3 className="font-semibold text-white">
                Secure Login
              </h3>
              <p className="mt-2 text-sm text-slate-300">
                Protected authentication for every employee.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur-xl">
              <ClipboardList className="mb-3 text-green-400" />
              <h3 className="font-semibold text-white">
                Real-time Access
              </h3>
              <p className="mt-2 text-sm text-slate-300">
                Continue where you left off instantly.
              </p>
            </div>

          </div>

        </div>
      </div>

      {/* RIGHT PANEL */}

      <div className="flex items-center justify-center px-6 py-12">

        <div className="w-full max-w-md">

          <div className="mb-10 text-center">

            <h2 className="text-4xl font-bold text-white">
              Sign In
            </h2>

            <p className="mt-3 text-slate-400">
              Login to your AssetFlow account
            </p>

          </div>

          <form className="space-y-5">

            <div>

              <label className="text-sm text-slate-300">
                Email Address
              </label>

              <div className="relative mt-2">

                <Mail className="absolute left-4 top-4 h-5 w-5 text-slate-500" />

                <input
                  type="email"
                  placeholder="name@company.com"
                  className="w-full rounded-xl border border-slate-700 bg-slate-900 py-3 pl-12 pr-4 text-white outline-none focus:border-emerald-500"
                />

              </div>

            </div>

            <div>

              <div className="mb-2 flex items-center justify-between">

                <label className="text-sm text-slate-300">
                  Password
                </label>

                <Link
                  href="/forgot-password"
                  className="text-sm text-emerald-400 hover:text-emerald-300"
                >
                  Forgot Password?
                </Link>

              </div>

              <div className="relative">

                <Lock className="absolute left-4 top-4 h-5 w-5 text-slate-500" />

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
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

            <div className="flex items-center justify-between">

              <label className="flex items-center gap-2 text-sm text-slate-400">

                <input
                  type="checkbox"
                  className="accent-emerald-500"
                />

                Remember Me

              </label>

            </div>

            <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-green-500 py-3 font-semibold text-white transition hover:scale-[1.02]">

              Login

              <ArrowRight size={18} />

            </button>

          </form>

          <p className="mt-8 text-center text-slate-400">

            Don't have an account?{" "}

            <Link
              href="/signup"
              className="font-semibold text-emerald-400 hover:text-emerald-300"
            >
              Create Account
            </Link>

          </p>

        </div>

      </div>

    </div>
  );
}