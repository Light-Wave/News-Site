import { TrendsChart } from "@/components/dashboard/Charts";
import { NewsStats } from "@/components/dashboard/StatCards";
import { TopArticles } from "@/components/dashboard/Charts";
import { UserModeration } from "@/components/dashboard/UserModeration";
import { ContentPerformance } from "@/components/dashboard/ContentPerformance";
import prisma from "@/lib/prisma";

export default async function DashboardPage() {
  //  Fetch data for Stats and Tables
  const [
    userCount,
    articleStats,
    latestArticles,
    topArticles,
    users,
    subscriptions,
  ] = await Promise.all([
    prisma.user.count({ where: { banned: false } }), // Active Readers
    prisma.article.aggregate({ _sum: { views: true }, _count: true }), // Total Views
    prisma.article.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      include: { category: true },
    }),
    prisma.article.findMany({ take: 2, orderBy: { views: "desc" } }), // Top Articles Sidebar
    prisma.user.findMany({ take: 5, orderBy: { createdAt: "desc" } }), // Moderation Table
    prisma.subscription.findMany({ include: { subscriptionType: true } }), // For Revenue calculation
  ]);

  //  Calculate Revenue (Sum of all subscription prices)
  const totalRevenue = subscriptions.reduce(
    (acc, sub) => acc + (sub.subscriptionType.price || 0),
    0,
  );

  //  Prepare data for components
  const statsData = {
    revenue: totalRevenue,
    users: userCount,
    views: articleStats._sum.views || 0,
    conversion:
      userCount > 0 ? ((subscriptions.length / userCount) * 100).toFixed(1) : 0,
  };

  return (
    <div className="p-4 md:p-8 space-y-6 bg-[#f8fafc] min-h-screen text-slate-900">
      <NewsStats stats={statsData} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <TrendsChart />
          <TopArticles articles={topArticles} />
        </div>
        <div className="lg:col-span-2 space-y-6">
          <UserModeration users={users} />
          <ContentPerformance articles={latestArticles} />
        </div>
      </div>
    </div>
  );
}
