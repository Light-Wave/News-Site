import Link from "next/link";
import { Button } from "@/components/ui/button";

const categories = [
  { name: "Home", href: "/" },
  { name: "World", href: "/world" },
  { name: "Politics", href: "/politics" },
  { name: "Business", href: "/business" },
  { name: "Technology", href: "/technology" },
  { name: "Sports", href: "/sports" },
];

export default function Navbar() {
  return (
    <header className="border-b bg-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Left: Logo + Categories */}
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="text-xl font-bold tracking-tight text-red-500"
          >
            NewsSite
          </Link>

          <nav className="hidden md:flex gap-6">
            {categories.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-semibold text-gray-700 hover:text-black"
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>

        {/* Right: Subscribe */}
        <Link
          href="/subscribe"
          className="text-base font-semibold text-black-600 hover:underline"
        >
          Subscribe
        </Link>
      </div>
    </header>
  );
}
