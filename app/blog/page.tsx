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

function ErrorState({ message }: { message: string }) {
  return (
    <div className="min-h-[60vh] flex flex-col justify-center items-center py-20">
      <div className="rounded-full h-12 w-12 bg-red-100 dark:bg-red-900 flex items-center justify-center mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-red-600 dark:text-red-300"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
          />
        </svg>
      </div>
      <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
        Unable to load blog posts
      </h2>
      <p className="text-gray-600 dark:text-gray-400 text-center max-w-md mb-6">
        {message}
      </p>
      <p className="text-sm text-gray-500 dark:text-gray-500">
        Please check your Notion API configuration or try again later.
      </p>
    </div>
  );
}

export default async function BlogPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  // Fetch data server-side
  try {
    const [posts, categories] = await Promise.all([
      getBlogPosts(),
      getCategories(),
    ]);

    // Check if we have valid data
    if (!Array.isArray(posts) || !Array.isArray(categories)) {
      console.error("Invalid data format from Notion API", {
        posts,
        categories,
      });
      return (
        <ErrorState message="The data returned from Notion has an invalid format." />
      );
    }

    // Check if we have any posts (even if they're filtered out)
    if (posts.length === 0) {
      return (
        <ErrorState message="No blog posts found in your Notion database. Make sure your database contains published articles." />
      );
    }

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
  } catch (error) {
    console.error("Error fetching blog data:", error);
    let errorMessage = "There was an error connecting to Notion.";

    if (error instanceof Error) {
      if (error.message.includes("API key")) {
        errorMessage = "Notion API key is missing or invalid.";
      } else if (
        error.message.includes("database") ||
        error.message.includes("Database")
      ) {
        errorMessage = "Notion database ID is missing or invalid.";
      } else if (
        error.message.includes("timeout") ||
        error.message.includes("ETIMEDOUT")
      ) {
        errorMessage =
          "Connection to Notion timed out. Please try again later.";
      } else if (
        error.message.includes("permission") ||
        error.message.includes("access")
      ) {
        errorMessage =
          "Your Notion integration lacks permission to access this database.";
      }
    }

    return <ErrorState message={errorMessage} />;
  }
}
