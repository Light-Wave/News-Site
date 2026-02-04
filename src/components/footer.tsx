import { getAllCategories } from "@/types/categories";
import Link from "next/link";

export default async function Footer() {
  const categories = await getAllCategories();

  return (
    <footer className="border-t bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Sections */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Categories */}
          <div>
            <div className="inline-block rounded bg-gray-200 px-3 py-1">
              <h1 className="text-xs font-semibold uppercase text-gray-900">
                Sections
              </h1>
            </div>

            <nav>
              <ul className="mt-4 space-y-1">
                {categories.map((category) => (
                  <li key={category.id}>
                    <Link
                      href={`/category/${category.name.toLowerCase()}`}
                      className="text-sm text-gray-700 hover:text-black"
                    >
                      {category.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* About */}
          <div>
            <div className="inline-block rounded bg-gray-200 px-3 py-1">
              <h1 className="text-xs font-semibold uppercase text-gray-900">
                About Us
              </h1>
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
              <h1 className="text-xs font-semibold uppercase text-gray-900">
                Careers
              </h1>
            </div>

            <p className="mt-4 text-sm text-gray-700 leading-relaxed">
              Join our team of journalists, editors, and technologists who
              believe in ethical and impactful storytelling.
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-6 border-t border-gray-300 pt-4 text-center text-xs text-gray-600">
          © {new Date().getFullYear()} The Bibliomancer’s Brief. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
}
