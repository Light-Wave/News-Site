import Link from "next/link";
import {
  LayoutDashboard,
  Newspaper,
  Star,
  Users,
  CreditCard,
} from "lucide-react";

export default function SideBar() {
  const menu = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      href: "/admin/dashboard",
      active: true,
    },
    { name: "Article Manager", icon: Newspaper, href: "/admin/articles" },
    { name: "Editor's Picks", icon: Star, href: "/admin/picks" },
    { name: "User Management", icon: Users, href: "/admin/users" },
    { name: "Plans & Pricing", icon: CreditCard, href: "/admin/plans" },
  ];

  return (
    <div className="flex flex-col h-full text-slate-300">
      <div className="p-6 text-white font-bold text-xl flex items-center gap-2 border-b border-slate-700">
        <div className="font-semibold" /> 📰💎InsightHub
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {menu.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${item.active ? "bg-slate-800 text-white" : "hover:bg-slate-800 hover:text-white"}`}
          >
            <item.icon
              className={`h-5 w-5 ${item.active ? "text-blue-400" : ""}`}
            />
            <span className="text-sm font-medium">{item.name}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
