import Header from "@/components/header";
import Footer from "@/components/footer";
import { getAllCategories } from "@/types/categories";
import { NotFoundContent } from "@/components/layout/notFoundContent";

export default async function NotFound() {
  const categories = await getAllCategories();

  return (
    <div className="bg-[var(--wood-darkest)] flex-1 flex flex-col min-h-screen">
      <Header categories={categories} />
      <main className="flex-1 w-full max-w-7xl m-auto flex items-center justify-center">
        <NotFoundContent />
      </main>
      <Footer />
    </div>
  );
}
