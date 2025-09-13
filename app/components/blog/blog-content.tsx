"use client";

import { filterPostsByCategory } from "@/lib/blog-utils";
import { BlogContentProps, Category, Post } from "@/types/blog";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState, useTransition } from "react";
import Container from "../ui/container";
import BlogCard from "./blog-card";
import CategoryFilter from "./category-filter";

// Constants for localStorage
const STORAGE_KEYS = {
  POSTS: "hiterra-blog-posts",
  CATEGORIES: "hiterra-blog-categories",
  TIMESTAMP: "hiterra-blog-timestamp",
  CACHE_DURATION: 60 * 60 * 1000, // 1 hour in milliseconds
};

// Constants for UI
const UI_CONSTANTS = {
  FADE_OUT_DURATION: 200, // Time to fade out content (ms)
  LOADING_DURATION: 800, // Time to show loading state (ms)
  FADE_IN_DURATION: 300, // Time for fade-in transition (ms)
  INITIAL_PROCESSING_DELAY: 100, // Delay before processing categories (ms)
};

// Blog card skeleton for loading state
function BlogCardSkeleton() {
  return (
    <div className="flex flex-col h-full overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800 animate-skeletonFade">
      <div className="relative h-48 w-full bg-gray-200 dark:bg-gray-700"></div>
      <div className="flex-1 p-6">
        <div className="space-y-4">
          <div className="flex gap-2">
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-16"></div>
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded-full w-20"></div>
          </div>

          <div className="space-y-2">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-md w-full"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-1/2"></div>
          </div>

          <div className="space-y-2">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-5/6"></div>
          </div>
        </div>
      </div>
      <div className="p-6 pt-0">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-24"></div>
      </div>
    </div>
  );
}

export default function BlogContent({
  initialPosts,
  categories,
  initialCategory,
}: BlogContentProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    initialCategory
  );
  const [isLoading, setIsLoading] = useState(false);
  const [showPosts, setShowPosts] = useState(true);
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [allCategories, setAllCategories] = useState<Category[]>(categories);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>(
    filterPostsByCategory(initialPosts, initialCategory)
  );

  // Track if we've processed all category data
  const categoryDataProcessed = useRef(false);
  // Cache for filtered posts by category
  const postsCache = useRef<Record<string, Post[]>>({});

  // Save data to localStorage
  const saveToLocalStorage = useCallback(
    (posts: Post[], categories: Category[]) => {
      if (typeof window === "undefined") return;

      try {
        // Save posts
        localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify(posts));

        // Save categories
        localStorage.setItem(
          STORAGE_KEYS.CATEGORIES,
          JSON.stringify(categories)
        );

        // Save timestamp
        localStorage.setItem(STORAGE_KEYS.TIMESTAMP, Date.now().toString());

        console.log("Blog data saved to localStorage");
      } catch (error) {
        console.error("Error saving blog data to localStorage:", error);
      }
    },
    []
  );

  // Try to load data from localStorage or use provided initial data
  useEffect(() => {
    if (typeof window === "undefined") return;

    console.log("🔄 Checking localStorage for cached blog data");

    try {
      // Check if we have cached data and if it's still valid
      const timestamp = Number(
        localStorage.getItem(STORAGE_KEYS.TIMESTAMP) || "0"
      );
      const isExpired = Date.now() - timestamp > STORAGE_KEYS.CACHE_DURATION;

      if (!isExpired) {
        // Get data from localStorage
        const cachedPosts = localStorage.getItem(STORAGE_KEYS.POSTS);
        const cachedCategories = localStorage.getItem(STORAGE_KEYS.CATEGORIES);

        if (cachedPosts && cachedCategories) {
          const parsedPosts = JSON.parse(cachedPosts) as Post[];
          const parsedCategories = JSON.parse(cachedCategories) as Category[];

          console.log("✅ Using cached blog data from localStorage");
          console.log(
            `📊 Loaded ${parsedPosts.length} posts and ${parsedCategories.length} categories from cache`
          );

          setPosts(parsedPosts);
          setAllCategories(parsedCategories);
          setFilteredPosts(filterPostsByCategory(parsedPosts, initialCategory));

          // Skip saving again since we just loaded
          return;
        }
      }

      // If we got here, either cache was expired or didn't exist
      console.log(
        "⚠️ No valid cache found, using server data and creating new cache"
      );

      // Use the initial data and save it to localStorage
      saveToLocalStorage(initialPosts, categories);
    } catch (error) {
      console.error("❌ Error loading blog data from localStorage:", error);
      // Fallback to initial data
      setPosts(initialPosts);
      setAllCategories(categories);
    }
  }, [initialPosts, categories, initialCategory, saveToLocalStorage]);

  // Pre-process and cache all category data on mount
  useEffect(() => {
    if (categoryDataProcessed.current) return;

    console.log("🔄 Pre-processing all category data for faster filtering");

    // Cache the initial category data
    const initialKey = initialCategory || "all";
    const initialFilteredPosts = initialCategory
      ? posts.filter((post) =>
          post.categories.some((cat) => cat.name === initialCategory)
        )
      : posts;

    postsCache.current[initialKey] = initialFilteredPosts;

    console.log(
      `✅ Initial category "${initialKey}" cached with ${initialFilteredPosts.length} posts`
    );

    // Also set the initial filtered posts to ensure we start with correct data
    setFilteredPosts(initialFilteredPosts);

    // Process all categories in the background
    const processCategories = () => {
      console.log("🔄 Background processing all categories");

      // Cache "all posts" view if not already cached
      if (!postsCache.current["all"]) {
        postsCache.current["all"] = posts;
        console.log(`✅ Cached "all" category with ${posts.length} posts`);
      }

      // Cache each category
      allCategories.forEach((category) => {
        const categoryKey = category.name;
        if (!postsCache.current[categoryKey]) {
          const categoryPosts = posts.filter((post) =>
            post.categories.some((cat) => cat.name === categoryKey)
          );
          postsCache.current[categoryKey] = categoryPosts;
          console.log(
            `✅ Cached "${categoryKey}" category with ${categoryPosts.length} posts`
          );
        }
      });

      categoryDataProcessed.current = true;
      console.log("✅ All categories pre-processed and cached");
    };

    // Process in background after initial render
    const timer = setTimeout(
      processCategories,
      UI_CONSTANTS.INITIAL_PROCESSING_DELAY
    );
    return () => clearTimeout(timer);
  }, [posts, allCategories, initialCategory]);

  // Handle category selection with URL update
  const handleCategorySelect = (category: string | null) => {
    // Don't do anything if we're already on this category
    if (category === selectedCategory) {
      console.log(
        `🔍 Category "${category}" already selected, no action needed`
      );
      return;
    }

    console.log(`🔍 User selected category: "${category || "all"}"`);

    // Immediately update the selected category for visual feedback
    setSelectedCategory(category);

    // Update URL (won't cause immediate re-render)
    if (category) {
      router.push(`/blog?category=${encodeURIComponent(category)}`, {
        scroll: false,
      });
    } else {
      router.push("/blog", { scroll: false });
    }

    // Then start loading the content
    setIsLoading(true);
    setShowPosts(false);
    console.log("🔄 Starting content transition");

    // After fade out completes, update data
    const timer = setTimeout(() => {
      // Get posts from cache or compute if not cached
      const cacheKey = category || "all";

      console.log(`🔍 Loading posts for category "${cacheKey}"`);
      console.log(
        `📊 Available cached categories: ${Object.keys(postsCache.current).join(
          ", "
        )}`
      );

      startTransition(() => {
        let postsToShow: Post[];

        if (postsCache.current[cacheKey]) {
          // Use cached posts
          postsToShow = postsCache.current[cacheKey];
          console.log(
            `✅ Using in-memory cached posts for "${cacheKey}", found ${postsToShow.length} posts`
          );
        } else {
          // Compute posts for this category
          console.log(
            `⚠️ No cache found for "${cacheKey}", filtering posts from memory`
          );
          postsToShow = category
            ? posts.filter((post) =>
                post.categories.some((cat) => cat.name === category)
              )
            : posts;

          // Cache for future use
          postsCache.current[cacheKey] = postsToShow;
          console.log(
            `✅ Created cache for "${cacheKey}" with ${postsToShow.length} posts`
          );
        }

        // Update state with the filtered posts
        setFilteredPosts(postsToShow);
        console.log(
          `📊 Updated filtered posts to show ${postsToShow.length} items`
        );

        // Artificial delay to show loading state
        setTimeout(() => {
          setShowPosts(true);
          setIsLoading(false);
          console.log("✅ Content transition complete");
        }, UI_CONSTANTS.LOADING_DURATION);
      });
    }, UI_CONSTANTS.FADE_OUT_DURATION);
  };

  return (
    <>
      <section className="py-12 md:py-16 lg:py-20 bg-gradient-to-b from-lime-300 to-white dark:from-blue-900 dark:to-gray-950">
        <Container>
          <div className="space-y-4 text-center">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-[#2c5b2d] dark:text-lake-400">
              Insights
            </h1>
            <p className="mx-auto max-w-[700px] text-gray-700 dark:text-gray-400 text-md md:text-l">
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
            categories={allCategories}
            selectedCategory={selectedCategory}
            onCategorySelect={handleCategorySelect}
            disabled={isLoading}
          />

          <div
            className={`transition-opacity duration-${
              UI_CONSTANTS.FADE_IN_DURATION
            } ${showPosts ? "opacity-100" : "opacity-0"}`}
          >
            {isLoading ? (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {[...Array(filteredPosts.length || 6)].map((_, index) => (
                  <BlogCardSkeleton key={`skeleton-${index}`} />
                ))}
              </div>
            ) : filteredPosts.length > 0 ? (
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
          </div>
        </Container>
      </section>

      {/* Extra bottom spacing for desktop only */}
      <div className="hidden md:block h-16 lg:h-24"></div>
    </>
  );
}
