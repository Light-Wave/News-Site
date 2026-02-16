import { TrendsChart, TopArticles } from "@/components/dashboard/Charts";
import { NewsStats } from "@/components/dashboard/StatCards";
import { UserModeration } from "@/components/dashboard/UserModeration";
import { ContentPerformance } from "@/components/dashboard/ContentPerformance";
import { getDashboardData } from "@/actions/data";

export default async function DashboardPage() {
  const { statsData, latestArticles, topArticles, users } =
    await getDashboardData();

  return (
    <div className="space-y-6 w-full p-6">
      <NewsStats stats={statsData} />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <TrendsChart />
          <TopArticles articles={topArticles} />
        </div>

        <div className="lg:col-span-3 space-y-6">
          <UserModeration users={users} />
          <ContentPerformance articles={latestArticles} />
        </div>
      </div>
    </div>
  );
}
