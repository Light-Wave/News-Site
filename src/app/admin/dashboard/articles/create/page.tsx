import { getAllCategories } from "@/actions/category";
import { redirectControl } from "@/actions/server-utils";
import CreateArticleForm from "@/components/create-article/CreateArticleForm";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function Page() {
  await redirectControl(["admin", "writer"], "/admin/dashboard");
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
