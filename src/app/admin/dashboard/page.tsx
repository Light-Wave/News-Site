import { TopArticles, TrendsChart } from "@/components/dashboard/Charts";
import { NewsStats } from "@/components/dashboard/StatCards";
import { UserModeration } from "@/components/dashboard/UserModeration";
import { getDashboardData } from "@/actions/data";
import { getContentPerformance } from "@/actions/data-adminContent";
import { ContentPerformance } from "@/components/dashboard/ContentPerformance";
import { redirectControl } from "@/actions/server-utils";

export default async function DashboardPage() {
  await redirectControl(["admin", "writer", "editor"], "/");
  const articles = await getContentPerformance();
  const { statsData, latestArticles, topArticles, users } =
    await getDashboardData();

  return (
    <div className="space-y-6 w-full p-6">
      <NewsStats stats={statsData} />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <TrendsChart />
          <TopArticles articles={latestArticles} />
        </div>

        <div className="lg:col-span-3 space-y-6">
          <UserModeration users={users ?? []} />
          <ContentPerformance articles={articles} />
        </div>
      </div>
    </div>
  );
}
