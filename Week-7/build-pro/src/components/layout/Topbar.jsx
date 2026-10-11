import {
  Search,
  Bell,
  ChevronDown,
  Menu,
} from "lucide-react";

import { useAuthStore } from "../../store/useAuthStore";

function Topbar({ onMenuClick }) {
  const user = useAuthStore((state) => state.user);

  return (
    <header className="fixed right-0 top-0 z-30 flex h-20 items-center border-b border-slate-200 bg-white px-6 md:left-64">

      {/* Mobile menu */}
      <button
        onClick={onMenuClick}
        className="mr-4 rounded-lg p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
      >
        <Menu size={22} />
      </button>

      {/* Search */}
      <div className="relative hidden w-full max-w-md md:block">

        <Search
          size={19}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          type="text"
          placeholder="Search projects, tasks, workers..."
          className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
        />

      </div>

      <div className="ml-auto flex items-center gap-4">

        {/* Notification */}
        <button className="relative rounded-xl p-2.5 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900">

          <Bell size={20} />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-blue-600 ring-2 ring-white" />

        </button>

        <div className="h-8 w-px bg-slate-200" />

        {/* User */}
        <button className="flex items-center gap-3 rounded-xl px-2 py-1.5 hover:bg-slate-50">

          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-sm font-bold text-blue-700">
            {(user?.name || "U")
              .charAt(0)
              .toUpperCase()}
          </div>

          <div className="hidden text-left sm:block">
            <p className="text-sm font-semibold text-slate-800">
              {user?.name || "User"}
            </p>

            <p className="text-xs text-slate-400">
              Administrator
            </p>
          </div>

          <ChevronDown
            size={16}
            className="hidden text-slate-400 sm:block"
          />

        </button>

      </div>

    </header>
  );
}

export default Topbar;