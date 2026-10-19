export type SubjectType = 'Math' | 'Physics' | 'Chemistry' | 'Biology' | 'English' | 'Computer' | 'General';

export type GradeLevel = '9' | '10' | '11' | '12' | 'General';

export interface Author {
  id: number;
  name: string;
  avatar: string;
  bio?: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  count: number;
  description?: string;
}

export interface ResourceMeta {
  subject: string;
  grade: string;
  board?: string;
  fileSize?: string;
  downloadUrl?: string;
  readTime: string;
}

export interface Post {
  id: number;
  slug: string;
  title: string;
  content: string;
  excerpt: string;
  date: string;
  modified: string;
  featuredImage?: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
  };
  author: Author;
  categories: string[]; // slugs
  tags: string[];
  meta: ResourceMeta;
}
