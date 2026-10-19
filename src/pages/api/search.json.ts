// src/pages/api/search.json.ts
import { getAllPosts, getCategories } from '@/lib/wordpress';
import { GRADE_FILTERS } from '@/lib/constants';

export async function GET() {
  const posts = await getAllPosts();
  const categories = await getCategories();

  // 1. Hub / Category Pages
  const staticPages = [
    {
      title: 'Official PTB Textbooks (All Classes)',
      url: '/books/',
      excerpt: 'Download official Punjab Curriculum & Textbook Board (PTB) digital books in PDF format for Class 9, 10, 11, and 12.',
      category: 'Books Hub',
      grade: 'All Classes',
      subject: 'Textbooks'
    },
    {
      title: 'Chapter-wise Study Notes & Solved Exercises',
      url: '/notes/',
      excerpt: 'Exam-focused study notes, formula cheat sheets, and solved textbook exercises for board examination success.',
      category: 'Notes Hub',
      grade: 'All Classes',
      subject: 'Revision Notes'
    },
    {
      title: '5-Year Solved Board Past Papers',
      url: '/past-papers/',
      excerpt: 'Download previous 5-year solved board examination past papers for Matric and Intermediate across all BISE boards.',
      category: 'Past Papers',
      grade: 'All Classes',
      subject: 'Past Papers'
    },
    {
      title: 'Fully Funded Scholarships for Pakistani Students',
      url: '/scholarships/',
      excerpt: 'Explore fully funded undergraduate, master’s, and PhD scholarships including HEC Stipendium Hungaricum.',
      category: 'Scholarships',
      grade: 'Higher Ed',
      subject: 'Scholarships'
    },
    {
      title: 'Student Preparation & Career Guides',
      url: '/guides/',
      excerpt: 'Comprehensive student roadmaps, USAT preparation books, and university admission resources in Pakistan.',
      category: 'Guides',
      grade: 'All Classes',
      subject: 'Admissions'
    }
  ];

  // Grade filter pages for books and notes
  const gradePages = GRADE_FILTERS.flatMap((g) => [
    {
      title: `${g.label} PTB Textbooks PDF Download`,
      url: `/books/${g.slug}/`,
      excerpt: `Download free official Punjab Curriculum and Textbook Board ${g.label} books in PDF.`,
      category: 'Books',
      grade: g.label,
      subject: 'Textbooks'
    },
    {
      title: `${g.label} Revision Notes & Solutions`,
      url: `/notes/${g.slug}/`,
      excerpt: `Download free verified ${g.label} revision notes, solved exercises, MCQs, and formulas.`,
      category: 'Notes',
      grade: g.label,
      subject: 'Revision Notes'
    }
  ]);

  // 2. All Live WordPress Posts
  const postItems = posts.map((p) => {
    let categoryName = 'Article';
    if (p.categories.includes('ptb-books') || p.categories.some(c => c.includes('books'))) {
      categoryName = 'Books';
    } else if (p.categories.includes('notes') || p.categories.some(c => c.includes('notes'))) {
      categoryName = 'Notes';
    } else if (p.categories.includes('scholarships')) {
      categoryName = 'Scholarships';
    } else if (p.categories.includes('student-guides') || p.categories.includes('tips-guides')) {
      categoryName = 'Guides';
    } else if (p.categories.includes('past-papers')) {
      categoryName = 'Past Papers';
    }

    return {
      title: p.title,
      url: `/${p.slug}/`,
      excerpt: p.excerpt,
      category: categoryName,
      grade: p.meta.grade,
      subject: p.meta.subject,
      slug: p.slug
    };
  });

  const fullSearchIndex = [...staticPages, ...gradePages, ...postItems];

  return new Response(JSON.stringify(fullSearchIndex), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=3600'
    }
  });
}
