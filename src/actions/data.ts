import prisma from "@/lib/prisma";

export async function getDashboardData() {
  try {
    const [
      userCount,
      articleStats,
      latestArticles,
      topArticles,
      users,
      // Change: Aggregate revenue and count instead of findMany
      subscriptionStats,
    ] = await Promise.all([
      prisma.user.count({ where: { banned: false } }),
      prisma.article.aggregate({ _sum: { views: true }, _count: true }),
      prisma.article.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          headline: true,
          views: true,
          isActive: true,
          categories: { select: { name: true } },
        },
      }),
      prisma.article.findMany({
        take: 2,
        orderBy: { views: "desc" },
        select: { id: true, headline: true, views: true },
      }),
      prisma.user.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        select: { id: true, name: true, email: true, role: true, banned: true },
      }),

      prisma.subscription.aggregate({
        _count: true,
      }),
    ]);

    const totalRevenue = 0; // Replace with aggregate result once schema is updated

    const statsData = {
      revenue: totalRevenue,
      users: userCount,
      views: articleStats._sum.views || 0,
      conversion:
        userCount > 0
          ? ((subscriptionStats._count / userCount) * 100).toFixed(1)
          : "0.0",
    };

    return {
      statsData,
      latestArticles,
      topArticles,
      users,
    };
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch dashboard data.");
  }
}
