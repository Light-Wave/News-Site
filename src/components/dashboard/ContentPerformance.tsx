"use client";

import { Switch } from "@/components/ui/switch";
import { ArticleModel } from "@/generated/prisma/models";

type ArticleData = (Pick<
  ArticleModel,
  "id" | "headline" | "views" | "isActive"
> & { categories: { name: string }[] })[];

export function ContentPerformance({ articles }: { articles: ArticleData }) {
  function toggleArticleStatus(id: string, checked: boolean): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm w-full max-w-4xl">
      {/* Table Header */}
      <div className="grid grid-cols-12 mb-6 pb-4 border-b border-slate-100 items-center">
        <div className="col-span-7">
          <h3 className="font-serif font-bold text-slate-800 text-lg uppercase tracking-wider">
            Content Performance
          </h3>
        </div>
        <div className="col-span-5 grid grid-cols-3 text-center">
          <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">
            Views
          </span>
          <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">
            Status
          </span>
          <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">
            Action
          </span>
        </div>
      </div>

      {/* Table Body */}
      <div className="flex flex-col gap-6">
        {articles.map((art) => (
          <div key={art.id} className="grid grid-cols-12 items-center group">
            {/* Article Info Section */}
            <div className="col-span-7 pr-8">
              <h4 className=" text-base font-bold text-slate-800 leading-snug group-hover:text-blue-700 transition-colors">
                {art.headline}
              </h4>
              <p className="text-xs text-slate-400 font-sm mt-1">
                {art.categories.map((c) => c.name).join(", ")}
              </p>
            </div>

            {/*  Stats Section (The columns on the right) */}
            <div className="col-span-5 grid grid-cols-3 items-center text-center">
              {/* Views */}
              <span className="font-serif text-slate-600">{art.views}</span>

              {/* Status Switch */}
              <div className="flex justify-center">
                <Switch
                  checked={art.isActive}
                  onCheckedChange={(checked) =>
                    toggleArticleStatus(art.id, checked)
                  }
                  className="scale-90"
                />
              </div>

              {/* Action Button */}
              <div className="flex justify-center">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded text-[10px] font-bold tracking-tighter uppercase transition-all active:scale-95">
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
