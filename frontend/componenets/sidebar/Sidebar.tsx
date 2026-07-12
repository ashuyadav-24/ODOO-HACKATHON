export default function Sidebar() {
  const menus = [
    "Dashboard",
    "Assets",
    "Allocation",
    "Bookings",
    "Maintenance",
    "Audit",
    "Reports",
    "Notifications",
  ];

  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen p-6">
      <h2 className="text-2xl font-bold mb-8">
        AssetFlow
      </h2>

      <nav>
        <ul className="space-y-3">
          {menus.map((item) => (
            <li
              key={item}
              className="cursor-pointer rounded-lg px-4 py-3 hover:bg-slate-700 transition"
            >
              {item}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}