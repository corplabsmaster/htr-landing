"use client";

import { formatDate } from "@/lib/utils";
import { Post } from "@/types/blog";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";

interface BlogCardProps {
  post: Post;
}

export default function BlogCard({ post }: BlogCardProps) {
  const router = useRouter();
  const [isClicked, setIsClicked] = useState(false);

  // Check if banner image exists and is not empty
  const hasBannerImage = !!post.bannerImage && post.bannerImage.trim() !== "";

  // Function to handle navigation with clicked state
  const handleNavigation = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();

      // Set clicked state
      setIsClicked(true);

      // Navigate after a brief delay
      setTimeout(() => {
        router.push(`/blog/${post.slug}`);
      }, 100);
    },
    [post.slug, router]
  );

  return (
    <article
      className={`flex flex-col h-full overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800 transition-all 
      ${
        isClicked
          ? "bg-[#2c5b2d]/5 dark:bg-[#2ae1ac]/5 border-[#2c5b2d]/30 dark:border-[#2ae1ac]/30"
          : "hover:shadow-md"
      }`}
    >
      {hasBannerImage && (
        <div className="relative h-48 w-full overflow-hidden">
          <a href={`/blog/${post.slug}`} onClick={handleNavigation}>
            <img
              src={post.bannerImage}
              alt={post.title}
              className={`h-full w-full object-cover transition-all ${
                isClicked ? "scale-100 opacity-90" : "hover:scale-105"
              }`}
            />
          </a>
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
            <h2 className="text-2xl font-bold tracking-tight">
              <a
                href={`/blog/${post.slug}`}
                onClick={handleNavigation}
                className={`hover:underline inline-block ${
                  isClicked
                    ? "bg-[#2c5b2d]/10 dark:bg-[#2ae1ac]/10 text-[#2c5b2d]/70 dark:text-[#2ae1ac]/70 cursor-wait rounded"
                    : "text-[#2c5b2d] dark:text-[#2ae1ac]"
                }`}
              >
                {post.seoTitle || post.title}
              </a>
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
          <p
            className={`${
              isClicked
                ? "text-gray-500 dark:text-gray-500"
                : "text-gray-700 dark:text-gray-300"
            }`}
          >
            {post.excerpt}
          </p>
        </div>
      </div>
      <div className="p-6 pt-0">
        <a
          href={`/blog/${post.slug}`}
          onClick={handleNavigation}
          className={`inline-flex items-center text-sm font-medium ${
            isClicked
              ? "cursor-wait"
              : "text-blue-600 hover:underline dark:text-blue-400"
          }`}
        >
          {isClicked ? (
            <span className="text-gray-300 dark:text-gray-500">loading...</span>
          ) : (
            <>
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
            </>
          )}
        </a>
      </div>
    </article>
  );
}
