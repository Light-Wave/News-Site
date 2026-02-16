import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export function TrendsChart() {
  return (
    <Card className="bg-white border-slate-200">
      <CardHeader>
        <CardTitle className="text-sm font-bold text-slate-700">
          Subscription Trends
        </CardTitle>
      </CardHeader>
      <CardContent className="h-40 flex items-end justify-between gap-1">
        {[30, 45, 60, 20, 90, 55].map((h, i) => (
          <div
            key={i}
            className="w-full bg-blue-500 rounded-t"
            style={{ height: `${h}%` }}
          />
        ))}
      </CardContent>
    </Card>
  );
}

interface TopArticle {
  id: string;
  headline: string;
  views: number;
}

// Use the interface in props
export function TopArticles({ articles }: { articles: TopArticle[] }) {
  return (
    <Card className="bg-white border-slate-200">
      <CardHeader>
        <CardTitle className="text-sm font-bold text-slate-700">
          Top Articles
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {articles.map((art, i) => (
          <div
            key={art.id}
            className="text-sm border-b border-slate-50 pb-2 last:border-0"
          >
            <p className="text-slate-700 font-medium">
              {i + 1}. {art.headline}
            </p>
            <p className="text-slate-400 text-xs">
              {/* Now TS knows for sure views is a number */}
              {art.views.toLocaleString()} views
            </p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
