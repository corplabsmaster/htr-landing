"use client";

import { getRelatedPosts } from "@/lib/blog-utils";
import { Post } from "@/types/blog";
import Link from "next/link";
import { useEffect, useState } from "react";

interface RelatedPostsProps {
  currentPost: Post;
  allPosts: Post[];
  limit?: number;
}

export default function RelatedPosts({
  currentPost,
  allPosts,
  limit = 3,
}: RelatedPostsProps) {
  const [relatedPosts, setRelatedPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay to show the loading state
    const timer = setTimeout(() => {
      const posts = getRelatedPosts(currentPost, allPosts, limit);
      setRelatedPosts(posts);
      setLoading(false);
    }, 600); // Small delay to show loading state

    return () => clearTimeout(timer);
  }, [currentPost, allPosts, limit]);

  if (loading) {
    return (
      <div className="mt-16 py-8 border-t border-gray-200 dark:border-gray-800">
        <h3 className="text-l font-normal mb-6 text-gray-300 dark:text-gray-300">
          Related Articles
        </h3>
        <div className="grid gap-8 md:grid-cols-3">
          {[...Array(limit)].map((_, index) => (
            <div key={index} className="flex flex-col animate-pulse">
              <div className="aspect-video rounded-lg bg-gray-200 dark:bg-gray-700 mb-3"></div>
              <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6 mt-1"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (relatedPosts.length === 0) return null;

  return (
    <div className="mt-16 py-8 border-t border-gray-200 dark:border-gray-800">
      <h3 className="text-l font-normal mb-6 text-gray-300 dark:text-gray-300">
        Related Articles
      </h3>
      <div className="grid gap-8 md:grid-cols-3">
        {relatedPosts.map((post) => (
          <div key={post.id} className="flex flex-col">
            {post.bannerImage && (
              <Link href={`/blog/${post.slug}`} className="block mb-3">
                <div className="aspect-video rounded-lg overflow-hidden">
                  <img
                    src={post.bannerImage}
                    alt={post.title}
                    className="w-full h-full object-cover transition-all hover:scale-105"
                  />
                </div>
              </Link>
            )}
            <h4 className="font-semibold text-lg mb-1">
              <Link
                href={`/blog/${post.slug}`}
                className="hover:underline text-[#2c5b2d] dark:text-[#2ae1ac]"
              >
                {post.title}
              </Link>
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
              {post.excerpt}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
