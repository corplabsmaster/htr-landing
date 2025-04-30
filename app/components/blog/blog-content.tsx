"use client";

import { filterPostsByCategory } from "@/lib/blog-utils";
import { BlogContentProps } from "@/types/blog";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Container from "../ui/container";
import BlogCard from "./blog-card";
import CategoryFilter from "./category-filter";

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
  const filteredPosts = filterPostsByCategory(initialPosts, selectedCategory);

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
        <Container>
          <div className="space-y-4 text-center">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-[#2c5b2d] dark:text-[#2ae1ac]">
              Insights
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-700 dark:text-gray-300 md:text-xl">
              Insights, updates, and stories about sustainable agriculture and
              smart farming solutions.
            </p>
          </div>
        </Container>
      </section>

      <section className="py-8 md:py-12 lg:py-16">
        <Container>
          {/* Category filters */}
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onCategorySelect={handleCategorySelect}
          />

          {filteredPosts.length > 0 ? (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
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
        </Container>
      </section>

      {/* Extra bottom spacing for desktop only */}
      <div className="hidden md:block h-16 lg:h-24"></div>
    </>
  );
}
