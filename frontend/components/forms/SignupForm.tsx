"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signup } from "@/services/api";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  Boxes,
  ShieldCheck,
  ClipboardList,
} from "lucide-react";

export default function SignupForm() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      await signup({
        first_name: firstName,
        last_name: lastName,
        email,
        password,
      });

      setSuccess(
        "Account created successfully! Redirecting..."
      );

      setTimeout(() => {
        router.replace("/login");
      }, 1200);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Signup failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid min-h-screen bg-slate-950 lg:grid-cols-2">

      {/* LEFT PANEL */}

      <div className="relative hidden overflow-hidden lg:flex">

        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950 via-emerald-900 to-slate-950" />

        <div className="absolute left-20 top-20 h-72 w-72 rounded-full bg-emerald-500/20 blur-[120px]" />

        <div className="absolute bottom-0 right-10 h-80 w-80 rounded-full bg-green-400/10 blur-[140px]" />

        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px),linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        <div className="relative z-10 flex w-full flex-col justify-between p-16">

          <div className="flex items-center gap-3">

            <div className="rounded-xl bg-emerald-500 p-3">

              <Boxes className="h-6 w-6 text-white" />

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

          <div className="max-w-xl">

            <span className="text-sm uppercase tracking-[0.3em] text-emerald-300">
              Smart Asset Management
            </span>

            <h1 className="mt-4 text-5xl font-bold leading-tight text-white xl:text-6xl">
              Manage Assets
              <br />
              Smarter.
            </h1>

            <p className="mt-6 text-lg leading-8 text-slate-300">
              Digitize your organization's assets,
              maintenance, bookings and audit workflow
              from one unified platform.
            </p>

          </div>

          <div className="grid grid-cols-2 gap-6">

            <div className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur-xl">

              <ShieldCheck className="mb-3 text-emerald-400" />

              <h3 className="font-semibold text-white">
                Secure Access
              </h3>

              <p className="mt-2 text-sm text-slate-300">
                Enterprise-grade authentication.
              </p>

            </div>

            <div className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur-xl">

              <ClipboardList className="mb-3 text-green-400" />

              <h3 className="font-semibold text-white">
                Track Everything
              </h3>

              <p className="mt-2 text-sm text-slate-300">
                Assets, bookings and maintenance.
              </p>

            </div>

          </div>

        </div>

      </div>

      {/* RIGHT PANEL */}

      <div className="flex items-center justify-center px-6 py-12 lg:px-12">

        <div className="w-full max-w-md">

          <div className="mb-10 text-center">

            <h2 className="text-4xl font-bold text-white">
              Create Account
            </h2>

            <p className="mt-3 text-slate-400">
              Register as an employee to access
              AssetFlow
            </p>

          </div>
          {error && (
            <div className="mb-4 rounded-xl border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-300">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 rounded-xl border border-emerald-500/40 bg-emerald-500/10 p-3 text-sm text-emerald-300">
              {success}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="space-y-5"
          >

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

              <div>

                <label className="text-sm text-slate-300">
                  First Name
                </label>

                <div className="relative mt-2">

                  <User className="absolute left-4 top-4 h-5 w-5 text-slate-500" />

                  <input
                    required
                    value={firstName}
                    onChange={(e) =>
                      setFirstName(e.target.value)
                    }
                    type="text"
                    placeholder="John"
                    className="w-full rounded-xl border border-slate-700 bg-slate-900 py-3 pl-12 pr-4 text-white outline-none transition focus:border-emerald-500"
                  />

                </div>

              </div>

              <div>

                <label className="text-sm text-slate-300">
                  Last Name
                </label>

                <div className="relative mt-2">

                  <User className="absolute left-4 top-4 h-5 w-5 text-slate-500" />

                  <input
                    required
                    value={lastName}
                    onChange={(e) =>
                      setLastName(e.target.value)
                    }
                    type="text"
                    placeholder="Doe"
                    className="w-full rounded-xl border border-slate-700 bg-slate-900 py-3 pl-12 pr-4 text-white outline-none transition focus:border-emerald-500"
                  />

                </div>

              </div>

            </div>

            <div>

              <label className="text-sm text-slate-300">
                Email
              </label>

              <div className="relative mt-2">

                <Mail className="absolute left-4 top-4 h-5 w-5 text-slate-500" />

                <input
                  required
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  type="email"
                  placeholder="user@example.com"
                  className="w-full rounded-xl border border-slate-700 bg-slate-900 py-3 pl-12 pr-4 text-white outline-none transition focus:border-emerald-500"
                />

              </div>

            </div>

            <div>

              <label className="text-sm text-slate-300">
                Password
              </label>

              <div className="relative mt-2">

                <Lock className="absolute left-4 top-4 h-5 w-5 text-slate-500" />

                <input
                  required
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  placeholder="Minimum 8 characters"
                  className="w-full rounded-xl border border-slate-700 bg-slate-900 py-3 pl-12 pr-12 text-white outline-none transition focus:border-emerald-500"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
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

            <div className="flex items-center gap-2 text-sm text-slate-400">

              <input
                type="checkbox"
                required
                className="accent-emerald-500"
              />

              <span>
                I agree to the Terms &
                Privacy Policy
              </span>

            </div>

            <button
              type="submit"
              disabled={loading}
              className={`flex w-full items-center justify-center gap-2 rounded-xl py-3 font-semibold transition-all duration-300 ${
                loading
                  ? "cursor-not-allowed bg-slate-700 text-slate-400"
                  : "bg-gradient-to-r from-emerald-500 to-green-500 text-white hover:scale-[1.02]"
              }`}
            >
              {loading ? (
                <>
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>

                  Creating Account...
                </>
              ) : (
                <>
                  Create Account

                  <ArrowRight size={18} />
                </>
              )}
            </button>

            <Link
              href="/login"
              className="block"
            >
              <button
                type="button"
                className="w-full rounded-xl border border-emerald-500 py-3 font-semibold text-emerald-400 transition hover:bg-emerald-500 hover:text-white"
              >
                Login Instead
              </button>
            </Link>

          </form>

          <p className="mt-8 text-center text-sm text-slate-500">
            © 2026 AssetFlow ERP
          </p>

        </div>

      </div>

    </div>
  );
}