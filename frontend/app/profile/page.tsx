"use client";

import Navbar from "@/components/navbar/Navbar";
import Sidebar from "@/components/sidebar/Sidebar";
import { User, Mail, Shield, Phone, Building2, Calendar } from "lucide-react";

export default function ProfilePage() {
  // Replace these with API data later
  const user = {
    first_name: "Ashu",
    last_name: "Yadav",
    email: "ashu@example.com",
    role: "Employee",
    department: "IT",
    phone: "+91 9876543210",
    status: "Active",
    joined: "12 Jul 2026",
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div className="flex min-h-screen bg-slate-950">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <Navbar />

        <main className="flex-1 p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white">Profile</h1>
            <p className="mt-2 text-slate-400">
              Manage your account information.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Left Card */}
            <div className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
              <div className="flex flex-col items-center">
                <div className="flex h-28 w-28 items-center justify-center rounded-full bg-emerald-500 text-4xl font-bold text-white">
                  {user.first_name[0]}
                </div>

                <h2 className="mt-5 text-2xl font-bold text-white">
                  {user.first_name} {user.last_name}
                </h2>

                <p className="mt-2 text-slate-400">{user.role}</p>

                <span className="mt-4 rounded-full bg-emerald-500/20 px-4 py-2 text-sm text-emerald-400">
                  {user.status}
                </span>
              </div>
            </div>

            {/* Right Card */}
            <div className="lg:col-span-2 rounded-2xl border border-slate-800 bg-slate-900 p-8">
              <h2 className="mb-8 text-2xl font-semibold text-white">
                Personal Information
              </h2>

              <div className="grid gap-6 md:grid-cols-2">
                <Info icon={<User size={20} />} title="First Name" value={user.first_name} />
                <Info icon={<User size={20} />} title="Last Name" value={user.last_name} />
                <Info icon={<Mail size={20} />} title="Email" value={user.email} />
                <Info icon={<Shield size={20} />} title="Role" value={user.role} />
                <Info icon={<Building2 size={20} />} title="Department" value={user.department} />
                <Info icon={<Phone size={20} />} title="Phone" value={user.phone} />
                <Info icon={<Calendar size={20} />} title="Joined" value={user.joined} />
              </div>

              <div className="mt-10 flex flex-wrap gap-4">
                <button className="rounded-xl bg-emerald-500 px-6 py-3 font-semibold text-white hover:bg-emerald-600">
                  Edit Profile
                </button>

                <button className="rounded-xl border border-slate-700 px-6 py-3 text-white hover:bg-slate-800">
                  Change Password
                </button>

                <button
                  onClick={logout}
                  className="rounded-xl bg-red-500 px-6 py-3 font-semibold text-white hover:bg-red-600"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function Info({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-slate-800 bg-slate-950 p-5">
      <div className="mb-3 flex items-center gap-2 text-emerald-400">
        {icon}
        <span className="text-sm">{title}</span>
      </div>

      <p className="text-lg font-semibold text-white">{value}</p>
    </div>
  );
}