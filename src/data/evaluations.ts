// Illustrative AI-evaluation examples written for this portfolio. Prompts and responses are invented;
// every judgement is checked against the public, fictional datasets in the portfolio's case studies.
// None of this comes from employer or client work.

export type Severity = 'major' | 'minor' | 'pass';
export type ErrorType =
  | 'Instruction-following failure'
  | 'Constraint violation'
  | 'Factual error'
  | 'Unsupported claim'
  | 'Misread metric'
  | 'Unwarranted causal claim';

export const SEVERITY: Record<Severity, { glyph: string; text: string }> = {
  major: { glyph: '✗', text: 'Major issue' },
  minor: { glyph: '!', text: 'Minor issue' },
  pass: { glyph: '✓', text: 'Pass' },
};

export const taxonomy: { type: ErrorType; what: string }[] = [
  { type: 'Instruction-following failure', what: 'Does something the prompt ruled out, or skips something it asked for.' },
  { type: 'Constraint violation', what: 'Breaks an explicit limit: length, format, scope or audience.' },
  { type: 'Factual error', what: 'States something the source contradicts.' },
  { type: 'Unsupported claim', what: "Adds detail the source doesn't contain, however plausible it sounds." },
  { type: 'Misread metric', what: 'Uses the wrong denominator or definition, so a real number answers the wrong question.' },
  { type: 'Unwarranted causal claim', what: "Explains why something happened when the data only shows that it happened." },
];

export const method = [
  { step: 'Read the instruction', detail: 'List exactly what was asked, every constraint, and anything ruled out, before reading the response.' },
  { step: 'Fix the criteria', detail: 'Set the rubric before judging, so the score reflects the task and not my first impression.' },
  { step: 'Check every claim at the source', detail: 'Each number and statement is traced to the data or document it should come from.' },
  { step: 'Classify each error', detail: 'Name the error type and its severity, so issues are comparable across responses and reviewers.' },
  { step: 'Write the rationale', detail: 'Explain each judgement with its evidence, and show what a correct answer looks like.' },
];

export type Segment = { text: string; flag?: number };
export type Note = { n: number; type: ErrorType; severity: Severity; note: string };
export type Example = {
  id: string;
  title: string;
  skill: string;
  source: { label: string; href: string };
  prompt: string;
  response: Segment[];
  notes: Note[];
  rubric: { criterion: string; result: Severity; comment: string }[];
  verdict: string;
  corrected: string;
};

export const RUBRIC_CRITERIA = ['Instruction following', 'Factual accuracy', 'Grounding in the source', 'Reasoning', 'Format and constraints'];

export const examples: Example[] = [
  {
    id: 'northwind',
    title: 'A confident answer with both numbers wrong',
    skill: 'Fact-checking against a source table',
    source: { label: 'Northwind Traders case study', href: '/work/northwind-traders-bi-report/' },
    prompt: 'Using the Northwind Traders report, which month had the highest revenue, and what share of revenue came from discontinued products?',
    response: [
      { text: 'Revenue peaked in December 2014 at $71,398', flag: 1 },
      { text: ', ' },
      { text: 'showing strong holiday demand', flag: 2 },
      { text: '. Discontinued products made up only ' },
      { text: '10.39% of revenue', flag: 3 },
      { text: ', so ' },
      { text: 'the decision to discontinue them had little effect on sales', flag: 4 },
      { text: '.' },
    ],
    notes: [
      { n: 1, type: 'Factual error', severity: 'major', note: "The report's monthly table shows April 2015 highest, at $123,799. January, February and March 2015 are also all higher than December 2014 ($71,398)." },
      { n: 2, type: 'Unwarranted causal claim', severity: 'minor', note: 'The data records revenue by month, not why customers bought. "Holiday demand" is an explanation the source never offers.' },
      { n: 3, type: 'Misread metric', severity: 'major', note: "10.39% is the share of products that are discontinued (8 of 77), as counted by the dashboard's donut. Measured by revenue, discontinued products account for $184,991, which is 14.6%." },
      { n: 4, type: 'Unwarranted causal claim', severity: 'major', note: "Sales history can't show what would have happened without the discontinuation. And 14.6% isn't small: one discontinued product ranks second of all 77 by revenue." },
    ],
    rubric: [
      { criterion: 'Instruction following', result: 'pass', comment: 'Answers both parts of the question.' },
      { criterion: 'Factual accuracy', result: 'major', comment: 'Both headline numbers are wrong.' },
      { criterion: 'Grounding in the source', result: 'major', comment: 'Adds an explanation the report never makes.' },
      { criterion: 'Reasoning', result: 'major', comment: 'Draws a causal conclusion from descriptive data.' },
      { criterion: 'Format and constraints', result: 'pass', comment: 'Concise and readable.' },
    ],
    verdict: 'Fail. It reads well, but both facts the user asked for are wrong, and the conclusion rests on a misread metric.',
    corrected: 'April 2015 had the highest revenue, at $123,799. Discontinued products accounted for $184,991, or 14.6% of total revenue.',
  },
  {
    id: 'ibm',
    title: 'The right count, the wrong denominator',
    skill: 'Checking how a rate was calculated',
    source: { label: 'IBM Employee Attrition case study', href: '/work/ibm-employee-attrition/' },
    prompt: 'Using the IBM HR attrition dataset, which department has the lowest attrition rate? Give the rate.',
    response: [
      { text: 'The ' },
      { text: 'Human Resources department', flag: 1 },
      { text: ' has the lowest attrition rate, at ' },
      { text: '0.8%', flag: 2 },
      { text: ', which suggests ' },
      { text: 'HR staff are the most satisfied employees in the company', flag: 3 },
      { text: '.' },
    ],
    notes: [
      { n: 1, type: 'Factual error', severity: 'major', note: 'Research & Development has the lowest department rate: 133 of 961 employees, 13.8%. Human Resources, at 19.0%, is the middle of the three departments.' },
      { n: 2, type: 'Misread metric', severity: 'major', note: '0.8% is 12 ÷ 1,470: HR leavers as a share of the whole workforce. The department\'s own rate is 12 ÷ 63 = 19.0%.' },
      { n: 3, type: 'Unsupported claim', severity: 'minor', note: "An attrition rate doesn't measure satisfaction, and this one is wrong anyway. The dataset has separate satisfaction fields (job, environment and relationship satisfaction) that the response never checks." },
    ],
    rubric: [
      { criterion: 'Instruction following', result: 'pass', comment: 'Names a department and gives a rate, as asked.' },
      { criterion: 'Factual accuracy', result: 'major', comment: 'Wrong department and wrong rate.' },
      { criterion: 'Grounding in the source', result: 'minor', comment: 'The satisfaction claim goes beyond the figure used.' },
      { criterion: 'Reasoning', result: 'major', comment: 'Divides by the whole workforce instead of the department.' },
      { criterion: 'Format and constraints', result: 'pass', comment: 'One clear sentence.' },
    ],
    verdict: 'Fail. A denominator error produced an impossible-looking low rate, and the response built a conclusion on it instead of questioning it.',
    corrected: 'Research & Development has the lowest attrition rate: 13.8% (133 of 961 employees).',
  },
  {
    id: 'palladium',
    title: 'A good summary that ignores the brief',
    skill: 'Instruction following and constraints',
    source: { label: 'Palladium Bank case study', href: '/work/palladium-bank-data-warehouse/' },
    prompt: "In no more than 40 words, summarise how the Palladium Bank warehouse is designed. Don't make recommendations.",
    response: [
      { text: "Palladium Bank's warehouse uses a star schema with one fact table at transaction grain and five dimensions. " },
      { text: 'Customer history is tracked with SCD Type 2', flag: 1 },
      { text: ', and ' },
      { text: 'the fact table is partitioned by year for performance', flag: 2 },
      { text: '. ' },
      { text: 'The bank should next add a Power BI dashboard on top of the monthly reporting table to monitor branch performance.', flag: 3 },
    ],
    notes: [
      { n: 1, type: 'Factual error', severity: 'major', note: "SCD Type 2 is in the design but not in the SQL that was built, so customer tier history isn't tracked yet." },
      { n: 2, type: 'Unsupported claim', severity: 'major', note: 'Partitioning was considered and deferred because it conflicted with the unique transaction-ID index. The warehouse isn\'t partitioned.' },
      { n: 3, type: 'Instruction-following failure', severity: 'major', note: 'The prompt ruled out recommendations, and this sentence is one.' },
      { n: 4, type: 'Constraint violation', severity: 'major', note: 'The response is 55 words against a 40-word limit.' },
    ],
    rubric: [
      { criterion: 'Instruction following', result: 'major', comment: 'Makes a recommendation the prompt ruled out.' },
      { criterion: 'Factual accuracy', result: 'major', comment: 'Describes SCD Type 2 as built when it is only designed.' },
      { criterion: 'Grounding in the source', result: 'major', comment: "Invents partitioning that doesn't exist." },
      { criterion: 'Reasoning', result: 'pass', comment: 'The star-schema description itself is correct.' },
      { criterion: 'Format and constraints', result: 'major', comment: '55 words against a limit of 40.' },
    ],
    verdict: 'Fail. The first sentence is accurate, but the response breaks both explicit instructions and states two design features that were never built.',
    corrected: 'A star schema: one transaction-grain fact table joined to five dimensions (date, customer, branch, product and channel), loaded through staged ETL with a duplicate guard and data-quality checks, plus a monthly branch table for reporting.',
  },
];
