"use client";

import { getRelatedPosts } from "@/lib/blog-utils";
import { Post } from "@/types/blog";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

interface RelatedPostsProps {
  currentPost: Post;
  allPosts: Post[];
  limit?: number;
  excludePosts?: Post[]; // Add option to exclude additional posts
}

export default function RelatedPosts({
  currentPost,
  allPosts,
  limit = 3,
  excludePosts = [],
}: RelatedPostsProps) {
  const router = useRouter();
  const [relatedPosts, setRelatedPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  // Track which post is clicked
  const [clickedPostId, setClickedPostId] = useState<string | null>(null);

  useEffect(() => {
    // Simulate loading delay to show the loading state
    const timer = setTimeout(() => {
      console.log("Current post:", currentPost.slug);
      console.log(
        "Excluded posts:",
        excludePosts.map((p) => p.slug)
      );

      // Get related posts, ensuring we don't repeat posts
      const posts = getRelatedPosts(currentPost, allPosts, limit, excludePosts);

      console.log(
        "Initial related posts:",
        posts.map((p) => p.slug)
      );

      // Further ensure uniqueness by slug (in case there are duplicates with different IDs)
      const uniquePosts: Post[] = [];
      const slugSet = new Set<string>([currentPost.slug]); // Add current post slug to exclude set

      // Add excluded posts' slugs to the set
      excludePosts.forEach((post) => {
        slugSet.add(post.slug);
      });

      console.log("Excluded slug set:", Array.from(slugSet));

      // Only add posts with unique slugs and not matching the current post
      posts.forEach((post) => {
        if (!slugSet.has(post.slug) && post.slug !== currentPost.slug) {
          slugSet.add(post.slug);
          uniquePosts.push(post);
        } else {
          console.log("Filtered out duplicate/current post:", post.slug);
        }
      });

      console.log(
        "Final related posts:",
        uniquePosts.map((p) => p.slug)
      );

      setRelatedPosts(uniquePosts);
      setLoading(false);
    }, 600); // Small delay to show loading state

    return () => clearTimeout(timer);
  }, [currentPost, allPosts, limit, excludePosts]);

  // Function to handle navigation with clicked state
  const handleNavigation = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, postId: string, slug: string) => {
      e.preventDefault();

      // Set clicked state for this post
      setClickedPostId(postId);

      // Navigate after a brief delay
      setTimeout(() => {
        router.push(`/blog/${slug}`);
      }, 100);
    },
    [router]
  );

  if (loading) {
    return (
      <div className="mt-16 py-8 border-t border-gray-200 dark:border-gray-800">
        <h3 className="text-l font-normal mb-6 text-gray-300 dark:text-gray-300">
          Related Articles
        </h3>
        <div className="grid gap-8 md:grid-cols-3">
          {[...Array(limit)].map((_, index) => (
            <div key={index} className="flex flex-col animate-fade-in-out">
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
      <div className="grid gap-8 md:grid-cols-3 ">
        {relatedPosts.map((post) => {
          const isClicked = clickedPostId === post.id;

          return (
            <div
              key={post.id}
              className={`flex flex-col rounded-lg overflow-hidden transition-colors p-2 ${
                isClicked ? "bg-[#2c5b2d]/5 dark:bg-lake-500/5" : ""
              }`}
            >
              {post.bannerImage && (
                <a
                  href={`/blog/${post.slug}`}
                  onClick={(e) => handleNavigation(e, post.id, post.slug)}
                  className="block mb-3"
                >
                  <div className="aspect-video rounded-lg overflow-hidden">
                    <img
                      src={post.bannerImage}
                      alt={post.title}
                      className={`w-full h-full object-cover transition-all ${
                        isClicked ? "scale-100 opacity-90" : "hover:scale-105"
                      }`}
                    />
                  </div>
                </a>
              )}
              <h4 className="font-semibold text-lg mb-1">
                <a
                  href={`/blog/${post.slug}`}
                  onClick={(e) => handleNavigation(e, post.id, post.slug)}
                  className={`hover:underline inline-block ${
                    isClicked
                      ? "text-[#2c5b2d]/70 dark:text-lake-500/70 cursor-wait rounded"
                      : "text-[#2c5b2d] dark:text-lake-500"
                  }`}
                >
                  {post.title}
                </a>
              </h4>
              <p
                className={`text-sm ${
                  isClicked
                    ? "text-gray-500 dark:text-gray-500"
                    : "text-gray-600 dark:text-gray-400"
                } line-clamp-2`}
              >
                {post.excerpt}
              </p>
              {isClicked && (
                <p className="text-gray-300 dark:text-gray-500 text-sm mt-2 cursor-wait animate-fade-in-out">
                  loading...
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
