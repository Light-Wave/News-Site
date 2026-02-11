import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DashboardStats {
  revenue: number;
  users: number;
  views: number;
  conversion: string | number;
}

export function NewsStats({ stats }: { stats: DashboardStats }) {
  const cards = [
    { label: "Total Revenue", value: `$${stats.revenue.toLocaleString()}` },
    { label: "Active Readers", value: stats.users.toLocaleString() },
    { label: "Article Views", value: stats.views.toLocaleString() },
    { label: "Conversion Rate", value: `${stats.conversion}%` },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((c) => (
        <Card key={c.label} className="bg-white border-slate-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-xs font-bold text-slate-500 uppercase">
              {c.label}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">{c.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
