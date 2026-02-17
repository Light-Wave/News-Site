import prisma from "@/lib/prisma";

export async function getDashboardData() {
  try {
    const [
      userCount,
      articleStats,
      latestArticles,
      topArticles,
      usersRaw,
      subscriptionStats,
    ] = await Promise.all([
      prisma.user.count({ where: { banned: false } }),

      prisma.article.aggregate({
        _sum: { views: true },
        _count: true,
      }),

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
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          banned: true,
          sessions: {
            orderBy: { updatedAt: "desc" },
            take: 1,
            select: { updatedAt: true },
          },
        },
      }),

      prisma.subscription.aggregate({
        _count: true,
      }),
    ]);

    const formattedUsers = usersRaw.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      banned: user.banned,
      lastActive: user.sessions[0]?.updatedAt ?? null,
    }));

    const totalRevenue = 0;

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
      users: formattedUsers,
    };
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch dashboard data.");
  }
}
