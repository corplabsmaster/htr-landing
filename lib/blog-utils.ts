import { Category, Post } from "@/types/blog";

/**
 * Filters posts by category name
 */
export function filterPostsByCategory(
  posts: Post[],
  categoryName: string | null
): Post[] {
  if (!categoryName) {
    return posts;
  }

  return posts.filter((post) =>
    post.categories.some(
      (category) => category.name.toLowerCase() === categoryName.toLowerCase()
    )
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
 * Gets related posts with a diverse mix of content
 * @param currentPost The current post to find related posts for
 * @param allPosts All available posts
 * @param limit Maximum number of related posts to return
 * @param excludePosts Additional posts to exclude (optional)
 * @returns Array of related posts
 */
export function getRelatedPosts(
  currentPost: Post,
  allPosts: Post[],
  limit: number = 3,
  excludePosts: Post[] = []
): Post[] {
  // Create a set of IDs to exclude (current post and any specified excluded posts)
  const excludeIds = new Set<string>([
    currentPost.id,
    ...excludePosts.map((post) => post.id),
  ]);

  // Also track slugs to ensure we don't include the same content with different IDs
  const excludeSlugs = new Set<string>([
    currentPost.slug,
    ...excludePosts.map((post) => post.slug),
  ]);

  // Filter out the current post and any excluded posts by both ID and slug
  const candidatePosts = allPosts.filter(
    (post) => !excludeIds.has(post.id) && !excludeSlugs.has(post.slug)
  );

  if (candidatePosts.length === 0) return [];

  // Extract category names from current post
  const currentPostCategories = new Set(
    currentPost.categories.map((category) => category.name.toLowerCase())
  );

  // Score each post based on multiple factors
  const scoredPosts = candidatePosts.map((post) => {
    // Count matching categories
    const matchingCategoriesCount = post.categories.filter((category) =>
      currentPostCategories.has(category.name.toLowerCase())
    ).length;

    // Title similarity (crude but effective for finding similar topics)
    const titleWords = new Set(
      currentPost.title
        .toLowerCase()
        .split(/\s+/)
        .filter((w) => w.length > 3)
    );
    const postTitleWords = post.title
      .toLowerCase()
      .split(/\s+/)
      .filter((w) => w.length > 3);
    const titleSimilarity =
      postTitleWords.filter((word) => titleWords.has(word)).length /
      Math.max(1, Math.sqrt(titleWords.size * postTitleWords.length));

    // Content length similarity - prefer posts of similar length
    const excerptLengthSimilarity =
      1 -
      Math.abs(post.excerpt.length - currentPost.excerpt.length) /
        Math.max(post.excerpt.length, currentPost.excerpt.length, 1);

    // Diversity score - reward posts from categories not in current post
    // (This ensures we get some posts that are different)
    const uniqueCategories = post.categories.filter(
      (category) => !currentPostCategories.has(category.name.toLowerCase())
    ).length;

    // Calculate recency - newer posts get higher scores
    const postDate = post.published ? new Date(post.published).getTime() : 0;
    const currentDate = Date.now();
    const recency = postDate
      ? Math.min(1, (currentDate - postDate) / (90 * 24 * 60 * 60 * 1000))
      : 0.5;

    // Combined score with different weights
    const similarityScore =
      matchingCategoriesCount * 2 + // Category match is important
      titleSimilarity * 1.5 + // Title similarity matters
      excerptLengthSimilarity * 0.5 + // Length similarity is minor
      (post.authorName === currentPost.authorName ? 1 : 0) + // Same author bonus
      uniqueCategories * 0.7 + // Reward some diversity
      recency * 0.8; // Newer content gets a boost

    return {
      post,
      score: similarityScore,
      // Keep track of whether this post has matching categories
      hasMatchingCategory: matchingCategoriesCount > 0,
      // Recency as a secondary sort factor
      date: post.published || "",
    };
  });

  // Sort by score (descending)
  const sortedPosts = scoredPosts.sort((a, b) => b.score - a.score);

  // If we have enough posts, ensure diversity by taking:
  // - First half: posts with highest similarity (likely category matches)
  // - Second half: diverse picks (likely different categories)
  if (sortedPosts.length >= limit * 2) {
    const halfLimit = Math.ceil(limit / 2);

    // Get the top scoring posts for the first half
    const similarPosts = sortedPosts
      .filter((item) => item.hasMatchingCategory)
      .slice(0, halfLimit);

    // Get diverse posts for the second half, prioritizing those without matching categories
    const diversePosts = sortedPosts
      .filter((item) => !similarPosts.includes(item))
      .sort((a, b) =>
        a.hasMatchingCategory === b.hasMatchingCategory
          ? b.score - a.score
          : a.hasMatchingCategory
          ? 1
          : -1
      )
      .slice(0, limit - similarPosts.length);

    return [...similarPosts, ...diversePosts].map((item) => item.post);
  }

  // If we don't have many posts, just return the highest scoring ones
  return sortedPosts.slice(0, limit).map((item) => item.post);
}
