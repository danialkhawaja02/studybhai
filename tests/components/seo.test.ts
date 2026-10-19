import { describe, it, expect } from 'vitest';
import { generateSchemaOrg } from '@/lib/seo';

describe('SEO Schema Generator', () => {
  it('should generate valid EducationalWebSite schema for home page', () => {
    const schema = generateSchemaOrg({ title: 'Study Bhai', description: 'Quality Education', isArticle: false });
    expect(schema['@type']).toBe('EducationalWebSite');
    expect(schema.name).toBe('Study Bhai');
  });

  it('should generate valid Article schema for notes post', () => {
    const schema = generateSchemaOrg({ 
      title: 'Class 12 Math Notes', 
      description: 'Full notes', 
      isArticle: true, 
      datePublished: '2025-08-01' 
    });
    expect(schema['@type']).toBe('Article');
    expect(schema.headline).toBe('Class 12 Math Notes');
  });
});
