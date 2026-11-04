// Roles and dates exactly as on public/Kolawole_Odewusi_Resume.pdf. Keep the two in step.

export type Area = 'AI evaluation' | 'Data & business analysis';

export type Role = { title: string; org: string; when: string; area: Area; note?: string };

export const roles: Role[] = [
  { title: 'Video Annotation Specialist (Robotics)', org: 'Micro1 AI', when: 'Aug 2026 – Present', area: 'AI evaluation' },
  { title: 'Video Annotation Specialist (AI Evaluation)', org: 'Turing', when: 'Jun – Jul 2026', area: 'AI evaluation' },
  { title: 'Video Data Reviewer', org: 'Micro1 AI', when: 'May – Jun 2026', area: 'AI evaluation' },
  { title: 'Data Analyst Intern', org: 'HNG Internship', when: 'Apr – May 2026', area: 'Data & business analysis' },
  { title: 'Business Analyst, AI Evaluation Specialist', org: 'Turing', when: 'Oct 2025 – Mar 2026', area: 'AI evaluation' },
  { title: 'Financial & Customer Insight Analyst', org: 'Onibuore Event Management', when: 'Mar 2021 – Sep 2024', area: 'Data & business analysis', note: 'Part-time' },
];

export const education = [
  { title: 'MBA', org: 'Lagos State University', when: 'In progress · expected 2027' },
  { title: 'B.Sc. Human Anatomy', org: 'Bowen University', when: '' },
];

export const RESUME = '/Kolawole_Odewusi_Resume.pdf';
