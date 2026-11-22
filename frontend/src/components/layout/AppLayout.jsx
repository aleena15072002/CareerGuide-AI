import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  FiMenu,
  FiX,
  FiGrid,
  FiUser,
  FiBarChart2,
  FiBriefcase,
  FiMap,
  FiMessageCircle,
  FiFileText,
  FiBook,
  FiBell,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";

import { useAuth } from "../../context/AuthContext";

const items = [
  ["Dashboard", "/dashboard", FiGrid],
  ["Student Profile", "/profile", FiUser],
  ["Career Analysis", "/career-analysis", FiBarChart2],
  ["Recommendations", "/recommendations", FiBriefcase],
  ["Career Roadmap", "/roadmap/1", FiMap],
  ["AI Career Chat", "/chat", FiMessageCircle],
  ["PDF Analyzer", "/pdf-analyzer", FiFileText],
  ["Placement Prep", "/placement-preparation", FiBook],
  ["Notifications", "/notifications", FiBell],
  ["Settings", "/settings", FiSettings],
];

export default function AppLayout() {
  const [open, setOpen] = useState(false);

  const { logout, user } = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-slate-900/30 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-40 flex h-screen w-64 flex-col bg-slate-950 text-slate-300 transition-transform lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="flex h-16 items-center justify-between border-b border-slate-800 px-5">
          <div className="flex items-center gap-2 text-white">
            <div className="grid h-9 w-9 place-items-center rounded-lg bg-blue-600">
              <FiBook />
            </div>

            <span className="font-bold">CareerGuide AI</span>
          </div>

          <button
            className="lg:hidden"
            onClick={() => setOpen(false)}
          >
            <FiX size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 overflow-y-auto p-3">
          {items.map(([label, path, Icon]) => (
            <NavLink
              key={path}
              to={path}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium ${
                  isActive
                    ? "bg-blue-600 text-white"
                    : "hover:bg-slate-900 hover:text-white"
                }`
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="border-t border-slate-800 p-3">
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm hover:bg-slate-900 hover:text-white"
          >
            <FiLogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Header */}
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur lg:px-8">
          {/* Mobile menu */}
          <button
            className="rounded-lg p-2 hover:bg-slate-100 lg:hidden"
            onClick={() => setOpen(true)}
          >
            <FiMenu size={22} />
          </button>

          <div className="hidden text-sm text-slate-500 sm:block">
            AI-powered career guidance platform
          </div>

          {/* User */}
          <div className="ml-auto flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-semibold text-slate-900">
                {user?.name || user?.full_name || "Student"}
              </p>

              <p className="text-xs capitalize text-slate-500">
                {user?.role || "Student"}
              </p>
            </div>

            <div className="grid h-9 w-9 place-items-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">
              {(user?.name || user?.full_name || "A")
                .charAt(0)
                .toUpperCase()}
            </div>
          </div>
        </header>

        {/* Page */}
        <main className="mx-auto max-w-7xl p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}