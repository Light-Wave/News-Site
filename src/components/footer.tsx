import Link from "next/link";

const categories = [
  { name: "Home", href: "/" },
  { name: "World", href: "/world" },
  { name: "Politics", href: "/politics" },
  { name: "Business", href: "/business" },
  { name: "Technology", href: "/technology" },
  { name: "Sports", href: "/sports" },
];

export default function Footer() {
  return (
    <footer className="border-t bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* Sections */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Categories */}
          <div>
            <div className="inline-block rounded bg-gray-200 px-3 py-1">
              <h3 className="text-xs font-semibold uppercase text-gray-900">
                Sections
              </h3>
            </div>

            <ul className="mt-4 space-y-1">
              {categories.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-700 hover:text-black"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <div className="inline-block rounded bg-gray-200 px-3 py-1">
              <h3 className="text-xs font-semibold uppercase text-gray-900">
                About
              </h3>
            </div>

            <p className="mt-4 text-sm text-gray-700 leading-relaxed">
              Independent digital newsroom delivering breaking news, in-depth
              reporting, and trusted analysis.
            </p>

            <p className="mt-3 text-sm text-gray-700">
              <span className="font-medium">Contact:</span> contact@newssite.com
            </p>

            <p className="mt-1 text-sm text-gray-700">
              <span className="font-medium">Address:</span> Stockholm, Sweden
            </p>
          </div>

          {/* Careers */}
          <div>
            <div className="inline-block rounded bg-gray-200 px-3 py-1">
              <h3 className="text-xs font-semibold uppercase text-gray-900">
                Careers
              </h3>
            </div>

            <p className="mt-4 text-sm text-gray-700 leading-relaxed">
              Join our team of journalists, editors, and technologists who
              believe in ethical and impactful storytelling.
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-6 border-t border-gray-300 pt-4 text-center text-xs text-gray-600">
          © {new Date().getFullYear()} All rights reserved.
        </div>
      </div>
    </footer>
  );
}
