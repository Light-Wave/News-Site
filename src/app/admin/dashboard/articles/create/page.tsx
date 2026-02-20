import { redirectControl } from "@/actions/server-utils";
import CreateArticlePage from "@/components/create-article/page";

export default async function Page() {
  await redirectControl(["admin", "writer"], "/admin/dashboard");
  return <CreateArticlePage />;
}
