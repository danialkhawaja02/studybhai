export interface SeoOptions {
  title: string;
  description: string;
  isArticle?: boolean;
  datePublished?: string;
  dateModified?: string;
  authorName?: string;
  imageUrl?: string;
  canonicalUrl?: string;
}

export function generateSchemaOrg(options: SeoOptions) {
  const siteUrl = 'https://studybhai.com';
  
  if (options.isArticle) {
    return {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: options.title,
      description: options.description,
      image: options.imageUrl ? [options.imageUrl] : [`${siteUrl}/og-image.png`],
      datePublished: options.datePublished || new Date().toISOString(),
      dateModified: options.dateModified || options.datePublished || new Date().toISOString(),
      author: {
        '@type': 'Person',
        name: options.authorName || 'Danial Sohail',
        url: `${siteUrl}/about/`
      },
      publisher: {
        '@type': 'Organization',
        name: 'Study Bhai',
        logo: {
          '@type': 'ImageObject',
          url: `${siteUrl}/logo.png`
        }
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': options.canonicalUrl || siteUrl
      }
    };
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'EducationalWebSite',
    name: 'Study Bhai',
    url: siteUrl,
    description: options.description,
    educationalLevel: ['Secondary Education', 'Higher Secondary Education'],
    audience: {
      '@type': 'EducationalAudience',
      educationalRole: 'Student'
    },
    inLanguage: ['en', 'ur'],
    publisher: {
      '@type': 'Organization',
      name: 'Study Bhai',
      url: siteUrl
    }
  };
}
