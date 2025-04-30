"use client";

import { formatDate } from "@/lib/utils";
import { Post } from "@/types/blog";
import Link from "next/link";

interface BlogCardProps {
  post: Post;
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="flex flex-col h-full overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800 transition-all hover:shadow-md">
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
              <Link href={`/blog/${post.slug}`} className="hover:underline">
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
          <p className="text-gray-700 dark:text-gray-300">{post.excerpt}</p>
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
  );
}
