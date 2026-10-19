export interface SearchResultItem {
  id: string;
  url: string;
  title: string;
  excerpt: string;
  category?: string;
  grade?: string;
}

/**
 * Sanitize user search query by stripping special/dangerous characters
 */
export function sanitizeSearchQuery(query: string): string {
  if (!query) return '';
  return query
    .replace(/<[^>]*>/g, '')
    .replace(/[<>{}[\]\\/+=?^$|*!@#%~`"'()]/g, '')
    .trim();
}

/**
 * Clean and format search snippets produced by Pagefind,
 * preserving <mark> highlights while escaping dangerous HTML.
 */
export function formatSearchSnippet(raw: string, maxLen: number = 180): string {
  if (!raw) return '';

  // Extract <mark> contents safely
  const parts: string[] = [];
  const regex = /<mark>(.*?)<\/mark>/gi;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(raw)) !== null) {
    // Non-mark text before this match
    if (match.index > lastIndex) {
      parts.push(escapeText(raw.substring(lastIndex, match.index)));
    }
    // Mark tag text
    parts.push(`<mark>${escapeText(match[1])}</mark>`);
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < raw.length) {
    parts.push(escapeText(raw.substring(lastIndex)));
  }

  let formatted = parts.join('');

  if (formatted.length > maxLen) {
    // Try to find the mark tag position to keep it in context
    const markPos = formatted.indexOf('<mark>');
    if (markPos > 30 && formatted.length > maxLen) {
      const start = Math.max(0, markPos - 30);
      formatted = '...' + formatted.substring(start, start + maxLen) + '...';
    } else {
      formatted = formatted.substring(0, maxLen) + '...';
    }
  }

  return formatted;
}

function escapeText(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
