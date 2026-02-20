"use client";

import { useTransition } from "react"; // Added for smoother UI
import {
  ContentArticle,
  updateArticleStatus,
} from "@/actions/data-adminContent";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner"; // Assuming you use Sonner (common with shadcn)
import Link from "next/link";

type Props = {
  articles: ContentArticle[];
};

export function ContentPerformance({ articles }: Props) {
  const [isPending, startTransition] = useTransition();

  async function toggleArticleStatus(id: string, checked: boolean) {
    // startTransition tells React this is a background update
    startTransition(async () => {
      const result = await updateArticleStatus(id, checked);

      if (result.success) {
        toast.success(checked ? "Article activated" : "Article deactivated");
      } else {
        toast.error("Failed to update status");
      }
    });
  }

  return (
    <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm w-full">
      {/* Table Header */}
      <div className="grid grid-cols-12 mb-6 pb-4 border-b border-slate-100 items-center">
        <div className="col-span-7">
          <h3 className=" font-bold text-slate-800 text-md uppercase tracking-wider">
            Content Performance
          </h3>
        </div>
        <div className="col-span-5 grid grid-cols-3 text-center">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            Views
          </span>
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            Status
          </span>
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            Action
          </span>
        </div>
      </div>

      {/* Table Body */}
      <div className="flex flex-col gap-6">
        {articles.map((art) => (
          <div
            key={art.id}
            className={`grid grid-cols-12 items-center transition-opacity ${isPending ? "opacity-50" : "opacity-100"}`}
          >
            <div className="col-span-7 pr-8">
              <h4 className=" font-bold text-slate-800">{art.headline}</h4>
              <p className="text-xs text-slate-400 mt-1">
                {art.categories.map((c) => c.name).join(", ")}
              </p>
            </div>

            <div className="col-span-5 grid grid-cols-3 items-center text-center">
              <span className="font-mono text-sm">{art.views}</span>

              <div className="flex justify-center">
                <Switch
                  checked={art.isActive}
                  disabled={isPending} // Disable while saving
                  onCheckedChange={(checked) =>
                    toggleArticleStatus(art.id, checked)
                  }
                />
              </div>

              <div className="flex justify-center">
                <Link
                  href={`/admin/dashboard/articles/${art.id}`}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded text-xs font-bold uppercase"
                >
                  Edit
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
