// Sources: palladium_bank_schema.sql, README.md and Schema Diagram.png in the
// Palladium-Bank-Data-Warehouse-Transaction-Analytics repo, and the author's design write-up
// ("Palladium Bank — Dimensional Model Design Explanation").

export const REPO = 'https://github.com/WoleTheAnalyst/Palladium-Bank-Data-Warehouse-Transaction-Analytics';
export const SQL_FILE = `${REPO}/blob/main/palladium_bank_schema.sql`;

// Business questions the model was designed to answer (design write-up).
export const questions = [
  'Which customer tier generates the most fee income?',
  'Are high-value customers reducing their activity over time?',
  'How do branches perform across Lagos, Abuja, Kano, Port Harcourt and Ibadan?',
  'Which products drive deposits, and which drive withdrawals?',
  'Do customers prefer digital or physical channels?',
  'How does activity compare month on month and year on year?',
];

// Requirement → decision → reason, in the order the write-up presents them.
export const decisions = [
  {
    need: 'Reports were slow and inconsistent because every query scanned one 15-column flat file.',
    decision: 'Star schema: one fact table surrounded by five dimension tables.',
    why: 'Descriptive data is stored once in a dimension, and the fact table holds only keys and amounts, so queries read only what they need.',
  },
  {
    need: 'Questions such as "are high-value customers reducing activity?" need every individual transaction.',
    decision: 'Fact grain: one row per transaction.',
    why: 'A fine grain can always be summed up to weeks or months; a summary can never be broken back down.',
  },
  {
    need: "A customer's tier can change, but historical reports should show the tier they held at the time.",
    decision: 'Customer dimension designed as SCD Type 2, with effective date, expiry date and a current flag.',
    why: 'A tier change inserts a new row and expires the old one, so history is never overwritten.',
    caveat: true,
  },
  {
    need: 'Branch names and locations rarely change, and an old branch name has no reporting value.',
    decision: 'Branch dimension handled as SCD Type 1 (overwrite).',
    why: 'Keeps the design simple where tracking history adds nothing.',
  },
  {
    need: 'Dashboards filter and join on date, customer and branch most often.',
    decision: 'Indexes on the three most-used fact-table keys.',
    why: 'The database jumps straight to matching rows instead of reading the whole table.',
  },
  {
    need: 'Dashboard queries should not sum the full fact table every time.',
    decision: 'A pre-aggregated table of monthly totals per branch.',
    why: 'Reports read a small summary table instead of joining and summing every transaction.',
  },
  {
    need: 'Very large volumes would eventually need partitioning.',
    decision: 'Partitioning by year considered and deferred.',
    why: 'It conflicted with the unique index on transaction ID in MySQL; recommended as the next step for production volumes.',
  },
];

// Tables and columns as created in the SQL (not as drawn in the diagram).
export const fact = {
  name: 'fact_transactions',
  keys: [
    { col: 'date_key', dim: 'date' },
    { col: 'customer_key', dim: 'customer' },
    { col: 'branch_key', dim: 'branch' },
    { col: 'product_key', dim: 'product' },
    { col: 'channel_key', dim: 'channel' },
  ],
  measures: ['txn_id (unique)', 'txn_type', 'amount', 'balance_after'],
};

export const dims = [
  { id: 'date', name: 'dim_date', cols: ['date_key (YYYYMMDD)', 'full_date', 'day_number', 'month_number', 'month_name', 'quarter_number', 'year_number'], enables: 'Month-on-month and year-on-year comparisons.' },
  { id: 'customer', name: 'dim_customer', cols: ['customer_key', 'customer_id', 'customer_name', 'tier'], enables: 'Segmentation by customer tier, such as fee income by tier.' },
  { id: 'branch', name: 'dim_branch', cols: ['branch_key', 'branch_id', 'branch_name', 'state'], enables: 'Branch performance and geographic reporting by state.' },
  { id: 'product', name: 'dim_product', cols: ['product_key', 'product_id', 'product_name', 'product_type'], enables: 'Which products drive deposits versus withdrawals.' },
  { id: 'channel', name: 'dim_channel', cols: ['channel_key', 'channel_name'], enables: 'Channel mix: POS, ATM or mobile app; digital versus physical.' },
];

export const etl = [
  { step: 'Stage the raw data', detail: 'The CSV export is loaded into a staging table, `transaction_data - Sheet1`.' },
  { step: 'Fix the money columns', detail: 'The amount and balance headers arrive garbled ("Amount (â‚¦)" is the naira sign read with the wrong text encoding). They are renamed to `amount` and `balance_after` and converted to NUMERIC(18,2).' },
  { step: 'Load the dimensions', detail: 'Customers, branches, products and channels are loaded with SELECT DISTINCT, so each appears once.' },
  { step: 'Build the date dimension', detail: 'Each transaction date becomes an integer key (YYYYMMDD) with day, month, quarter and year columns.' },
  { step: 'Load the fact table', detail: 'Staging rows are joined to every dimension to look up surrogate keys, then inserted one row per transaction.' },
  { step: 'Guard incremental loads', detail: 'Later loads insert only transactions whose ID is not already in the fact table, and only customers not already in the customer dimension.' },
];

export const sql = {
  fact: `INSERT INTO fact_transactions
  (date_key, customer_key, branch_key, product_key, channel_key,
   txn_id, txn_type, amount, balance_after)
SELECT
  CAST(DATE_FORMAT(s.txn_date, '%Y%m%d') AS UNSIGNED),
  c.customer_key, b.branch_key, p.product_key, ch.channel_key,
  s.txn_id, s.txn_type, s.amount, s.balance_after
FROM \`transaction_data - Sheet1\` s
JOIN dim_customer c ON s.customer_id = c.customer_id
JOIN dim_branch   b ON s.branch_id   = b.branch_id
JOIN dim_product  p ON s.product_id  = p.product_id
JOIN dim_channel ch ON s.channel     = ch.channel_name
WHERE s.txn_id NOT IN (SELECT txn_id FROM fact_transactions);`,
  agg: `INSERT INTO agg_monthly_branch_revenue (...)
SELECT d.year_number, d.month_number, d.month_name,
       b.branch_key, b.branch_name, b.state,
       COUNT(f.transaction_key),
       SUM(f.amount),
       SUM(CASE WHEN f.txn_type = 'Deposit' THEN f.amount ELSE 0 END),
       SUM(CASE WHEN f.txn_type IN ('Withdrawal', 'ATM Withdrawal')
                THEN f.amount ELSE 0 END),
       COUNT(DISTINCT f.customer_key)
FROM fact_transactions f
JOIN dim_date d   ON f.date_key   = d.date_key
JOIN dim_branch b ON f.branch_key = b.branch_key
GROUP BY d.year_number, d.month_number, d.month_name,
         b.branch_key, b.branch_name, b.state;`,
};

export const checks = [
  { name: 'Missing amounts', catches: 'Transactions with no amount, which would silently drop out of every total.', sql: 'SELECT * FROM `transaction_data - Sheet1`\nWHERE amount IS NULL;' },
  { name: 'Duplicate transactions', catches: 'The same transaction ID appearing more than once, which would double-count revenue.', sql: 'SELECT txn_id, COUNT(*) FROM `transaction_data - Sheet1`\nGROUP BY txn_id HAVING COUNT(*) > 1;' },
  { name: 'Negative amounts', catches: 'Amounts below zero, which suggest a sign or entry error because direction is held in the transaction type.', sql: 'SELECT * FROM `transaction_data - Sheet1`\nWHERE amount < 0;' },
  { name: 'Orphaned customers', catches: "Transactions whose customer didn't load into the customer dimension, which the fact-table join would silently drop.", sql: 'SELECT s.txn_id FROM `transaction_data - Sheet1` s\nLEFT JOIN dim_customer c ON s.customer_id = c.customer_id\nWHERE c.customer_key IS NULL;' },
];

export const aggColumns = [
  ['year_number, month_number, month_name', 'The month (with branch, forms the primary key)'],
  ['branch_key, branch_name, state', 'The branch and its state'],
  ['total_txn_count', 'Number of transactions'],
  ['total_txn_volume', 'Sum of all transaction amounts'],
  ['total_deposits', 'Sum of deposit transactions'],
  ['total_withdrawals', 'Sum of withdrawals, including ATM withdrawals'],
  ['unique_customers', 'Distinct customers active at the branch that month'],
];
