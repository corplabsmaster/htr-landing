import NotionRenderer from "@/app/components/blog/notion-renderer";
import RelatedPosts from "@/app/components/blog/related-posts";
import { getBlogPostBySlug, getBlogPosts } from "@/lib/notion";
import { formatDate } from "@/lib/utils";
import { Post } from "@/types/blog";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

export const revalidate = 3600; // Revalidate this page every hour

// Loading component for blog post
function BlogPostLoading() {
  return (
    <div className="min-h-screen">
      {/* Header area */}
      <div className="py-6 md:py-10 bg-gradient-to-b from-lime-300/30 to-white dark:from-blue-900/30 dark:to-gray-950">
        <div className="container px-4 md:px-6">
          <div className="animate-pulse h-6 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
        </div>
      </div>

      {/* Banner image skeleton */}
      <div className="w-full relative h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden bg-gray-200 dark:bg-gray-700 animate-pulse"></div>

      {/* Content area */}
      <article className="container px-4 py-12 md:px-6 mx-auto">
        <div className="w-full max-w-3xl mx-auto animate-pulse">
          {/* Post header skeleton */}
          <div className="mb-10">
            <div className="flex flex-wrap gap-2 mb-4">
              <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
              <div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
            </div>
            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
            <div className="h-6 w-48 bg-gray-200 dark:bg-gray-700 rounded mt-4"></div>
          </div>

          {/* Post content skeleton */}
          <div className="space-y-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="space-y-3">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
              </div>
            ))}
          </div>
        </div>
      </article>
    </div>
  );
}

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const slug = params.slug;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Post Not Found",
      description: "The requested blog post could not be found.",
    };
  }

  return {
    title: post.seoTitle || post.title,
    description: post.metaDescription || post.excerpt,
    authors: post.authorName
      ? [{ name: post.authorName, url: "/" }]
      : undefined,
    openGraph: {
      title: post.seoTitle || post.title,
      description: post.metaDescription || post.excerpt,
      type: "article",
      publishedTime: post.published ?? undefined,
      authors: post.authorName ? [post.authorName] : undefined,
      ...(post.bannerImage
        ? {
            images: [
              {
                url: post.bannerImage,
                width: 1200,
                height: 630,
                alt: post.title,
              },
            ],
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: post.seoTitle || post.title,
      description: post.metaDescription || post.excerpt,
      ...(post.bannerImage ? { images: [post.bannerImage] } : {}),
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  // Extract slug from params first
  const slug = params.slug;

  return (
    <Suspense fallback={<BlogPostLoading />}>
      <BlogPostContent slug={slug} />
    </Suspense>
  );
}

// Separate component to load the content inside Suspense
async function BlogPostContent({ slug }: { slug: string }) {
  // Get the current post and all posts for related posts
  const [post, allPostsWithNull] = await Promise.all([
    getBlogPostBySlug(slug),
    getBlogPosts(),
  ]);

  if (!post) {
    notFound();
  }

  // Filter out null posts for type safety
  const allPosts = allPostsWithNull.filter(Boolean) as Post[];

  return (
    <>
      <div className="py-6 md:py-10 bg-gradient-to-b from-lime-300/30 to-white dark:from-blue-900/30 dark:to-gray-950">
        <div className="container px-4 md:px-6">
          <Link
            href="/blog"
            className="inline-flex items-center mb-4 text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
          >
            <svg
              className="mr-1 h-4 w-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Back to Insights
          </Link>
        </div>
      </div>

      {post.bannerImage && (
        <div className="w-full relative h-[300px] md:h-[400px] lg:h-[500px] overflow-hidden">
          <img
            src={post.bannerImage}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
      )}

      <article
        className="container px-4 py-12 md:px-6 mx-auto"
        itemScope
        itemType="https://schema.org/BlogPosting"
      >
        {/* Hidden structured data for SEO */}
        {post.published && (
          <meta
            itemProp="datePublished"
            content={new Date(post.published).toISOString()}
          />
        )}
        {post.authorName && (
          <meta itemProp="author" content={post.authorName} />
        )}
        <meta itemProp="headline" content={post.seoTitle || post.title} />
        {post.bannerImage && (
          <meta itemProp="image" content={post.bannerImage} />
        )}
        <meta itemProp="articleBody" content={post.excerpt} />

        <div className="w-full max-w-3xl mx-auto">
          {/* Post header */}
          <div className="mb-10">
            {post.categories && post.categories.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {post.categories.map((category: any) => (
                  <Link
                    key={category.id}
                    href={`/blog?category=${category.name}`}
                    className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-[#2c5b2d]/10 text-[#2c5b2d] dark:bg-[#2ae1ac]/10 dark:text-[#2ae1ac]"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            )}

            <h1
              className="text-4xl font-bold tracking-tight text-[#2c5b2d] dark:text-[#2ae1ac] mb-4"
              itemProp="name"
            >
              {post.seoTitle || post.title}
            </h1>

            <div className="flex items-center text-gray-500 dark:text-gray-400 text-sm mt-4">
              {post.authorName && (
                <div className="flex items-center">
                  {post.authorImage ? (
                    <div
                      className="h-8 w-8 rounded-full overflow-hidden mr-2 relative group cursor-pointer"
                      title={post.authorRole || ""}
                    >
                      <Image
                        src={post.authorImage}
                        alt={post.authorName}
                        width={32}
                        height={32}
                        className="h-full w-full object-cover"
                      />
                      {post.authorRole && (
                        <div className="absolute opacity-0 group-hover:opacity-100 -top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
                          {post.authorRole}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div
                      className="h-8 w-8 rounded-full bg-[#2c5b2d] dark:bg-[#2ae1ac] text-white dark:text-gray-900 flex items-center justify-center mr-2 relative group cursor-pointer"
                      title={post.authorRole || ""}
                    >
                      {post.authorName.charAt(0).toUpperCase()}
                      {post.authorRole && (
                        <div className="absolute opacity-0 group-hover:opacity-100 -top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
                          {post.authorRole}
                        </div>
                      )}
                    </div>
                  )}
                  <div className="flex items-center">
                    <span
                      className="font-medium text-[#2c5b2d] dark:text-[#2ae1ac] relative group cursor-pointer"
                      title={post.authorRole || ""}
                    >
                      {post.authorName}
                      {post.authorRole && (
                        <div className="absolute opacity-0 group-hover:opacity-100 -top-10 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
                          {post.authorRole}
                        </div>
                      )}
                    </span>
                    {post.authorRole && (
                      <>
                        <span className="mx-1">,</span>
                        <span className="text-gray-500 dark:text-gray-400">
                          {post.authorRole}
                        </span>
                      </>
                    )}
                    {post.published && (
                      <>
                        <span className="mx-2">•</span>
                        <time
                          dateTime={new Date(post.published).toISOString()}
                          className="flex items-center"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 mr-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          {formatDate(post.published)}
                        </time>
                      </>
                    )}
                  </div>
                </div>
              )}

              {!post.authorName && post.published && (
                <time
                  dateTime={new Date(post.published).toISOString()}
                  className="flex items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  {formatDate(post.published)}
                </time>
              )}
            </div>
          </div>

          {/* Post content */}
          <div
            className="prose prose-lg dark:prose-invert prose-headings:text-[#2c5b2d] dark:prose-headings:text-[#2ae1ac] max-w-none"
            itemProp="articleBody"
          >
            <NotionRenderer blocks={post.content} />
          </div>

          {/* Related posts */}
          <RelatedPosts currentPost={post} allPosts={allPosts} limit={3} />
        </div>
      </article>
    </>
  );
}
