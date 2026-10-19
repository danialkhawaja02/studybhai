import type { Post, Category } from '@/types';

export const MOCK_CATEGORIES: Category[] = [
  { id: 1, name: 'PTB Books', slug: 'ptb-books', count: 48, description: 'Official Punjab Curriculum and Textbook Board (PTB) digitized books in PDF format.' },
  { id: 2, name: '9th Class Books', slug: 'class-9-books', count: 12, description: 'Textbooks for Matriculation Part 1 (9th Class).' },
  { id: 3, name: '10th Class Books', slug: 'class-10-books', count: 12, description: 'Textbooks for Matriculation Part 2 (10th Class).' },
  { id: 4, name: '11th Class Books', slug: 'class-11-books', count: 12, description: 'Textbooks for Intermediate Part 1 (11th Class / FSc / ICS).' },
  { id: 5, name: '12th Class Books', slug: 'class-12-books', count: 12, description: 'Textbooks for Intermediate Part 2 (12th Class / FSc / ICS).' },
  { id: 6, name: 'Notes', slug: 'notes', count: 140, description: 'Chapter-wise comprehensive revision notes, solved exercises, and formulas.' },
  { id: 7, name: '9th Class Notes', slug: '9th-class-notes', count: 35, description: 'Chapter notes for Class 9.' },
  { id: 8, name: '10th Class Notes', slug: '10th-class-notes', count: 35, description: 'Chapter notes for Class 10.' },
  { id: 9, name: '11th Class Notes', slug: '11th-class-notes', count: 35, description: 'Chapter notes for 1st Year (Class 11).' },
  { id: 10, name: '12th Class Notes', slug: '12th-class-notes', count: 35, description: 'Chapter notes for 2nd Year (Class 12).' },
  { id: 11, name: 'Past Papers', slug: 'past-papers', count: 95, description: 'Previous 5-year solved board papers for all BISE boards.' },
  { id: 12, name: 'Student Guides', slug: 'student-guides', count: 28, description: 'Career roadmaps, university admissions, and test preparation.' },
  { id: 13, name: 'Scholarships', slug: 'scholarships', count: 22, description: 'Fully funded domestic and international scholarships for Pakistani students.' }
];

export const MOCK_POSTS: Post[] = [
  {
    id: 9977,
    slug: 'class-12-math-notes',
    title: 'Class 12 Math Notes – 2nd Year All Chapter Math Notes',
    excerpt: 'If you\'re a student in your 2nd year of college and are looking for Class 12 Math notes, this comprehensive guide provides all chapter-wise solved formulas and exercises.',
    content: `
      <h2>Class 12 Mathematics Complete Notes & Solutions</h2>
      <p>Mathematics in 2nd year (HSSC Part II) is one of the most critical subjects for pre-engineering and ICS students aiming for top engineering universities in Pakistan like NUST, GIKI, UET, and FAST.</p>
      
      <p>Study Bhai provides verified, high-yield chapter notes according to the Single National Curriculum and Punjab Curriculum & Textbook Board (PTB) syllabus.</p>

      <h3>Chapter Breakdown Included:</h3>
      <ul>
        <li><strong>Chapter 1: Functions and Limits</strong> - Domain, range, sandwich theorem, and limit evaluation.</li>
        <li><strong>Chapter 2: Differentiation</strong> - Product rule, quotient rule, chain rule, and higher derivatives.</li>
        <li><strong>Chapter 3: Integration</strong> - Indefinite and definite integrals, integration by parts, partial fractions.</li>
        <li><strong>Chapter 4: Introduction to Analytic Geometry</strong> - Equations of straight lines, angle between lines, distance formula.</li>
        <li><strong>Chapter 5: Linear Inequalities and Linear Programming</strong> - Feasible region and optimization.</li>
        <li><strong>Chapter 6: Conic Sections</strong> - Circle, parabola, ellipse, and hyperbola.</li>
        <li><strong>Chapter 7: Vectors</strong> - Dot product, cross product, and scalar triple product.</li>
      </ul>

      <h3>Key Highlights:</h3>
      <p>All notes include step-by-step solved textbook exercises, previous BISE board past questions, and formula cheat sheets.</p>
    `,
    date: '2024-11-15T10:00:00Z',
    modified: '2025-08-01T12:00:00Z',
    featuredImage: {
      src: 'https://cms.studybhai.com/wp-content/uploads/2022/12/class-12-math-notes.png',
      alt: 'Class 12 Math Notes Punjab Board',
      width: 750,
      height: 430
    },
    author: {
      id: 1,
      name: 'Danial Sohail',
      avatar: 'https://secure.gravatar.com/avatar/415cd7973f7c912978dee4d7f73806e5786faf2dec9f71bc5ead4521f6e09e06?s=96'
    },
    categories: ['notes', '12th-class-notes'],
    tags: ['class-12', 'class-12-math-notes', 'ptb', '2nd-year'],
    meta: {
      subject: 'Mathematics',
      grade: '12th (2nd Year)',
      board: 'Punjab Curriculum & Textbook Board (PTB)',
      fileSize: '18.4 MB',
      downloadUrl: '#',
      readTime: '4 min read'
    }
  },
  {
    id: 9999,
    slug: 'hec-stipend-hungaricum-scholarship',
    title: 'HEC Stipend Hungaricum Scholarship 2024 – Complete Guide & Procedure',
    excerpt: 'The pursuit of higher education is a dream for many Pakistani students, and the Stipendium Hungaricum scholarship offers fully-funded bachelor\'s, master\'s, and PhD studies in Hungary.',
    content: `
      <h2>Stipendium Hungaricum Scholarship Complete Guide</h2>
      <p>The Higher Education Commission (HEC) of Pakistan, in collaboration with the Government of Hungary (Tempus Public Foundation), awards hundreds of fully funded scholarships annually for Pakistani and AJK nationals.</p>
      
      <h3>Scholarship Benefits:</h3>
      <ul>
        <li>100% Tuition-free education across leading Hungarian universities.</li>
        <li>Monthly stipend for living expenses (HUFF 43,700 for Bachelor/Master, HUF 140,000 for PhD).</li>
        <li>Free dormitory accommodation or monthly accommodation contribution.</li>
        <li>Comprehensive medical insurance under Hungarian law.</li>
      </ul>

      <h3>Eligibility & Application Process:</h3>
      <p>Candidates must register both on the Tempus Public Foundation portal and the HEC Pakistan scholarship portal (eportal.hec.gov.pk). The HAT (HEC Aptitude Test) or USAT score is mandatory.</p>
    `,
    date: '2024-12-01T08:30:00Z',
    modified: '2025-08-03T04:13:30Z',
    featuredImage: {
      src: 'https://cms.studybhai.com/wp-content/uploads/2023/12/HEC-Stipend-Hungaricum-Scholarship-2024-Your-Complete-Guide-Procedure.png',
      alt: 'HEC Stipend Hungaricum Scholarship Guide',
      width: 1280,
      height: 720
    },
    author: {
      id: 1,
      name: 'Danial Sohail',
      avatar: 'https://secure.gravatar.com/avatar/415cd7973f7c912978dee4d7f73806e5786faf2dec9f71bc5ead4521f6e09e06?s=96'
    },
    categories: ['scholarships', 'student-guides'],
    tags: ['scholarships', 'hec', 'hungary', 'study-abroad'],
    meta: {
      subject: 'Scholarships',
      grade: 'General',
      board: 'HEC Pakistan / Tempus Public Foundation',
      fileSize: '5.2 MB',
      downloadUrl: '#',
      readTime: '6 min read'
    }
  },
  {
    id: 9822,
    slug: 'usat-book-guide-hec-test-pdf',
    title: 'USAT Book Guide – Preparation Material Book USAT HEC Test PDF Download',
    excerpt: 'Have you just taken your 2nd year papers and are now searching for a USAT book for preparing for the HEC Under-graduate Studies Admission Test? Download the complete prep guide here.',
    content: `
      <h2>HEC USAT Test Complete Preparation Guide</h2>
      <p>The Undergraduate Studies Admission Test (USAT) conducted by the Education Testing Council (ETC) of HEC is mandatory for admissions into major public and private universities in Pakistan.</p>

      <h3>USAT Categories:</h3>
      <ul>
        <li><strong>USAT-E:</strong> Pre-Engineering students (Physics, Chemistry, Math).</li>
        <li><strong>USAT-M:</strong> Pre-Medical students (Physics, Chemistry, Biology).</li>
        <li><strong>USAT-A:</strong> Arts and Humanities.</li>
        <li><strong>USAT-CS:</strong> Computer Science and ICS.</li>
        <li><strong>USAT-GS:</strong> General Science.</li>
        <li><strong>USAT-COM:</strong> Commerce.</li>
      </ul>

      <h3>Test Pattern & Scoring:</h3>
      <p>Part 1 includes 75 MCQs (Verbal Reasoning and Quantitative Reasoning) in 100 minutes. Part 2 includes an Essay and Argumentative writing in 40 minutes.</p>
    `,
    date: '2024-08-15T14:20:00Z',
    modified: '2025-07-20T09:15:00Z',
    featuredImage: {
      src: 'https://cms.studybhai.com/wp-content/uploads/2022/08/USAT-Book-HEC-Test.png',
      alt: 'USAT Book Guide HEC Test PDF',
      width: 750,
      height: 430
    },
    author: {
      id: 1,
      name: 'Danial Sohail',
      avatar: 'https://secure.gravatar.com/avatar/415cd7973f7c912978dee4d7f73806e5786faf2dec9f71bc5ead4521f6e09e06?s=96'
    },
    categories: ['notes', 'student-guides'],
    tags: ['usat', 'hec-test', 'admission-guide'],
    meta: {
      subject: 'Admission Tests',
      grade: '12th (2nd Year)',
      board: 'HEC / ETC Pakistan',
      fileSize: '32.1 MB',
      downloadUrl: '#',
      readTime: '5 min read'
    }
  },
  {
    id: 9701,
    slug: 'class-9-physics-ptb-book',
    title: '9th Class Physics Book PTB – Punjab Curriculum & Textbook Board PDF',
    excerpt: 'Download official Class 9 Physics textbook PDF published by Punjab Curriculum and Textbook Board Lahore for English and Urdu medium students.',
    content: `
      <h2>Class 9 Physics Official PTB Textbook</h2>
      <p>Physics is a foundational science for Matric Part 1 students. This official digitized edition is published by the Punjab Curriculum & Textbook Board (PTB), Lahore.</p>
      <h3>Units Included:</h3>
      <ul>
        <li>Unit 1: Physical Quantities and Measurement</li>
        <li>Unit 2: Kinematics</li>
        <li>Unit 3: Dynamics</li>
        <li>Unit 4: Turning Effect of Forces</li>
        <li>Unit 5: Gravitation</li>
        <li>Unit 6: Work and Energy</li>
        <li>Unit 7: Properties of Matter</li>
        <li>Unit 8: Thermal Properties of Matter</li>
        <li>Unit 9: Transfer of Heat</li>
      </ul>
    `,
    date: '2024-05-10T11:00:00Z',
    modified: '2025-06-12T08:00:00Z',
    featuredImage: {
      src: 'https://cms.studybhai.com/wp-content/uploads/2024/03/demo-elearning-footer-bg.png',
      alt: '9th Class Physics Book PTB',
      width: 600,
      height: 400
    },
    author: {
      id: 1,
      name: 'Danial Sohail',
      avatar: 'https://secure.gravatar.com/avatar/415cd7973f7c912978dee4d7f73806e5786faf2dec9f71bc5ead4521f6e09e06?s=96'
    },
    categories: ['ptb-books', 'class-9-books'],
    tags: ['class-9', 'physics', 'ptb-book'],
    meta: {
      subject: 'Physics',
      grade: '9th Class',
      board: 'Punjab Curriculum & Textbook Board (PTB)',
      fileSize: '24.8 MB',
      downloadUrl: '#',
      readTime: '3 min read'
    }
  },
  {
    id: 9702,
    slug: 'class-10-chemistry-ptb-book',
    title: '10th Class Chemistry Book PTB – Punjab Board PDF Download',
    excerpt: 'Download official 10th Class Chemistry book in PDF format for all Punjab boards including Lahore, Rawalpindi, Gujranwala, Faisalabad, Multan, and Sahiwal.',
    content: `
      <h2>Class 10 Chemistry PTB Book</h2>
      <p>Complete official textbook for Matric Part 2 covering Chemical Equilibrium, Acids, Bases & Salts, Organic Chemistry, Hydrocarbons, Biochemistry, The Atmosphere, and Chemical Industries.</p>
    `,
    date: '2024-06-15T09:00:00Z',
    modified: '2025-06-15T09:00:00Z',
    featuredImage: {
      src: 'https://cms.studybhai.com/wp-content/uploads/2024/03/demo-elearning-footer-bg.png',
      alt: '10th Class Chemistry Book PTB',
      width: 600,
      height: 400
    },
    author: {
      id: 1,
      name: 'Danial Sohail',
      avatar: 'https://secure.gravatar.com/avatar/415cd7973f7c912978dee4d7f73806e5786faf2dec9f71bc5ead4521f6e09e06?s=96'
    },
    categories: ['ptb-books', 'class-10-books'],
    tags: ['class-10', 'chemistry', 'ptb-book'],
    meta: {
      subject: 'Chemistry',
      grade: '10th Class',
      board: 'Punjab Curriculum & Textbook Board (PTB)',
      fileSize: '28.3 MB',
      downloadUrl: '#',
      readTime: '3 min read'
    }
  },
  {
    id: 9703,
    slug: 'class-11-biology-notes',
    title: '11th Class Biology Notes – 1st Year Chapter-wise Solved Question Answers',
    excerpt: 'Get high-scoring FSc Pre-Medical 1st year biology revision notes with diagrams, biological classifications, and solved exercise questions.',
    content: `
      <h2>1st Year Biology Comprehensive Notes</h2>
      <p>Specially curated for intermediate pre-medical students preparing for BISE board exams and MDCAT entrance tests. Covers Cell Biology, Biological Molecules, Enzymes, Bioenergetics, and Diversity of Life.</p>
    `,
    date: '2024-07-20T12:00:00Z',
    modified: '2025-07-20T12:00:00Z',
    featuredImage: {
      src: 'https://cms.studybhai.com/wp-content/uploads/2024/03/demo-elearning-footer-bg.png',
      alt: '11th Class Biology Notes',
      width: 600,
      height: 400
    },
    author: {
      id: 1,
      name: 'Danial Sohail',
      avatar: 'https://secure.gravatar.com/avatar/415cd7973f7c912978dee4d7f73806e5786faf2dec9f71bc5ead4521f6e09e06?s=96'
    },
    categories: ['notes', '11th-class-notes'],
    tags: ['class-11', 'biology', 'notes'],
    meta: {
      subject: 'Biology',
      grade: '11th (1st Year)',
      board: 'Punjab / Federal Board',
      fileSize: '21.5 MB',
      downloadUrl: '#',
      readTime: '5 min read'
    }
  },
  {
    id: 9704,
    slug: 'class-10-computer-science-past-papers',
    title: '10th Class Computer Science 5-Year Past Papers Solved PDF',
    excerpt: 'Prepare for your Matric computer exams with solved 5-year past papers from Lahore, Gujranwala, Rawalpindi, and Federal boards.',
    content: `
      <h2>10th Class Computer Science Past Papers Solved</h2>
      <p>Compilation of past board examination questions for C Language programming, logic gates, functions, file handling, and HTML web development.</p>
    `,
    date: '2024-08-01T15:00:00Z',
    modified: '2025-08-01T15:00:00Z',
    featuredImage: {
      src: 'https://cms.studybhai.com/wp-content/uploads/2024/03/demo-elearning-footer-bg.png',
      alt: '10th Class Computer Science Past Papers',
      width: 600,
      height: 400
    },
    author: {
      id: 1,
      name: 'Danial Sohail',
      avatar: 'https://secure.gravatar.com/avatar/415cd7973f7c912978dee4d7f73806e5786faf2dec9f71bc5ead4521f6e09e06?s=96'
    },
    categories: ['past-papers'],
    tags: ['class-10', 'computer-science', 'past-papers'],
    meta: {
      subject: 'Computer Science',
      grade: '10th Class',
      board: 'All Punjab Boards (BISE)',
      fileSize: '16.7 MB',
      downloadUrl: '#',
      readTime: '4 min read'
    }
  },
  {
    id: 9705,
    slug: 'class-9-mathematics-ptb-book',
    title: 'Class 9 Mathematics PTB Book PDF Download (Science Group)',
    excerpt: 'Download the official Punjab Curriculum and Textbook Board (PCTB) Class 9 Mathematics textbook with matrices, logarithms, and algebraic formulas.',
    content: '<h2>Class 9 Mathematics PTB Book</h2><p>Official Punjab curriculum mathematics textbook covering real numbers, matrices, logarithms, and polynomial geometry.</p>',
    date: '2024-09-01T10:00:00Z',
    modified: '2025-08-01T10:00:00Z',
    featuredImage: {
      src: 'https://cms.studybhai.com/wp-content/uploads/2022/12/class-12-math-notes.png',
      alt: 'Class 9 Mathematics PTB Book',
      width: 600,
      height: 400
    },
    author: {
      id: 1,
      name: 'Danial Sohail',
      avatar: 'https://secure.gravatar.com/avatar/415cd7973f7c912978dee4d7f73806e5786faf2dec9f71bc5ead4521f6e09e06?s=96'
    },
    categories: ['ptb-books', 'class-9-books'],
    tags: ['class-9', 'mathematics', 'ptb'],
    meta: {
      subject: 'Mathematics',
      grade: '9th Class',
      board: 'Punjab Curriculum & Textbook Board (PTB)',
      fileSize: '19.2 MB',
      downloadUrl: '#',
      readTime: '5 min read'
    }
  },
  {
    id: 9706,
    slug: 'class-9-biology-ptb-book',
    title: 'Class 9 Biology Punjab Board Official Textbook PDF',
    excerpt: 'Complete high-resolution PDF of PCTB Class 9 Biology book covering cellular biology, biodiversity, enzymes, and bioenergetics.',
    content: '<h2>Class 9 Biology Textbook</h2><p>Official syllabus for Matric part 1 students with diagrams, cellular structure, and laboratory experiments.</p>',
    date: '2024-09-05T10:00:00Z',
    modified: '2025-08-01T10:00:00Z',
    featuredImage: {
      src: 'https://cms.studybhai.com/wp-content/uploads/2024/03/demo-elearning-footer-bg.png',
      alt: 'Class 9 Biology Textbook',
      width: 600,
      height: 400
    },
    author: {
      id: 1,
      name: 'Danial Sohail',
      avatar: 'https://secure.gravatar.com/avatar/415cd7973f7c912978dee4d7f73806e5786faf2dec9f71bc5ead4521f6e09e06?s=96'
    },
    categories: ['ptb-books', 'class-9-books'],
    tags: ['class-9', 'biology', 'ptb'],
    meta: {
      subject: 'Biology',
      grade: '9th Class',
      board: 'Punjab Curriculum & Textbook Board (PTB)',
      fileSize: '17.8 MB',
      downloadUrl: '#',
      readTime: '4 min read'
    }
  },
  {
    id: 9707,
    slug: 'class-10-physics-ptb-book',
    title: 'Class 10 Physics Punjab Curriculum Board Book PDF',
    excerpt: 'Download Matric Class 10 Physics textbook covering simple harmonic motion, waves, sound, geometrical optics, and electrostatics.',
    content: '<h2>Class 10 Physics PTB Textbook</h2><p>Official textbook with solved examples, numerical exercises, and conceptual questions.</p>',
    date: '2024-09-10T10:00:00Z',
    modified: '2025-08-01T10:00:00Z',
    featuredImage: {
      src: 'https://cms.studybhai.com/wp-content/uploads/2023/12/HEC-Stipend-Hungaricum-Scholarship-2024-Your-Complete-Guide-Procedure.png',
      alt: 'Class 10 Physics Book',
      width: 600,
      height: 400
    },
    author: {
      id: 1,
      name: 'Danial Sohail',
      avatar: 'https://secure.gravatar.com/avatar/415cd7973f7c912978dee4d7f73806e5786faf2dec9f71bc5ead4521f6e09e06?s=96'
    },
    categories: ['ptb-books', 'class-10-books'],
    tags: ['class-10', 'physics', 'ptb'],
    meta: {
      subject: 'Physics',
      grade: '10th Class',
      board: 'Punjab Curriculum & Textbook Board (PTB)',
      fileSize: '21.0 MB',
      downloadUrl: '#',
      readTime: '5 min read'
    }
  },
  {
    id: 9708,
    slug: 'class-10-english-ptb-book',
    title: 'Class 10 English Textbook Punjab Board PDF Download',
    excerpt: 'Official English textbook for Class 10 Matric students featuring Hazrat Muhammad (PBUH) as an embodiment of justice, essays, and grammar exercises.',
    content: '<h2>Class 10 English Textbook</h2><p>Comprehensive English textbook with prose, poetry comprehension, and board-pattern grammar exercises.</p>',
    date: '2024-09-15T10:00:00Z',
    modified: '2025-08-01T10:00:00Z',
    featuredImage: {
      src: 'https://cms.studybhai.com/wp-content/uploads/2022/12/class-12-math-notes.png',
      alt: 'Class 10 English Textbook',
      width: 600,
      height: 400
    },
    author: {
      id: 1,
      name: 'Danial Sohail',
      avatar: 'https://secure.gravatar.com/avatar/415cd7973f7c912978dee4d7f73806e5786faf2dec9f71bc5ead4521f6e09e06?s=96'
    },
    categories: ['ptb-books', 'class-10-books'],
    tags: ['class-10', 'english', 'ptb'],
    meta: {
      subject: 'English',
      grade: '10th Class',
      board: 'Punjab Curriculum & Textbook Board (PTB)',
      fileSize: '15.4 MB',
      downloadUrl: '#',
      readTime: '4 min read'
    }
  },
  {
    id: 9709,
    slug: 'class-11-physics-ptb-book',
    title: 'Class 11 Physics 1st Year PTB Official Book PDF',
    excerpt: 'Official PTB textbook for FSc Pre-Engineering and ICS 1st Year students covering vectors, equilibrium, work, energy, and rotational dynamics.',
    content: '<h2>Class 11 Physics Textbook</h2><p>Official 1st Year physics textbook with SI units, dimensional analysis, and fluid dynamics.</p>',
    date: '2024-09-20T10:00:00Z',
    modified: '2025-08-01T10:00:00Z',
    featuredImage: {
      src: 'https://cms.studybhai.com/wp-content/uploads/2024/03/demo-elearning-footer-bg.png',
      alt: 'Class 11 Physics Book',
      width: 600,
      height: 400
    },
    author: {
      id: 1,
      name: 'Danial Sohail',
      avatar: 'https://secure.gravatar.com/avatar/415cd7973f7c912978dee4d7f73806e5786faf2dec9f71bc5ead4521f6e09e06?s=96'
    },
    categories: ['ptb-books', 'class-11-books'],
    tags: ['class-11', 'physics', 'ptb'],
    meta: {
      subject: 'Physics',
      grade: '11th (1st Year)',
      board: 'Punjab Curriculum & Textbook Board (PTB)',
      fileSize: '24.1 MB',
      downloadUrl: '#',
      readTime: '6 min read'
    }
  },
  {
    id: 9710,
    slug: 'class-11-chemistry-ptb-book',
    title: 'Class 11 Chemistry FSc Part 1 PTB Book PDF',
    excerpt: 'Download Class 11 Chemistry official textbook covering basic concepts, states of matter, atomic structure, and chemical equilibrium.',
    content: '<h2>Class 11 Chemistry Textbook</h2><p>Official textbook for pre-medical and pre-engineering intermediate students in Punjab.</p>',
    date: '2024-09-22T10:00:00Z',
    modified: '2025-08-01T10:00:00Z',
    featuredImage: {
      src: 'https://cms.studybhai.com/wp-content/uploads/2023/12/HEC-Stipend-Hungaricum-Scholarship-2024-Your-Complete-Guide-Procedure.png',
      alt: 'Class 11 Chemistry Book',
      width: 600,
      height: 400
    },
    author: {
      id: 1,
      name: 'Danial Sohail',
      avatar: 'https://secure.gravatar.com/avatar/415cd7973f7c912978dee4d7f73806e5786faf2dec9f71bc5ead4521f6e09e06?s=96'
    },
    categories: ['ptb-books', 'class-11-books'],
    tags: ['class-11', 'chemistry', 'ptb'],
    meta: {
      subject: 'Chemistry',
      grade: '11th (1st Year)',
      board: 'Punjab Curriculum & Textbook Board (PTB)',
      fileSize: '22.8 MB',
      downloadUrl: '#',
      readTime: '5 min read'
    }
  },
  {
    id: 9711,
    slug: 'class-12-physics-ptb-book',
    title: 'Class 12 Physics 2nd Year PTB Textbook PDF',
    excerpt: 'Official 2nd year Physics book covering electrostatics, current electricity, electromagnetism, electronics, and nuclear physics.',
    content: '<h2>Class 12 Physics Textbook</h2><p>Punjab board official textbook for HSSC Part 2 pre-engineering and pre-medical examinations.</p>',
    date: '2024-09-25T10:00:00Z',
    modified: '2025-08-01T10:00:00Z',
    featuredImage: {
      src: 'https://cms.studybhai.com/wp-content/uploads/2022/12/class-12-math-notes.png',
      alt: 'Class 12 Physics Textbook',
      width: 600,
      height: 400
    },
    author: {
      id: 1,
      name: 'Danial Sohail',
      avatar: 'https://secure.gravatar.com/avatar/415cd7973f7c912978dee4d7f73806e5786faf2dec9f71bc5ead4521f6e09e06?s=96'
    },
    categories: ['ptb-books', 'class-12-books'],
    tags: ['class-12', 'physics', 'ptb'],
    meta: {
      subject: 'Physics',
      grade: '12th (2nd Year)',
      board: 'Punjab Curriculum & Textbook Board (PTB)',
      fileSize: '25.6 MB',
      downloadUrl: '#',
      readTime: '6 min read'
    }
  },
  {
    id: 9712,
    slug: 'class-12-biology-ptb-book',
    title: 'Class 12 Biology 2nd Year PTB Textbook PDF',
    excerpt: 'Official 2nd year Biology textbook for FSc Pre-Medical students covering homeostasis, support and movement, coordination, and biotechnology.',
    content: '<h2>Class 12 Biology Textbook</h2><p>High-yield medical entrance test (MDCAT) aligned biology textbook published by PCTB.</p>',
    date: '2024-09-28T10:00:00Z',
    modified: '2025-08-01T10:00:00Z',
    featuredImage: {
      src: 'https://cms.studybhai.com/wp-content/uploads/2024/03/demo-elearning-footer-bg.png',
      alt: 'Class 12 Biology Textbook',
      width: 600,
      height: 400
    },
    author: {
      id: 1,
      name: 'Danial Sohail',
      avatar: 'https://secure.gravatar.com/avatar/415cd7973f7c912978dee4d7f73806e5786faf2dec9f71bc5ead4521f6e09e06?s=96'
    },
    categories: ['ptb-books', 'class-12-books'],
    tags: ['class-12', 'biology', 'ptb'],
    meta: {
      subject: 'Biology',
      grade: '12th (2nd Year)',
      board: 'Punjab Curriculum & Textbook Board (PTB)',
      fileSize: '23.4 MB',
      downloadUrl: '#',
      readTime: '5 min read'
    }
  },
  {
    id: 9713,
    slug: 'class-9-chemistry-notes',
    title: 'Class 9 Chemistry All Chapter Solved Notes PDF',
    excerpt: 'Handwritten and board topper solved chapter notes for Class 9 Chemistry: atomic structure, periodic table, and chemical bonding.',
    content: '<h2>Class 9 Chemistry Solved Notes</h2><p>Formulas, short answers, MCQs with explanations, and numerical problems for 9th Matric students.</p>',
    date: '2024-10-01T10:00:00Z',
    modified: '2025-08-01T10:00:00Z',
    featuredImage: {
      src: 'https://cms.studybhai.com/wp-content/uploads/2023/12/HEC-Stipend-Hungaricum-Scholarship-2024-Your-Complete-Guide-Procedure.png',
      alt: 'Class 9 Chemistry Notes',
      width: 600,
      height: 400
    },
    author: {
      id: 1,
      name: 'Danial Sohail',
      avatar: 'https://secure.gravatar.com/avatar/415cd7973f7c912978dee4d7f73806e5786faf2dec9f71bc5ead4521f6e09e06?s=96'
    },
    categories: ['notes', '9th-class-notes'],
    tags: ['class-9', 'chemistry', 'notes'],
    meta: {
      subject: 'Chemistry',
      grade: '9th Class',
      board: 'All Punjab Boards (BISE)',
      fileSize: '14.5 MB',
      downloadUrl: '#',
      readTime: '4 min read'
    }
  },
  {
    id: 9714,
    slug: 'class-10-math-notes',
    title: 'Class 10 Mathematics Matric Solved Chapter Notes',
    excerpt: 'Complete solved theorem notes, quadratic equations, variation, matrices, and geometry exercises for Class 10 Matric examinations.',
    content: '<h2>Class 10 Mathematics Solved Notes</h2><p>Chapter-wise solutions with board-marked theorems and essential formulas for 10th class exams.</p>',
    date: '2024-10-05T10:00:00Z',
    modified: '2025-08-01T10:00:00Z',
    featuredImage: {
      src: 'https://cms.studybhai.com/wp-content/uploads/2022/12/class-12-math-notes.png',
      alt: 'Class 10 Mathematics Notes',
      width: 600,
      height: 400
    },
    author: {
      id: 1,
      name: 'Danial Sohail',
      avatar: 'https://secure.gravatar.com/avatar/415cd7973f7c912978dee4d7f73806e5786faf2dec9f71bc5ead4521f6e09e06?s=96'
    },
    categories: ['notes', '10th-class-notes'],
    tags: ['class-10', 'mathematics', 'notes'],
    meta: {
      subject: 'Mathematics',
      grade: '10th Class',
      board: 'All Punjab Boards (BISE)',
      fileSize: '19.8 MB',
      downloadUrl: '#',
      readTime: '5 min read'
    }
  },
  {
    id: 9715,
    slug: 'class-11-physics-notes',
    title: 'Class 11 Physics 1st Year Solved Formula Sheets & Notes',
    excerpt: 'Comprehensive HSSC Part 1 Physics notes with solved past board numericals, short question answers, and vector derivations.',
    content: '<h2>Class 11 Physics Notes</h2><p>Formulas, numerical solutions, and conceptual questions for FSc 1st year students.</p>',
    date: '2024-10-10T10:00:00Z',
    modified: '2025-08-01T10:00:00Z',
    featuredImage: {
      src: 'https://cms.studybhai.com/wp-content/uploads/2024/03/demo-elearning-footer-bg.png',
      alt: 'Class 11 Physics Notes',
      width: 600,
      height: 400
    },
    author: {
      id: 1,
      name: 'Danial Sohail',
      avatar: 'https://secure.gravatar.com/avatar/415cd7973f7c912978dee4d7f73806e5786faf2dec9f71bc5ead4521f6e09e06?s=96'
    },
    categories: ['notes', '11th-class-notes'],
    tags: ['class-11', 'physics', 'notes'],
    meta: {
      subject: 'Physics',
      grade: '11th (1st Year)',
      board: 'All Punjab Boards (BISE)',
      fileSize: '22.3 MB',
      downloadUrl: '#',
      readTime: '6 min read'
    }
  },
  {
    id: 9716,
    slug: 'class-12-chemistry-notes',
    title: 'Class 12 Chemistry Organic & Inorganic Notes PDF',
    excerpt: 'Detailed chapter notes for 2nd Year Chemistry covering reaction mechanisms, s & p block elements, aromatic hydrocarbons, and biochemistry.',
    content: '<h2>Class 12 Chemistry Notes</h2><p>Organic reaction mechanisms, functional groups, and board question answers for HSSC Part 2.</p>',
    date: '2024-10-15T10:00:00Z',
    modified: '2025-08-01T10:00:00Z',
    featuredImage: {
      src: 'https://cms.studybhai.com/wp-content/uploads/2023/12/HEC-Stipend-Hungaricum-Scholarship-2024-Your-Complete-Guide-Procedure.png',
      alt: 'Class 12 Chemistry Notes',
      width: 600,
      height: 400
    },
    author: {
      id: 1,
      name: 'Danial Sohail',
      avatar: 'https://secure.gravatar.com/avatar/415cd7973f7c912978dee4d7f73806e5786faf2dec9f71bc5ead4521f6e09e06?s=96'
    },
    categories: ['notes', '12th-class-notes'],
    tags: ['class-12', 'chemistry', 'notes'],
    meta: {
      subject: 'Chemistry',
      grade: '12th (2nd Year)',
      board: 'All Punjab Boards (BISE)',
      fileSize: '20.6 MB',
      downloadUrl: '#',
      readTime: '5 min read'
    }
  }
];
