export interface NavItem {
  label: string;
  href: string;
  badge?: string;
  children?: {
    label: string;
    href: string;
    description?: string;
  }[];
}

export const NAV_ITEMS: NavItem[] = [
  {
    label: 'Home',
    href: '/'
  },
  {
    label: 'Books',
    href: '/books/',
    children: [
      { label: '9th Class Books', href: '/books/class-9/', description: 'Matric Part 1 official PTB textbooks' },
      { label: '10th Class Books', href: '/books/class-10/', description: 'Matric Part 2 official PTB textbooks' },
      { label: '11th Class Books', href: '/books/class-11/', description: 'Intermediate 1st Year PTB textbooks' },
      { label: '12th Class Books', href: '/books/class-12/', description: 'Intermediate 2nd Year PTB textbooks' },
    ]
  },
  {
    label: 'Notes',
    href: '/notes/',
    children: [
      { label: '9th Class Notes', href: '/notes/class-9/', description: 'Chapter-wise revision notes & formulas' },
      { label: '10th Class Notes', href: '/notes/class-10/', description: 'Solved exercises and board past papers' },
      { label: '11th Class Notes', href: '/notes/class-11/', description: 'FSc / ICS 1st Year study notes' },
      { label: '12th Class Notes', href: '/notes/class-12/', description: 'FSc / ICS 2nd Year study notes' },
    ]
  },
  {
    label: 'Past Papers',
    href: '/past-papers/'
  },
  {
    label: 'Student Guides',
    href: '/guides/'
  },
  {
    label: 'Scholarships',
    href: '/scholarships/'
  },
  {
    label: 'About',
    href: '/about/'
  },
  {
    label: 'Contact',
    href: '/contact/'
  }
];
