import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";

const noiseSvg = `data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.4'/%3E%3C/svg%3E`;

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
    <div className="min-h-screen bg-[#f5eccb] px-4 py-16 overflow-x-hidden flex items-center justify-center relative">
      {/* Subtle radial gradient for depth */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(139,90,43,0.05)_100%)] pointer-events-none" />

      {/* Parchment texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{ backgroundImage: `url("${noiseSvg}")` }}
      />

      <div className="max-w-2xl w-full relative z-10">
        {/* Themed success icon */}
        <div className="mb-8 flex justify-center">
          <div className="w-20 h-20 rounded-full flex items-center justify-center border-2 border-amber-600/60 bg-gradient-to-br from-amber-100 to-amber-200/80 shadow-[0_0_20px_rgba(184,134,11,0.25)]">
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
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>

        {/* Parchment card container */}
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
              <span className="text-inlaid-gold">The Pact is Sealed!</span>
            </h1>

            <p className="text-amber-900/80 text-lg mb-2">
              Thank you for joining the Arcane Circle, brave adventurer.
            </p>

            <p className="text-amber-800/70 text-base mb-8">
              Your subscription enchantment is now active. You have been granted
              full access to all exclusive chronicles and mystical features.
            </p>

            {subscription ? (
              <div className="mb-8 rounded-lg border border-amber-700/30 bg-amber-50/60 px-6 py-4 text-left">
                <h2 className="text-lg font-semibold text-amber-900">
                  Active Enchantment
                </h2>
                <dl className="mt-3 space-y-2 text-sm text-amber-900/80">
                  <div className="flex items-center justify-between">
                    <dt className="font-medium">Plan</dt>
                    <dd className="text-amber-900 capitalize">
                      {subscription.plan ?? "Unknown"}
                    </dd>
                  </div>
                  <div className="h-px bg-amber-700/10" />
                  <div className="flex items-center justify-between">
                    <dt className="font-medium">Status</dt>
                    <dd className="text-amber-900 capitalize">{subscription.status}</dd>
                  </div>
                  {periodEnd && (
                    <>
                      <div className="h-px bg-amber-700/10" />
                      <div className="flex items-center justify-between">
                        <dt className="font-medium">Renews on</dt>
                        <dd className="text-amber-900">{periodEnd}</dd>
                      </div>
                    </>
                  )}
                  {subscription.cancelAtPeriodEnd && (
                    <>
                      <div className="h-px bg-amber-700/10" />
                      <div className="flex items-center justify-between">
                        <dt className="font-medium">Cancellation</dt>
                        <dd className="text-amber-900">
                          Scheduled to end at period end
                        </dd>
                      </div>
                    </>
                  )}
                </dl>
              </div>
            ) : (
              <p className="text-amber-800/70 text-base mb-8 italic">
                The enchantment scrolls are still being processed. If your
                subscription details do not appear shortly, the ravens may still
                be in flight.
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
