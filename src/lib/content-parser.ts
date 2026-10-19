export interface HeadingItem {
  depth: number;
  text: string;
  slug: string;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/<[^>]*>/g, '') // remove inner HTML tags if any
    .replace(/[^\w\s-]/g, '') // remove non-word chars
    .trim()
    .replace(/\s+/g, '-');
}

export function extractHeadingsFromHtml(html: string): HeadingItem[] {
  const headings: HeadingItem[] = [];
  const regex = /<h([2-3])[^>]*>(.*?)<\/h\1>/gi;
  let match;

  while ((match = regex.exec(html)) !== null) {
    const depth = parseInt(match[1], 10);
    const rawText = match[2].replace(/<[^>]*>/g, '').trim();
    const slug = slugify(rawText);
    headings.push({
      depth,
      text: rawText,
      slug
    });
  }

  return headings;
}

export function injectHeadingAnchors(html: string): string {
  return html.replace(/<h([2-3])([^>]*)>(.*?)<\/h\1>/gi, (match, level, attrs, content) => {
    // If id already exists, keep it
    if (/id=["'][^"']+["']/i.test(attrs)) {
      return match;
    }
    const rawText = content.replace(/<[^>]*>/g, '').trim();
    const slug = slugify(rawText);
    return `<h${level}${attrs} id="${slug}">${content}</h${level}>`;
  });
}
