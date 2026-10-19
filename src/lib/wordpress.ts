import type { Post, Category, Author, ResourceMeta } from '@/types';
import { MOCK_POSTS, MOCK_CATEGORIES } from '@/data/mockData';

const WP_API_URL = (typeof process !== 'undefined' && process.env?.WORDPRESS_API_URL) || 'https://cms.studybhai.com/wp-json/wp/v2';
const FETCH_TIMEOUT_MS = 3500;

/**
 * Fetch wrapper with timeout and error handling
 */
async function fetchWithTimeout(url: string, timeoutMs = FETCH_TIMEOUT_MS): Promise<Response> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'StudyBhai-Astro-Builder/1.0'
      }
    });
    clearTimeout(id);
    return response;
  } catch (error) {
    clearTimeout(id);
    throw error;
  }
}

/**
 * Transform WordPress post object to Study Bhai Post model
 */
function transformWpPost(wpPost: any): Post {
  const featuredMedia = wpPost._embedded?.['wp:featuredmedia']?.[0];
  const authorData = wpPost._embedded?.author?.[0];

  const title = wpPost.title?.rendered || '';
  const content = wpPost.content?.rendered || '';
  const rawExcerpt = wpPost.excerpt?.rendered || '';
  const cleanExcerpt = rawExcerpt.replace(/<[^>]*>/g, '').trim() || title;

  // Derive metadata from title/tags
  const subject = deriveSubject(title);
  const grade = deriveGrade(title);

  return {
    id: wpPost.id,
    slug: wpPost.slug,
    title,
    content,
    excerpt: cleanExcerpt,
    date: wpPost.date,
    modified: wpPost.modified,
    featuredImage: featuredMedia ? {
      src: featuredMedia.source_url,
      alt: featuredMedia.alt_text || title,
      width: featuredMedia.media_details?.width,
      height: featuredMedia.media_details?.height,
    } : undefined,
    author: {
      id: authorData?.id || 1,
      name: authorData?.name || 'Study Bhai Editorial',
      avatar: authorData?.avatar_urls?.['96'] || 'https://secure.gravatar.com/avatar/?s=96&d=mm',
      bio: authorData?.description || ''
    },
    categories: (wpPost._embedded?.['wp:term']?.[0] || []).map((term: any) => term.slug),
    tags: (wpPost._embedded?.['wp:term']?.[1] || []).map((term: any) => term.slug),
    meta: {
      subject,
      grade,
      board: 'Punjab Curriculum & Textbook Board',
      fileSize: '15-25 MB',
      downloadUrl: '#',
      readTime: `${Math.max(2, Math.round(content.split(/\s+/).length / 200))} min read`
    }
  };
}

function deriveSubject(title: string): string {
  const lower = title.toLowerCase();
  if (lower.includes('math')) return 'Mathematics';
  if (lower.includes('physic')) return 'Physics';
  if (lower.includes('chem')) return 'Chemistry';
  if (lower.includes('bio')) return 'Biology';
  if (lower.includes('english')) return 'English';
  if (lower.includes('computer')) return 'Computer Science';
  if (lower.includes('scholarship')) return 'Scholarships';
  if (lower.includes('usat') || lower.includes('hec')) return 'Admissions';
  return 'General';
}

function deriveGrade(title: string): string {
  const lower = title.toLowerCase();
  if (lower.includes('12th') || lower.includes('2nd year') || lower.includes('class 12')) return '12th (2nd Year)';
  if (lower.includes('11th') || lower.includes('1st year') || lower.includes('class 11')) return '11th (1st Year)';
  if (lower.includes('10th') || lower.includes('class 10')) return '10th Class';
  if (lower.includes('9th') || lower.includes('class 9')) return '9th Class';
  return 'General';
}

/**
 * Get all posts from WordPress or local mock fallback
 */
export async function getAllPosts(): Promise<Post[]> {
  try {
    const res = await fetchWithTimeout(`${WP_API_URL}/posts?_embed=1&per_page=100`);
    if (!res.ok) {
      console.warn(`[WordPress API] HTTP ${res.status}. Falling back to mock data.`);
      return MOCK_POSTS;
    }
    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) {
      return MOCK_POSTS;
    }
    return data.map(transformWpPost);
  } catch (error: any) {
    console.warn(`[WordPress API] Unable to connect to ${WP_API_URL}: ${error?.message}. Using resilient local mock dataset.`);
    return MOCK_POSTS;
  }
}

/**
 * Get single post by slug
 */
export async function getPostBySlug(slug: string): Promise<Post | null> {
  const allPosts = await getAllPosts();
  return allPosts.find(p => p.slug === slug) || null;
}

/**
 * Get categories
 */
export async function getCategories(): Promise<Category[]> {
  try {
    const res = await fetchWithTimeout(`${WP_API_URL}/categories?per_page=100`);
    if (!res.ok) return MOCK_CATEGORIES;
    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) return MOCK_CATEGORIES;
    return data.map((c: any) => ({
      id: c.id,
      name: c.name,
      slug: c.slug,
      count: c.count,
      description: c.description
    }));
  } catch {
    return MOCK_CATEGORIES;
  }
}

/**
 * Get posts by category slug
 */
export async function getPostsByCategory(categorySlug: string): Promise<Post[]> {
  const allPosts = await getAllPosts();
  return allPosts.filter(p => p.categories.includes(categorySlug));
}
