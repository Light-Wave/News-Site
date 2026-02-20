import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";

export default async function SuccessPage() {
  const subscriptions = await auth.api.listActiveSubscriptions({
    headers: await headers(),
  });
  const subscription = subscriptions?.find(
    (sub) => sub.status === "active" || sub.status === "trialing",
  );
  const formatDate = (value?: Date | string | null) => {
    if (!value) {
      return null;
    }
    const date = value instanceof Date ? value : new Date(value);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };
  const periodEnd = formatDate(subscription?.periodEnd ?? null);
  return (
    <div className="min-h-screen bg-[#f5f1ea] px-4 py-16 overflow-x-hidden flex items-center justify-center">
      <div className="max-w-2xl w-full text-center">
        <div className="mb-8">
          <svg
            className="mx-auto w-20 h-20 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>

        <h1 className="text-6xl md:text-4xl font-bold mb-4">
          Subscription Successful!
        </h1>

        <p className="text-gray-600 text-lg mb-2">
          Thank you for subscribing to our premium service.
        </p>

        <p className="text-gray-600 text-base mb-8">
          Your subscription is now active and you have full access to all
          exclusive content and features.
        </p>

        {subscription ? (
          <div className="mb-8 rounded-lg border border-black/10 bg-white/60 px-6 py-4 text-left">
            <h2 className="text-lg font-semibold text-gray-800">
              Active subscription
            </h2>
            <dl className="mt-3 space-y-2 text-sm text-gray-700">
              <div className="flex items-center justify-between">
                <dt className="font-medium">Plan</dt>
                <dd className="text-gray-800">
                  {subscription.plan ?? "Unknown"}
                </dd>
              </div>
              <div className="flex items-center justify-between">
                <dt className="font-medium">Status</dt>
                <dd className="text-gray-800">{subscription.status}</dd>
              </div>
              {periodEnd && (
                <div className="flex items-center justify-between">
                  <dt className="font-medium">Renews on</dt>
                  <dd className="text-gray-800">{periodEnd}</dd>
                </div>
              )}
              {subscription.cancelAtPeriodEnd && (
                <div className="flex items-center justify-between">
                  <dt className="font-medium">Cancellation</dt>
                  <dd className="text-gray-800">
                    Scheduled to end at period end
                  </dd>
                </div>
              )}
            </dl>
          </div>
        ) : (
          <p className="text-gray-600 text-base mb-8">
            We could not find an active subscription yet. This can happen if the
            checkout just completed and webhooks are still processing.
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
