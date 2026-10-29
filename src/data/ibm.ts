// Counts calculated from WA_Fn-UseC_-HR-Employee-Attrition.csv (IBM-Employee-Attrition-Analysis repo).
// Rate = employees with Attrition = "Yes" ÷ all employees in the same group, matching the
// project's DAX measure: Attrition Rate (%) = DIVIDE([Employee who left], [Total Employees]).

export const REPO = 'https://github.com/WoleTheAnalyst/IBM-Employee-Attrition-Analysis';
export const DATASET = 'https://www.kaggle.com/datasets/pavansubhasht/ibm-hr-analytics-attrition-dataset';

export type Group = { label: string; n: number; left: number; note?: string };

export const overall = { n: 1470, left: 237, columns: 35 };

// Matches the dashboard's job-role table exactly.
export const jobRoles: Group[] = [
  { label: 'Sales Representative', n: 83, left: 33 },
  { label: 'Laboratory Technician', n: 259, left: 62 },
  { label: 'Human Resources', n: 52, left: 12 },
  { label: 'Sales Executive', n: 326, left: 57 },
  { label: 'Research Scientist', n: 292, left: 47 },
  { label: 'Manufacturing Director', n: 145, left: 10 },
  { label: 'Healthcare Representative', n: 131, left: 9 },
  { label: 'Manager', n: 102, left: 5 },
  { label: 'Research Director', n: 80, left: 2 },
];

export const departments: Group[] = [
  { label: 'Sales', n: 446, left: 92 },
  { label: 'Human Resources', n: 63, left: 12 },
  { label: 'Research & Development', n: 961, left: 133 },
];

// WorkLifeBalance codes 1–4 as labelled in the dataset documentation.
export const workLifeBalance: Group[] = [
  { label: '1 · Bad', n: 80, left: 25 },
  { label: '2 · Good', n: 344, left: 58 },
  { label: '3 · Better', n: 893, left: 127 },
  { label: '4 · Best', n: 153, left: 27 },
];

// Brackets follow the project's Age Bracket calculated column.
export const ageBrackets: Group[] = [
  { label: '18–20', n: 28, left: 16, note: 'small group' },
  { label: '21–30', n: 358, left: 84 },
  { label: '31–40', n: 619, left: 85 },
  { label: '41–50', n: 322, left: 34 },
  { label: '51–60', n: 143, left: 18 },
];

export const gender: Group[] = [
  { label: 'Male', n: 882, left: 150 },
  { label: 'Female', n: 588, left: 87 },
];

// One decimal place, except exact half-way values (e.g. 25 ÷ 80 = 31.25%), which are shown in
// full so the figure isn't silently rounded up or down.
export const rate = (g: { n: number; left: number }, digits = 1) => {
  const r = (g.left / g.n) * 100;
  const scaled = r * 10 ** (digits + 1);
  const isTie = Math.abs(scaled - Math.round(scaled)) < 1e-9 && Math.round(scaled) % 10 === 5;
  return r.toFixed(isTie ? digits + 1 : digits);
};
