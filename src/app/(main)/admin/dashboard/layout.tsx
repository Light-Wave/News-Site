import SideBar from "@/components/dashboard/SideBar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-[#f1f5f9] overflow-hidden">
      {/* SIDEBAR: Fixed width */}
      <aside className="hidden lg:flex w-64 flex-col bg-[#1e293b] fixed h-full shadow-xl">
        <SideBar />
      </aside>

      {/* MAIN AREA: Use flex-1 and remove max-width constraints */}
      <div className="flex-1 flex flex-col lg:ml-64 min-w-0 h-full">
        {/* Header: Full width */}
        <header className="h-16 bg-white border-b flex items-center justify-between px-6 shrink-0">
          <div className="flex-1 max-w-xl">
            <input
              type="text"
              placeholder="Search data..."
              className="w-full bg-slate-100 rounded-lg px-4 py-2 text-sm outline-none focus:ring-1 ring-blue-500"
            />
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm font-bold text-slate-600">
              Admin Panel
            </span>
            <div className="w-8 h-8 rounded-full bg-slate-200" />
          </div>
        </header>

        {/* Content: Full width with minimal padding */}
        <main className="flex-1 overflow-y-auto p-6">
          {/* REMOVED max-w-[1600px] to let it fill the screen */}
          <div className="w-full">{children}</div>
        </main>
      </div>
    </div>
  );
}
