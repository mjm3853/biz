import { NavLink, Outlet } from "react-router-dom";
import { BarChart3, GitCompare, History, PieChart } from "lucide-react";

const navItems = [
  { to: "/dashboard", label: "Rankings", icon: BarChart3, end: true },
  { to: "/dashboard/compare", label: "Compare", icon: GitCompare, end: false },
  { to: "/dashboard/portfolio", label: "Portfolio", icon: PieChart, end: false },
  { to: "/dashboard/history", label: "History", icon: History, end: false },
];

export default function DashboardLayout() {
  return (
    <div className="flex min-h-[calc(100vh-8rem)]">
      <aside className="w-56 border-r border-gray-200 bg-gray-50 p-4 flex-shrink-0 hidden md:block">
        <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
          Deal Flow
        </h2>
        <nav className="space-y-1">
          {navItems.map(({ to, label, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-gray-900 text-white"
                    : "text-gray-600 hover:bg-gray-200 hover:text-gray-900"
                }`
              }
            >
              <Icon className="w-4 h-4" />
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="mt-8 pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Quick Score</p>
          <p className="text-xs text-gray-500">
            Click any idea in Rankings to score it, or visit its detail page.
          </p>
        </div>
      </aside>
      <main className="flex-1 p-6 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
}
