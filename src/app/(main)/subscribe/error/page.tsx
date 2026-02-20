import Link from "next/link";

export default function ErrorPage() {
  return (
    <div className="min-h-screen bg-[#f5f1ea] px-4 py-16 overflow-x-hidden flex items-center justify-center">
      <div className="max-w-2xl w-full text-center">
        <div className="mb-8">
          <svg
            className="mx-auto w-20 h-20 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        <h1 className="text-6xl md:text-4xl font-bold mb-4">
          Subscription Failed
        </h1>

        <p className="text-gray-600 text-lg mb-2">
          Unfortunately, something went wrong with your subscription.
        </p>

        <p className="text-gray-600 text-base mb-8">
          Please check your payment details and try again. If the problem
          persists, please contact our support team.
        </p>

        <div className="space-y-4">
          <p className="text-gray-700 font-medium">
            Error Code: Your transaction could not be processed.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/subscribe"
              className="px-8 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition"
            >
              Try Again
            </Link>
            <Link
              href="/"
              className="px-8 py-3 border-2 border-black text-black rounded-lg font-semibold hover:bg-black hover:text-white transition"
            >
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
