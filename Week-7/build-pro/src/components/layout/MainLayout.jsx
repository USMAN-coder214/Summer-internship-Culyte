import { useState } from "react";

import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

function MainLayout({ children }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f4f7fb]">

      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      {/* Mobile Sidebar */}
      {mobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-slate-900/50 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />

          <div className="fixed left-0 top-0 z-50 lg:hidden">
            <Sidebar />
          </div>
        </>
      )}

      {/* Topbar */}
      <Topbar
        onMenuClick={() =>
          setMobileMenuOpen(true)
        }
      />

      {/* Content */}
      <main className="min-h-screen pt-20 lg:ml-64">
        <div className="p-5 sm:p-6 lg:p-8">
          {children}
        </div>
      </main>

    </div>
  );
}

export default MainLayout;