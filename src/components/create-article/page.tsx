import { getAllCategories } from "@/actions/category";
import CreateArticleForm from "@/components/create-article/CreateArticleForm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

// Reusable component for the create-article page (not a Next.js route)
// TODO: Decide where to put it
export default async function CreateArticlePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return (
      <div>
        <p>You must be signed in to create an article.</p>
      </div>
    );
  }
  
  const categories = await getAllCategories();
  return <CreateArticleForm categories={categories} />;
}
