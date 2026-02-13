import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { getAllCategories } from "@/actions/category";
import CreateArticleForm from "@/components/create-article/CreateArticleForm";

//TODO: Move to correct place
export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const categories = await getAllCategories();

  return (
    <CreateArticleForm
      userId={session?.user?.id ?? ""}
      categories={categories}
    />
  );
}
