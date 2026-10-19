import type { ResourceMeta } from '@/types';

export function calculateReadTime(text: string): string {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}

export function extractResourceMeta(data: { title: string; tags?: string[]; content?: string }): ResourceMeta {
  const titleLower = data.title.toLowerCase();
  const tagsLower = (data.tags || []).map(t => t.toLowerCase());
  const combined = [titleLower, ...tagsLower].join(' ');

  let subject = 'General Studies';
  if (combined.includes('math')) subject = 'Mathematics';
  else if (combined.includes('physic')) subject = 'Physics';
  else if (combined.includes('chem')) subject = 'Chemistry';
  else if (combined.includes('bio')) subject = 'Biology';
  else if (combined.includes('english')) subject = 'English';
  else if (combined.includes('computer')) subject = 'Computer Science';
  else if (combined.includes('scholarship')) subject = 'Scholarships';
  else if (combined.includes('usat') || combined.includes('hec')) subject = 'Test Prep';

  let grade = 'General';
  if (combined.includes('12th') || combined.includes('2nd year') || combined.includes('class-12') || combined.includes('class 12')) {
    grade = '12th (2nd Year)';
  } else if (combined.includes('11th') || combined.includes('1st year') || combined.includes('class-11') || combined.includes('class 11')) {
    grade = '11th (1st Year)';
  } else if (combined.includes('10th') || combined.includes('class-10') || combined.includes('class 10')) {
    grade = '10th Class';
  } else if (combined.includes('9th') || combined.includes('class-9') || combined.includes('class 9')) {
    grade = '9th Class';
  }

  let board = 'Punjab Curriculum & Textbook Board (PTB)';
  if (combined.includes('federal') || combined.includes('fbise')) {
    board = 'Federal Board (FBISE)';
  } else if (combined.includes('hec')) {
    board = 'HEC / ETC Pakistan';
  }

  return {
    subject,
    grade,
    board,
    fileSize: '18 MB',
    downloadUrl: '#',
    readTime: calculateReadTime(data.content || data.title.repeat(50))
  };
}

export function getGradeStaticPaths() {
  return [
    { params: { grade: 'class-9' }, props: { gradeName: '9th Class', gradeNum: '9' } },
    { params: { grade: 'class-10' }, props: { gradeName: '10th Class', gradeNum: '10' } },
    { params: { grade: 'class-11' }, props: { gradeName: '11th Class (1st Year)', gradeNum: '11' } },
    { params: { grade: 'class-12' }, props: { gradeName: '12th Class (2nd Year)', gradeNum: '12' } },
  ];
}
