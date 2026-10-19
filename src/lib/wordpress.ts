import type { Post, Category, Author, ResourceMeta } from '@/types';
import { MOCK_POSTS, MOCK_CATEGORIES } from '@/data/mockData';

/**
 * Normalized WordPress REST API URL supporting both Node process.env and Astro import.meta.env
 */
export function getWpApiUrl(): string {
  const envUrl =
    (typeof process !== 'undefined' && process.env?.WORDPRESS_API_URL) ||
    (typeof import.meta !== 'undefined' && (import.meta as any).env?.WORDPRESS_API_URL) ||
    'https://cms.studybhai.com/wp-json/wp/v2';

  let clean = envUrl.trim().replace(/\/+$/, '');
  if (!clean.includes('/wp-json')) {
    clean += '/wp-json/wp/v2';
  } else if (!clean.endsWith('/wp/v2')) {
    clean += '/wp/v2';
  }
  return clean;
}

const WP_API_URL = getWpApiUrl();
// Build-time fetch timeout: 30 seconds to allow complete WordPress REST API responses with _embed=1
const FETCH_TIMEOUT_MS = 30000;

// In-memory cache so all Astro SSG pages share 1 single fetch during build
let cachedPostsPromise: Promise<Post[]> | null = null;
let cachedCategoriesPromise: Promise<Category[]> | null = null;

/**
 * Ensure media URLs always point to the CMS host (cms.studybhai.com) where wp-content lives
 */
export function normalizeMediaUrl(url?: string): string | undefined {
  if (!url) return undefined;
  return url.replace(/^https?:\/\/studybhai\.com\/wp-content\//i, 'https://cms.studybhai.com/wp-content/');
}

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
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
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
 * Decode common WordPress HTML entities
 */
export function decodeHtmlEntities(str: string): string {
  if (!str) return '';
  return str
    .replace(/&#8211;/g, '–')
    .replace(/&#8212;/g, '—')
    .replace(/&#8216;/g, '‘')
    .replace(/&#8217;/g, '’')
    .replace(/&#8220;/g, '“')
    .replace(/&#8221;/g, '”')
    .replace(/&#038;/g, '&')
    .replace(/&amp;/g, '&')
    .replace(/&#039;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ');
}

/**
 * Extract download/drive/cloud URL from WordPress post HTML content
 */
function extractDownloadUrl(content: string): string {
  if (!content) return '#';
  const match =
    content.match(/href="([^"]+\.pdf[^"]*)"/i) ||
    content.match(/href="(https:\/\/[^"]*drive\.google\.com[^"]*)"/i) ||
    content.match(/href="(https:\/\/[^"]*(?:mediafire|dropbox|mega\.nz)[^"]*)"/i);
  return match ? match[1] : '#';
}

/**
 * Transform WordPress post object to Study Bhai Post model
 */
function transformWpPost(wpPost: any): Post {
  const featuredMedia = wpPost._embedded?.['wp:featuredmedia']?.[0];
  const authorData = wpPost._embedded?.author?.[0];

  const rawTitle = wpPost.title?.rendered || '';
  const title = decodeHtmlEntities(rawTitle);
  const rawContent = wpPost.content?.rendered || '';
  const content = rawContent.replace(/https?:\/\/studybhai\.com\/wp-content\//gi, 'https://cms.studybhai.com/wp-content/');
  const rawExcerpt = wpPost.excerpt?.rendered || '';
  const cleanExcerpt = decodeHtmlEntities(rawExcerpt.replace(/<[^>]*>/g, '').trim()) || title;

  // Derive metadata from title/tags
  const subject = deriveSubject(title);
  const grade = deriveGrade(title);
  const downloadUrl = extractDownloadUrl(content);

  const termCategories = (wpPost._embedded?.['wp:term']?.[0] || []).map((term: any) => term.slug);
  const termTags = (wpPost._embedded?.['wp:term']?.[1] || []).map((term: any) => term.slug);

  const normalizedFeaturedSrc = normalizeMediaUrl(featuredMedia?.source_url);

  return {
    id: wpPost.id,
    slug: wpPost.slug,
    title,
    content,
    excerpt: cleanExcerpt,
    date: wpPost.date,
    modified: wpPost.modified,
    featuredImage: normalizedFeaturedSrc ? {
      src: normalizedFeaturedSrc,
      alt: decodeHtmlEntities(featuredMedia?.alt_text || title),
      width: featuredMedia?.media_details?.width,
      height: featuredMedia?.media_details?.height,
    } : undefined,
    author: {
      id: authorData?.id || 1,
      name: authorData?.name || 'Danial Sohail',
      avatar: authorData?.avatar_urls?.['96'] || 'https://secure.gravatar.com/avatar/?s=96&d=mm',
      bio: authorData?.description || ''
    },
    categories: termCategories,
    tags: termTags,
    meta: {
      subject,
      grade,
      board: 'Punjab Curriculum & Textbook Board',
      fileSize: '15-25 MB',
      downloadUrl,
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
  if (lower.includes('pak studies') || lower.includes('pakstudy')) return 'Pakistan Studies';
  if (lower.includes('urdu')) return 'Urdu';
  if (lower.includes('islam')) return 'Islamiat';
  if (lower.includes('statistic')) return 'Statistics';
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
 * Fetch all posts from WordPress with fallback to local mock
 */
async function fetchAllPostsInternal(): Promise<Post[]> {
  if (typeof process !== 'undefined' && process.env?.VITEST && !process.env?.TEST_LIVE_WP) {
    return MOCK_POSTS;
  }
  const apiUrl = getWpApiUrl();
  try {
    console.log(`[WordPress API] Connecting to ${apiUrl}/posts?_embed=1&per_page=100 ...`);
    const res = await fetchWithTimeout(`${apiUrl}/posts?_embed=1&per_page=100`, FETCH_TIMEOUT_MS);
    if (!res.ok) {
      console.warn(`[WordPress API] HTTP ${res.status} from ${apiUrl}. Falling back to mock dataset.`);
      return MOCK_POSTS;
    }
    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) {
      console.warn(`[WordPress API] Received empty array from ${apiUrl}. Falling back to mock dataset.`);
      return MOCK_POSTS;
    }
    console.log(`[WordPress API] Successfully fetched and cached ${data.length} live posts from WordPress!`);
    return data.map(transformWpPost);
  } catch (error: any) {
    console.warn(`[WordPress API] Unable to connect to ${apiUrl}: ${error?.message}. Using resilient local mock dataset.`);
    return MOCK_POSTS;
  }
}

/**
 * Get all posts from WordPress (cached in-memory for instant SSG builds)
 */
export async function getAllPosts(): Promise<Post[]> {
  if (!cachedPostsPromise) {
    cachedPostsPromise = fetchAllPostsInternal();
  }
  return cachedPostsPromise;
}

/**
 * Get single post by slug
 */
export async function getPostBySlug(slug: string): Promise<Post | null> {
  const allPosts = await getAllPosts();
  return allPosts.find(p => p.slug === slug) || null;
}

/**
 * Fetch categories with caching
 */
async function fetchCategoriesInternal(): Promise<Category[]> {
  if (typeof process !== 'undefined' && process.env?.VITEST && !process.env?.TEST_LIVE_WP) {
    return MOCK_CATEGORIES;
  }
  const apiUrl = getWpApiUrl();
  try {
    const res = await fetchWithTimeout(`${apiUrl}/categories?per_page=100`, FETCH_TIMEOUT_MS);
    if (!res.ok) return MOCK_CATEGORIES;
    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) return MOCK_CATEGORIES;
    return data.map((c: any) => ({
      id: c.id,
      name: decodeHtmlEntities(c.name),
      slug: c.slug,
      count: c.count,
      description: c.description
    }));
  } catch {
    return MOCK_CATEGORIES;
  }
}

/**
 * Get categories
 */
export async function getCategories(): Promise<Category[]> {
  if (!cachedCategoriesPromise) {
    cachedCategoriesPromise = fetchCategoriesInternal();
  }
  return cachedCategoriesPromise;
}

/**
 * Get posts by category slug
 */
export async function getPostsByCategory(categorySlug: string): Promise<Post[]> {
  const allPosts = await getAllPosts();
  return allPosts.filter(p => p.categories.includes(categorySlug));
}
