"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  House,
  LayoutDashboard,
  Newspaper,
  Star,
  Users,
  CreditCard,
} from "lucide-react";

export default function SideBar() {
  const pathname = usePathname(); // Get current URL path

  const menu = [
    { name: "Homepage", icon: House, href: "/" },
    { name: "Dashboard", icon: LayoutDashboard, href: "/admin/dashboard" },
    { name: "Article Manager", icon: Newspaper, href: "/admin/articles" },
    { name: "Editor's Picks", icon: Star, href: "/admin/picks" },
    { name: "User Management", icon: Users, href: "/admin/users" },
    { name: "Plans & Pricing", icon: CreditCard, href: "/admin/plans" },
  ];

  return (
    <div className="flex flex-col h-full text-slate-300">
      <div className="p-6 text-white font-bold text-xl flex items-center gap-2 border-b border-slate-700">
        📰💎 InsightHub
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {menu.map((item) => {
          // Check if the link matches the current path (supports nested routes)
          const isActive =
            item.href === "/"
              ? pathname === "/"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? "bg-slate-800 text-white shadow-sm" // Active Style
                  : "hover:bg-slate-800/50 hover:text-white" // Inactive Style
              }`}
            >
              <item.icon
                className={`h-5 w-5 ${isActive ? "text-blue-400" : "text-slate-400"}`}
              />
              <span
                className={`text-sm font-medium ${isActive ? "opacity-100" : "opacity-70"}`}
              >
                {item.name}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
