"use client";

import { useState } from "react";
import Link from "next/link";
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
  const [showPassword, setShowPassword] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await signup({
        first_name: firstName,
        last_name: lastName,
        email,
        password,
      });

      alert("Signup Successful!");
      console.log(res);
      window.location.href = "/login";
    } catch (err: any) {
      alert(err?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-slate-950">
      <div className="relative hidden lg:flex overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950 via-emerald-900 to-slate-950" />
        <div className="absolute top-20 left-20 h-72 w-72 rounded-full bg-emerald-500/20 blur-[120px]" />
        <div className="absolute bottom-0 right-10 h-80 w-80 rounded-full bg-green-400/10 blur-[140px]" />

        <div className="relative z-10 flex flex-col justify-between p-16 w-full">
          <div className="flex items-center gap-3">
            <div className="bg-emerald-500 p-3 rounded-xl">
              <Boxes className="text-white w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">AssetFlow</h2>
              <p className="text-sm text-emerald-200">Enterprise Asset ERP</p>
            </div>
          </div>

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
              Digitize your organization's assets, maintenance, bookings and
              audit workflow from one unified platform.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-5 border border-white/10">
              <ShieldCheck className="text-emerald-400 mb-3" />
              <h3 className="text-white font-semibold">Secure Access</h3>
            </div>
            <div className="backdrop-blur-xl bg-white/10 rounded-2xl p-5 border border-white/10">
              <ClipboardList className="text-green-400 mb-3" />
              <h3 className="text-white font-semibold">Track Everything</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="mb-10 text-center">
            <h2 className="text-4xl font-bold text-white">Create Account</h2>
            <p className="text-slate-400 mt-3">
              Register as an employee to access AssetFlow
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-slate-300">First Name</label>
                <div className="mt-2 relative">
                  <User className="absolute left-4 top-4 w-5 h-5 text-slate-500" />
                  <input value={firstName} onChange={(e)=>setFirstName(e.target.value)} type="text" placeholder="John" className="w-full rounded-xl border border-slate-700 bg-slate-900 py-3 pl-12 pr-4 text-white outline-none focus:border-emerald-500"/>
                </div>
              </div>

              <div>
                <label className="text-sm text-slate-300">Last Name</label>
                <div className="mt-2 relative">
                  <User className="absolute left-4 top-4 w-5 h-5 text-slate-500" />
                  <input value={lastName} onChange={(e)=>setLastName(e.target.value)} type="text" placeholder="Doe" className="w-full rounded-xl border border-slate-700 bg-slate-900 py-3 pl-12 pr-4 text-white outline-none focus:border-emerald-500"/>
                </div>
              </div>
            </div>

            <div>
              <label className="text-sm text-slate-300">Email</label>
              <div className="mt-2 relative">
                <Mail className="absolute left-4 top-4 w-5 h-5 text-slate-500" />
                <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" placeholder="user@example.com" className="w-full rounded-xl border border-slate-700 bg-slate-900 py-3 pl-12 pr-4 text-white outline-none focus:border-emerald-500"/>
              </div>
            </div>

            <div>
              <label className="text-sm text-slate-300">Password</label>
              <div className="mt-2 relative">
                <Lock className="absolute left-4 top-4 w-5 h-5 text-slate-500" />
                <input value={password} onChange={(e)=>setPassword(e.target.value)} type={showPassword ? "text":"password"} placeholder="********" className="w-full rounded-xl border border-slate-700 bg-slate-900 py-3 pl-12 pr-12 text-white outline-none focus:border-emerald-500"/>
                <button type="button" onClick={()=>setShowPassword(!showPassword)} className="absolute right-4 top-3.5 text-slate-400">
                  {showPassword ? <EyeOff size={20}/> : <Eye size={20}/>}
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <input type="checkbox" className="accent-emerald-500"/>
              <span className="text-sm text-slate-400">I agree to the Terms & Privacy Policy</span>
            </div>

            <button type="submit" disabled={loading} className="w-full rounded-xl bg-gradient-to-r from-emerald-500 to-green-500 py-3 font-semibold text-white">
              <div className="flex items-center justify-center gap-2">
                {loading ? "Creating Account..." : "Create Account"}
                <ArrowRight size={18}/>
              </div>
            </button>

            <Link href="/login" className="block">
              <button type="button" className="w-full rounded-xl border border-emerald-500 py-3 font-semibold text-emerald-400 hover:bg-emerald-500 hover:text-white">
                Login Instead
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
