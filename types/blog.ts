export interface Category {
  id: string; // The ID used for UI operations
  notionId?: string; // The original Notion ID
  name: string;
  color: string;
}

export interface Post {
  id: string; // Stable, shortened ID for client-side operations
  notionId?: string; // Original Notion page ID
  title: string;
  seoTitle: string;
  metaDescription: string;
  published: string | null;
  slug: string;
  excerpt: string;
  bannerImage: string;
  authorName: string;
  authorImage?: string;
  authorRole?: string;
  categories: Category[];
  status?: string | null;
  propertyIds?: Record<string, string | null>; // Notion property IDs for reference
}

export interface BlogContentProps {
  initialPosts: Post[];
  categories: Category[];
  initialCategory: string | null;
}

export type BlockType = any; // For simplicity, we're using 'any' for Notion block types
