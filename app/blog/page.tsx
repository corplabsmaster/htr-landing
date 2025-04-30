import BlogContent from "@/app/components/blog/blog-content";
import { getBlogPosts, getCategories } from "@/lib/notion";
import { Suspense } from "react";

export const revalidate = 3600;

function LoadingState() {
  return (
    <div className="min-h-[60vh] flex flex-col justify-center items-center py-20">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#2c5b2d] dark:border-[#2ae1ac]"></div>
      <p className="mt-4 text-gray-500 dark:text-gray-400">
        Loading insights...
      </p>

      {/* Skeleton loaders for content */}
      <div className="container px-4 md:px-6 mt-8 max-w-screen-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="animate-pulse flex flex-col h-full overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800"
            >
              <div className="bg-gray-200 dark:bg-gray-700 h-48 w-full"></div>
              <div className="p-6 flex-1">
                <div className="space-y-4">
                  <div className="flex gap-2">
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
                    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
                  </div>
                  <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  // Fetch data server-side
  const [posts, categories] = await Promise.all([
    getBlogPosts(),
    getCategories(),
  ]);

  const selectedCategory = searchParams.category || null;

  // Pre-filter posts server-side based on URL params
  // Ensure we're filtering on non-null posts
  const filteredPosts = posts
    .filter((post) => post !== null)
    .filter(
      (post) =>
        !selectedCategory ||
        post.categories.some((cat: any) => cat.name === selectedCategory)
    );

  return (
    <Suspense fallback={<LoadingState />}>
      <BlogContent
        initialPosts={filteredPosts}
        categories={categories}
        initialCategory={selectedCategory}
      />
    </Suspense>
  );
}
