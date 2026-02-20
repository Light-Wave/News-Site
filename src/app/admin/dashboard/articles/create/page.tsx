import { getAllCategories } from "@/actions/category";
import { redirectControl } from "@/actions/server-utils";
import CreateArticleForm from "@/components/create-article/CreateArticleForm";

export default async function Page() {
  await redirectControl(["admin", "writer"], "/admin/dashboard");

  const categories = await getAllCategories();
  return <CreateArticleForm categories={categories} />;
}
