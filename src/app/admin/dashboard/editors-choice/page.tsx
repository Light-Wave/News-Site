import { getAllArticles } from "@/actions/article";
import { redirectControl } from "@/actions/server-utils";
import prisma from "@/lib/prisma";
import EditorsChoiceForm from "./EditorsChoiceForm";

export default async function EditorsChoicePage() {
  await redirectControl(["admin", "editor"], "/admin/dashboard");
  const result = await getAllArticles();

  if (!result.success) {
    return <div className="p-6 text-red-600">{result.message}</div>;
  }

  const currentEditorsChoice = await prisma.editorsChoice.findFirst({
    include: {
      article: true,
    },
  });

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Editor's Choice</h1>

      <EditorsChoiceForm
        articles={result.articles}
        currentEditorsChoice={currentEditorsChoice}
      />
    </div>
  );
}
