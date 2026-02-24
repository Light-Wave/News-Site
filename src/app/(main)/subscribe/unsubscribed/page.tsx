import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";

const noiseSvg = `data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.4'/%3E%3C/svg%3E`;

export default async function UnsubscribedPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return (
      <div className="min-h-screen bg-[#f5eccb] px-4 py-16 overflow-x-hidden flex items-center justify-center relative">
        {/* Subtle radial gradient for depth */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(139,90,43,0.05)_100%)] pointer-events-none" />

        {/* Parchment texture overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{ backgroundImage: `url("${noiseSvg}")` }}
        />

        <div className="max-w-2xl w-full relative z-10">
          {/* Themed warning icon */}
          <div className="mb-8 flex justify-center">
            <div className="w-20 h-20 rounded-full flex items-center justify-center border-2 border-red-800/40 bg-gradient-to-br from-red-100 to-red-200/60 shadow-[0_0_20px_rgba(153,27,27,0.15)]">
              <svg
                className="w-10 h-10 text-red-800/80"
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
          </div>

          {/* Parchment card */}
          <div
            className="relative overflow-hidden rounded-lg border-2 border-amber-800/40 p-8 sm:p-10 text-center"
            style={{
              background:
                "linear-gradient(135deg, #f4e4bc 0%, #f8f0dc 50%, #e8d5a3 100%)",
            }}
          >
            {/* Decorative inset border */}
            <div className="absolute inset-3 border border-amber-700/15 rounded pointer-events-none" />

            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-amber-700/40" />
            <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-amber-700/40" />
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-amber-700/40" />
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-amber-700/40" />

            <div className="relative z-10">
              <h1 className="text-3xl sm:text-4xl font-bold mb-4">
                <span className="text-inlaid-gold">Identity Unknown</span>
              </h1>
              <p className="text-amber-800/70 text-base mb-8">
                The crystal ball cannot identify your presence. Please sign in
                to view your subscription status.
              </p>
              <Link
                href="/sign-in"
                className="magic-button-gold inline-block px-8 py-3 rounded-md font-bold transition-all duration-300 hover:scale-[1.02]"
              >
                Sign In
              </Link>
            </div>
          </div>
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
      <div className="min-h-screen bg-[#f5eccb] px-4 py-16 overflow-x-hidden flex items-center justify-center relative">
        {/* Subtle radial gradient for depth */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(139,90,43,0.05)_100%)] pointer-events-none" />

        {/* Parchment texture overlay */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{ backgroundImage: `url("${noiseSvg}")` }}
        />

        <div className="max-w-2xl w-full relative z-10">
          {/* Themed info icon */}
          <div className="mb-8 flex justify-center">
            <div className="w-20 h-20 rounded-full flex items-center justify-center border-2 border-amber-600/50 bg-gradient-to-br from-amber-100 to-amber-200/60 shadow-[0_0_20px_rgba(184,134,11,0.15)]">
              <svg
                className="w-10 h-10 text-amber-700"
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
          </div>

          {/* Parchment card */}
          <div
            className="relative overflow-hidden rounded-lg border-2 border-amber-800/40 p-8 sm:p-10 text-center"
            style={{
              background:
                "linear-gradient(135deg, #f4e4bc 0%, #f8f0dc 50%, #e8d5a3 100%)",
            }}
          >
            {/* Decorative inset border */}
            <div className="absolute inset-3 border border-amber-700/15 rounded pointer-events-none" />

            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-amber-700/40" />
            <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-amber-700/40" />
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-amber-700/40" />
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-amber-700/40" />

            <div className="relative z-10">
              <h1 className="text-3xl sm:text-4xl font-bold mb-4">
                <span className="text-inlaid-gold">
                  The Pact Has Been Dissolved
                </span>
              </h1>

              <p className="text-amber-900/80 text-lg mb-2">
                Your subscription enchantment has been successfully lifted.
              </p>

              {canceledSubscription.periodEnd && (
                <p className="text-amber-800/70 text-base mb-8">
                  Your arcane privileges shall remain until{" "}
                  <span className="font-semibold text-amber-900">
                    {formatDate(new Date(canceledSubscription.periodEnd))}
                  </span>
                  . Should you wish to rejoin the Circle, you may resubscribe at
                  any time.
                </p>
              )}

              {!canceledSubscription.periodEnd && (
                <p className="text-amber-800/70 text-base mb-8">
                  Your arcane privileges shall remain until the end of your
                  current billing cycle. Should you wish to rejoin the Circle,
                  you may resubscribe at any time.
                </p>
              )}

              <div className="space-y-4">
                <p className="text-amber-800/70 text-sm italic">
                  ✉️ A confirmation raven has been dispatched to your enchanted
                  mailbox.
                </p>

                {/* Decorative divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-amber-700/30 to-transparent" />

                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
                  <Link
                    href="/"
                    className="magic-button-gold px-8 py-3 rounded-md font-bold transition-all duration-300 hover:scale-[1.02] text-center"
                  >
                    Return to the Realm
                  </Link>
                  <Link
                    href="/subscribe"
                    className="magic-button px-8 py-3 rounded-md font-bold transition-all duration-300 hover:scale-[1.02] text-center text-amber-100"
                  >
                    View Plans
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Error state: No subscription or no scheduled cancellation found
  return (
    <div className="min-h-screen bg-[#f5eccb] px-4 py-16 overflow-x-hidden flex items-center justify-center relative">
      {/* Subtle radial gradient for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(139,90,43,0.05)_100%)] pointer-events-none" />

      {/* Parchment texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{ backgroundImage: `url("${noiseSvg}")` }}
      />

      <div className="max-w-2xl w-full relative z-10">
        {/* Themed warning icon */}
        <div className="mb-8 flex justify-center">
          <div className="w-20 h-20 rounded-full flex items-center justify-center border-2 border-red-800/40 bg-gradient-to-br from-red-100 to-red-200/60 shadow-[0_0_20px_rgba(153,27,27,0.15)]">
            <svg
              className="w-10 h-10 text-red-800/80"
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
        </div>

        {/* Parchment card */}
        <div
          className="relative overflow-hidden rounded-lg border-2 border-amber-800/40 p-8 sm:p-10 text-center"
          style={{
            background:
              "linear-gradient(135deg, #f4e4bc 0%, #f8f0dc 50%, #e8d5a3 100%)",
          }}
        >
          {/* Decorative inset border */}
          <div className="absolute inset-3 border border-amber-700/15 rounded pointer-events-none" />

          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-amber-700/40" />
          <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-amber-700/40" />
          <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-amber-700/40" />
          <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-amber-700/40" />

          <div className="relative z-10">
            <h1 className="text-3xl sm:text-4xl font-bold mb-4">
              <span className="text-inlaid-gold">No Enchantment Found</span>
            </h1>
            <p className="text-amber-900/80 text-lg mb-2">
              We could not locate a subscription to dissolve.
            </p>
            <p className="text-amber-800/70 text-base mb-8">
              It appears you do not hold an active enchantment, or no
              cancellation ritual was initiated. If you believe this to be an
              error, please summon our support mages for guidance.
            </p>

            <div className="space-y-4">
              {/* Decorative divider */}
              <div className="h-px bg-gradient-to-r from-transparent via-amber-700/30 to-transparent" />

              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-2">
                <Link
                  href="/"
                  className="magic-button-gold px-8 py-3 rounded-md font-bold transition-all duration-300 hover:scale-[1.02] text-center"
                >
                  Return to the Realm
                </Link>
                <Link
                  href="/subscribe"
                  className="magic-button px-8 py-3 rounded-md font-bold transition-all duration-300 hover:scale-[1.02] text-center text-amber-100"
                >
                  View Plans
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
