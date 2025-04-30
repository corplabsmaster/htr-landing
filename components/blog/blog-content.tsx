"use client";

import { formatDate } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Category {
  id: string;
  name: string;
  color: string;
}

interface Post {
  id: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  published: string;
  slug: string;
  excerpt: string;
  bannerImage: string;
  authorName: string;
  authorImage?: string;
  authorRole?: string;
  categories: Category[];
}

interface BlogContentProps {
  initialPosts: Post[];
  categories: Category[];
  initialCategory: string | null;
}

export default function BlogContent({
  initialPosts,
  categories,
  initialCategory,
}: BlogContentProps) {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    initialCategory
  );

  // Filter posts client-side for instantaneous UI updates
  const filteredPosts = selectedCategory
    ? initialPosts.filter((post) =>
        post.categories.some((cat) => cat.name === selectedCategory)
      )
    : initialPosts;

  // Handle category selection with instant UI update and URL update
  const handleCategorySelect = (category: string | null) => {
    setSelectedCategory(category);

    // Update URL
    if (category) {
      router.push(`/blog?category=${encodeURIComponent(category)}`, {
        scroll: false,
      });
    } else {
      router.push("/blog", { scroll: false });
    }
  };

  return (
    <>
      <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-b from-lime-300 to-white dark:from-blue-900 dark:to-gray-950">
        <div className="container px-4 md:px-6">
          <div className="space-y-4 text-center">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-[#2c5b2d] dark:text-[#2ae1ac]">
              Insights
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-700 dark:text-gray-300 md:text-xl">
              Insights, updates, and stories about sustainable agriculture and
              smart farming solutions.
            </p>
          </div>
        </div>
      </section>

      <section className="py-8 md:py-12 lg:py-16">
        <div className="container px-4 md:px-6">
          {/* Category filters */}
          {categories.length > 0 && (
            <div className="mb-10">
              <div className="flex flex-wrap gap-2 justify-center">
                <button
                  onClick={() => handleCategorySelect(null)}
                  className={`px-4 py-2 rounded-full text-sm font-medium ${
                    selectedCategory === null
                      ? "bg-[#2c5b2d] text-white dark:bg-[#2ae1ac] dark:text-gray-900"
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                  }`}
                >
                  All
                </button>
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategorySelect(category.name)}
                    className={`px-4 py-2 rounded-full text-sm font-medium ${
                      selectedCategory === category.name
                        ? "bg-[#2c5b2d] text-white dark:bg-[#2ae1ac] dark:text-gray-900"
                        : "bg-gray-100 text-gray-800 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          {filteredPosts.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredPosts.map((post) => (
                <article
                  key={post.id}
                  className="flex flex-col h-full overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800 transition-all hover:shadow-md"
                >
                  {post.bannerImage && (
                    <div className="relative h-48 w-full overflow-hidden">
                      <img
                        src={post.bannerImage}
                        alt={post.title}
                        className="h-full w-full object-cover transition-all hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="flex-1 p-6">
                    <div className="space-y-4">
                      {post.categories.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {post.categories.map((category) => (
                            <span
                              key={category.id}
                              className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-[#2c5b2d]/10 text-[#2c5b2d] dark:bg-[#2ae1ac]/10 dark:text-[#2ae1ac]"
                            >
                              {category.name}
                            </span>
                          ))}
                        </div>
                      )}
                      <div className="space-y-2">
                        <h2 className="text-2xl font-bold tracking-tight text-[#2c5b2d] dark:text-[#2ae1ac]">
                          <Link
                            href={`/blog/${post.slug}`}
                            className="hover:underline"
                          >
                            {post.seoTitle || post.title}
                          </Link>
                        </h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                          {post.authorName && (
                            <span className="font-medium text-[#2c5b2d] dark:text-[#2ae1ac]">
                              {post.authorName}
                            </span>
                          )}
                          {post.authorName && post.published && (
                            <span className="mx-2">•</span>
                          )}
                          {post.published && formatDate(post.published)}
                        </p>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300">
                        {post.excerpt}
                      </p>
                    </div>
                  </div>
                  <div className="p-6 pt-0">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
                    >
                      Read more
                      <svg
                        className="ml-1 h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100">
                No posts found
              </h3>
              <p className="mt-2 text-gray-600 dark:text-gray-400">
                {selectedCategory
                  ? `No posts found in the category "${selectedCategory}"`
                  : "Check back soon for new content!"}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Extra bottom spacing for desktop only */}
      <div className="hidden md:block h-16 lg:h-24"></div>
    </>
  );
}
