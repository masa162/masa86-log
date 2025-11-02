/**
 * Database types for blog
 */

export interface PostRow {
  id: number;
  slug: string;
  title: string;
  content: string;
  tags: string; // JSON string array
  created_at: string;
  updated_at: string;
}

export interface Post {
  id: number;
  slug: string;
  title: string;
  content: string;
  tags: string[];
  created_at: string;
  updated_at: string;
}
