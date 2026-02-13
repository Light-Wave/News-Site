"use client";

import { Switch } from "@/components/ui/switch";
import { ArticleModel } from "@/generated/prisma/models";

type ArticleData = (Pick<
  ArticleModel,
  "id" | "headline" | "views" | "isActive"
> & { categories: { name: string }[] })[];

export function ContentPerformance({ articles }: { articles: ArticleData }) {
  function toggleArticleStatus(id: any, isActive: any): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
      <div className="flex justify-between items-center mb-5">
        <h3 className="font-bold text-slate-800 text-sm">
          Content Performance
        </h3>
        <div className="flex gap-15 text-[10px] font-black text-slate-400 uppercase">
          <span>Views</span>
          <span>Status</span>
          <span>Action</span>
        </div>
      </div>
      <div className="space-y-3">
        {articles.map((art) => (
          <div
            key={art.id}
            className="flex justify-between items-center pb-3 border-b border-slate-50 last:border-0"
          >
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-slate-700 truncate">
                {art.headline}
              </p>
              <p className="text-[10px] text-slate-400 font-bold">
                {art.categories
                  .map((c) => c.name)
                  .filter(Boolean)
                  .join(", ")}
              </p>
            </div>
            <div className="flex items-center gap-8">
              <span className="text-xs font-bold text-slate-600 w-10 text-right">
                {art.views}
              </span>
              <Switch
                checked={art.isActive}
                onCheckedChange={(checked) =>
                  toggleArticleStatus(art.id, checked)
                }
              />
              <button className="bg-blue-600 text-white px-2 py-1 rounded text-[10px] font-bold">
                EDIT
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
