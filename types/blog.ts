export interface Category {
  id: string;
  name: string;
  color: string;
}

export interface Post {
  id: string;
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
}

export interface BlogContentProps {
  initialPosts: Post[];
  categories: Category[];
  initialCategory: string | null;
}

export type BlockType = any; // For simplicity, we're using 'any' for Notion block types
