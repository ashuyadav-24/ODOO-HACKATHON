import Sidebar from "../../componenets/sidebar/Sidebar";
import Navbar from "../../componenets/navbar/Navbar";
import KPICard from "../../componenets/cards/KPICard";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1">
        <Navbar />

        <main className="p-6">
          <h1 className="text-3xl font-bold mb-6">
            Dashboard
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <KPICard title="Total Assets" value="1,250" />
            <KPICard title="Allocated Assets" value="890" />
            <KPICard title="Available Assets" value="320" />
            <KPICard title="Maintenance" value="40" />
          </div>
        </main>
      </div>
    </div>
  );
}
