import Link from "next/link";

export default async function Page() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between border-b pb-4">
        <h1 className="text-2xl font-semibold">Articles</h1>

        <div className="flex gap-3">
          <Link
            href="/admin/dashboard/articles/create"
            className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Create Article
          </Link>

          <Link
            href="/admin/dashboard/articles/generate"
            className="px-4 py-2 rounded-md bg-purple-600 text-white hover:bg-purple-700 transition"
          >
            Generate AI Article
          </Link>
        </div>
      </div>
    </div>
  );
}
