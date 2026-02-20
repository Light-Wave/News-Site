import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";

export default async function UnsubscribedPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
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
            Not Authenticated
          </h1>
          <p className="text-gray-600 text-base mb-8">
            Please sign in to view your subscription status.
          </p>
          <Link
            href="/sign-in"
            className="px-8 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition"
          >
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  // Get all subscriptions using Better Auth API
  const subscriptions = await auth.api.listActiveSubscriptions({
    headers: await headers(),
  });

  // Find subscriptions scheduled for cancellation or already canceled
  const canceledSubscription = subscriptions?.find(
    (sub) => sub.cancelAtPeriodEnd,
  );

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Success state: Subscription successfully scheduled for cancellation
  if (canceledSubscription) {
    return (
      <div className="min-h-screen bg-[#f5f1ea] px-4 py-16 overflow-x-hidden flex items-center justify-center">
        <div className="max-w-2xl w-full text-center">
          <div className="mb-8">
            <svg
              className="mx-auto w-20 h-20 text-blue-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>

          <h1 className="text-6xl md:text-4xl font-bold mb-4">
            You've Been Unsubscribed
          </h1>

          <p className="text-gray-600 text-lg mb-2">
            Your subscription has been successfully canceled.
          </p>

          {canceledSubscription.periodEnd && (
            <p className="text-gray-600 text-base mb-8">
              You will retain access to premium features until{" "}
              <span className="font-semibold">
                {formatDate(new Date(canceledSubscription.periodEnd))}
              </span>
              . If you change your mind, you can resubscribe at any time.
            </p>
          )}

          {!canceledSubscription.periodEnd && (
            <p className="text-gray-600 text-base mb-8">
              You will retain access to premium features until the end of your
              current billing period. If you change your mind, you can
              resubscribe at any time.
            </p>
          )}

          <div className="space-y-4">
            <p className="text-gray-700 font-medium">
              A confirmation email has been sent to your email address.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="px-8 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition"
              >
                Return to Home
              </Link>
              <Link
                href="/subscribe"
                className="px-8 py-3 border-2 border-black text-black rounded-lg font-semibold hover:bg-black hover:text-white transition"
              >
                View Plans
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state: No subscription or no scheduled cancellation found
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
          No Subscription Found
        </h1>
        <p className="text-gray-600 text-lg mb-2">
          We couldn't find a subscription to cancel.
        </p>
        <p className="text-gray-600 text-base mb-8">
          It appears you don't have an active subscription or no cancellation
          was scheduled. If you were trying to cancel a subscription, please
          contact support.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="px-8 py-3 bg-black text-white rounded-lg font-semibold hover:bg-gray-800 transition"
          >
            Return to Home
          </Link>
          <Link
            href="/subscribe"
            className="px-8 py-3 border-2 border-black text-black rounded-lg font-semibold hover:bg-black hover:text-white transition"
          >
            View Plans
          </Link>
        </div>
      </div>
    </div>
  );
}
