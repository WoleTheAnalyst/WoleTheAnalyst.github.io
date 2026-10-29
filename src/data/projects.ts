// Registry of published projects. A project must declare its status and context so every
// card and fact sheet shows what kind of work it is. Unpublished projects are not listed here.

export type Status = 'verified' | 'in-progress' | 'simulated' | 'needs-evidence';
export type Discipline = 'Business Analysis' | 'Data & BI' | 'AI & Quality';

export type Project = {
  slug: string;
  title: string;
  summary: string;
  question: string;
  disciplines: Discipline[];
  status: Status;
  context: string;
  tools: string[];
  period: string;
  repo: string;
};

export const STATUS_LABEL: Record<Status, { glyph: string; text: string }> = {
  verified: { glyph: '✓', text: 'Evidence reviewed' },
  'in-progress': { glyph: '◐', text: 'In progress' },
  simulated: { glyph: '◇', text: 'Simulated scenario' },
  'needs-evidence': { glyph: '⚑', text: 'Needs evidence' },
};

export const projects: Project[] = [
  {
    slug: 'northwind-traders-bi-report',
    title: 'Northwind Traders Business Intelligence Report',
    summary:
      'A three-page Power BI report and written report on 23 months of sales for a fictional gourmet food supplier: revenue trend, product mix, markets, shippers and the sales team.',
    question: 'Where does revenue come from, and which patterns deserve a closer look?',
    disciplines: ['Data & BI', 'Business Analysis'],
    status: 'verified',
    context: 'Data Analytics Stage 3 task (HNG Internship project files)',
    tools: ['Power BI', 'DAX', 'Excel'],
    period: 'Data: Jul 2013 – May 2015 · Report: Apr 2026',
    repo: 'https://github.com/WoleTheAnalyst/Northwind-Traders-Business-Intelligence-Report',
  },
  {
    slug: 'ibm-employee-attrition',
    title: 'IBM Employee Attrition Analysis',
    summary:
      'A Power BI dashboard on the public IBM HR sample dataset (1,470 fictional employees), comparing attrition rates by job role, department, age, gender and work-life balance.',
    question: 'Which employee groups leave at the highest rates, and where should HR look first?',
    disciplines: ['Data & BI'],
    status: 'verified',
    context: 'Personal project on a public dataset',
    tools: ['Power BI', 'DAX', 'Excel'],
    period: '2025',
    repo: 'https://github.com/WoleTheAnalyst/IBM-Employee-Attrition-Analysis',
  },
];
