import { Category, Post } from "@/types/blog";

/**
 * Filters posts by category name
 */
export function filterPostsByCategory(
  posts: Post[],
  categoryName: string | null
): Post[] {
  if (!categoryName) return posts;

  return posts.filter((post) =>
    post.categories.some((category) => category.name === categoryName)
  );
}

/**
 * Gets all unique categories from a list of posts
 */
export function getUniqueCategories(posts: Post[]): Category[] {
  const categoriesMap = new Map<string, Category>();

  posts.forEach((post) => {
    post.categories.forEach((category) => {
      if (!categoriesMap.has(category.id)) {
        categoriesMap.set(category.id, category);
      }
    });
  });

  return Array.from(categoriesMap.values());
}

/**
 * Gets related posts based on categories
 */
export function getRelatedPosts(
  currentPost: Post,
  allPosts: Post[],
  limit: number = 3
): Post[] {
  // Don't include the current post
  const otherPosts = allPosts.filter((post) => post.id !== currentPost.id);

  // Get category IDs from the current post
  const categoryIds = new Set(currentPost.categories.map((cat) => cat.id));

  // Score posts by how many matching categories they have
  const scoredPosts = otherPosts.map((post) => {
    const matchingCategories = post.categories.filter((cat) =>
      categoryIds.has(cat.id)
    );
    return {
      post,
      score: matchingCategories.length,
    };
  });

  // Sort by score (highest first) and take the top 'limit' posts
  return scoredPosts
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.post);
}
