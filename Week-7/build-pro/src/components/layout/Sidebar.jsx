import {
  LayoutDashboard,
  Building2,
  ClipboardList,
  Package,
  Wallet,
  Users,
  Boxes,
  UserRoundCog,
  Settings,
  LogOut,
  HardHat,
} from "lucide-react";

import { NavLink, useLocation, useParams } from "react-router-dom";
import { useAuthStore } from "../../store/useAuthStore";

function Sidebar() {
  const logout = useAuthStore((state) => state.logout);

  const location = useLocation();
  const { projectId: routeProjectId } = useParams();

  // Get project ID from the current project route.
  // This also works when Sidebar is rendered inside MainLayout.
  const projectMatch = location.pathname.match(
    /^\/(?:dashboard|projects)\/(\d+)/
  );

  const projectId =
    routeProjectId ||
    projectMatch?.[1] ||
    "1";

  const navigation = [
    {
      name: "Dashboard",
      path: projectId
        ? `/dashboard/${projectId}`
        : "/dashboard",
      icon: LayoutDashboard,
      end: true,
    },
    {
      name: "Projects",
      path: "/projects",
      icon: Building2,
      end: true,
    },
    {
      name: "Tasks",
      path: `/projects/${projectId}/tasks`,
      icon: ClipboardList,
      end: true,
    },
    {
      name: "Materials",
      path: "/materials",
      icon: Package,
      end: true,
    },
    {
      name: "Project Materials",
      path: `/projects/${projectId}/materials`,
      icon: Boxes,
      end: true,
    },
    {
      name: "Expenses",
      path: `/projects/${projectId}/expenses`,
      icon: Wallet,
      end: true,
    },
    {
      name: "Workers",
      path: "/workers",
      icon: Users,
      end: true,
    },
    {
      name: "Project Workers",
      path: `/projects/${projectId}/workers`,
      icon: UserRoundCog,
      end: true,
    },
  ];

  return (
    <aside className="fixed left-0 top-0 z-50 flex h-screen w-64 flex-col bg-[#0f172a] text-white">

      {/* Logo */}
      <div className="flex h-20 shrink-0 items-center border-b border-white/10 px-5">

        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-600">
          <HardHat size={21} strokeWidth={2} />
        </div>

        <div className="ml-3 min-w-0">
          <div className="whitespace-nowrap text-[21px] font-extrabold leading-none tracking-tight text-white">
            BUILD-PRO
          </div>

          <div className="mt-1 whitespace-nowrap text-[8px] font-semibold uppercase tracking-[0.16em] text-slate-400">
            Construction
          </div>
        </div>

      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-5">

        <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
          Workspace
        </p>

        <div className="space-y-1">

          {navigation.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.name}
                to={item.path}
                end={item.end}
                className={({ isActive }) =>
                  `group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                    isActive
                      ? "bg-blue-600 text-white shadow-lg shadow-blue-900/30"
                      : "text-slate-400 hover:bg-white/5 hover:text-white"
                  }`
                }
              >
                <Icon
                  size={18}
                  strokeWidth={1.9}
                  className="shrink-0"
                />

                <span className="truncate">
                  {item.name}
                </span>
              </NavLink>
            );
          })}

        </div>

        <p className="mb-3 mt-8 px-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
          System
        </p>

        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition ${
              isActive
                ? "bg-blue-600 text-white"
                : "text-slate-400 hover:bg-white/5 hover:text-white"
            }`
          }
        >
          <Settings
            size={18}
            className="shrink-0"
          />

          <span>Settings</span>
        </NavLink>

      </nav>

      {/* Logout */}
      <div className="shrink-0 border-t border-white/10 p-3">

        <button
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-400 transition hover:bg-red-500/10 hover:text-red-400"
        >
          <LogOut
            size={18}
            className="shrink-0"
          />

          <span>Logout</span>
        </button>

      </div>

    </aside>
  );
}

export default Sidebar;