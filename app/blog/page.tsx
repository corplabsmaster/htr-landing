import BlogContent from "@/app/components/blog/blog-content";
import { getBlogPosts, getCategories } from "@/lib/notion";
import { Metadata } from "next";
import { Suspense } from "react";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "HiTerra AI | Agritech Insights and Resources",
  description:
    "Latest insights, research, and updates about smart farming AI solutions and sustainable agriculture practices.",
  openGraph: {
    title: "HiTerra AI | Agritech Insights and Resources",
    description:
      "Latest insights, research, and updates about smart farming AI solutions and sustainable agriculture practices.",
    type: "website",
    images: [
      {
        url: "/images/high-angle-farmland-view.jpg",
        width: 1200,
        height: 630,
        alt: "HiTerra Agritech Insights",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HiTerra AI | Agritech Insights",
    description:
      "Latest insights, research, and updates about smart farming AI solutions and sustainable agriculture practices.",
    images: ["/images/high-angle-farmland-view.jpg"],
  },
  alternates: {
    canonical: "/blog",
  },
};

function LoadingState() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="flex flex-col items-center animate-fadeIn">
        <div className="relative">
          <div className="w-16 h-16 border-4 border-t-primary border-r-transparent border-b-primary border-l-transparent rounded-full animate-spin"></div>
          <div className="absolute inset-0 w-16 h-16 border-4 border-t-transparent border-r-primary border-b-transparent border-l-primary rounded-full animate-spinReverse opacity-70"></div>
        </div>
        <p className="text-gray-600 dark:text-gray-400 font-medium mt-4 animate-spinnerPulse">
          Loading blog posts...
        </p>
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
  // Await searchParams before using it
  const params = await searchParams;
  const selectedCategory = params?.category || null;

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
      return <ErrorState message="Ops, No blog posts found in our database" />;
    }

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
