// Figures transcribed from Northwind_Traders_BI_Report.pdf (Northwind-Traders-Business-Intelligence-Report repo).
// `page` is the PDF page the figure appears on. Every series below sums to the report's $1,265,793 total.

export const REPORT_PDF =
  'https://github.com/WoleTheAnalyst/Northwind-Traders-Business-Intelligence-Report/blob/main/Northwind_Traders_BI_Report.pdf';
export const REPO =
  'https://github.com/WoleTheAnalyst/Northwind-Traders-Business-Intelligence-Report';
export const LIVE_DASHBOARD =
  'https://app.powerbi.com/view?r=eyJrIjoiMTAyYjg5ZDYtODg0OC00N2JmLWE1NjUtZGU1MmExODljMmMzIiwidCI6IjU2YjNjMjUzLTdlM2MtNDFjNC04NjEwLTc4YjIyYWNjN2E2MCJ9';

// Orders and customers as shown on the dashboard's KPI cards (report page 1 screenshot).
export const totals = { revenue: 1_265_793, orders: 830, customers: 830, page: 2 };

export const quarters = {
  page: 2,
  rows: [
    { label: 'Q3 2013', value: 79_729 },
    { label: 'Q4 2013', value: 128_355 },
    { label: 'Q1 2014', value: 138_289 },
    { label: 'Q2 2014', value: 143_177 },
    { label: 'Q3 2014', value: 153_938 },
    { label: 'Q4 2014', value: 181_681 },
    { label: 'Q1 2015', value: 298_492 },
    { label: 'Q2 2015', value: 142_132, partial: true },
  ],
};

export const months = {
  pages: '2–3',
  rows: [
    { label: 'Jul 2013', value: 27_862 },
    { label: 'Aug 2013', value: 25_485 },
    { label: 'Sep 2013', value: 26_381 },
    { label: 'Oct 2013', value: 37_516 },
    { label: 'Nov 2013', value: 45_600 },
    { label: 'Dec 2013', value: 45_240 },
    { label: 'Jan 2014', value: 61_258 },
    { label: 'Feb 2014', value: 38_484 },
    { label: 'Mar 2014', value: 38_547 },
    { label: 'Apr 2014', value: 53_033 },
    { label: 'May 2014', value: 53_781 },
    { label: 'Jun 2014', value: 36_363 },
    { label: 'Jul 2014', value: 51_021 },
    { label: 'Aug 2014', value: 47_288 },
    { label: 'Sep 2014', value: 55_629 },
    { label: 'Oct 2014', value: 66_749 },
    { label: 'Nov 2014', value: 43_534 },
    { label: 'Dec 2014', value: 71_398 },
    { label: 'Jan 2015', value: 94_222 },
    { label: 'Feb 2015', value: 99_415 },
    { label: 'Mar 2015', value: 104_854 },
    { label: 'Apr 2015', value: 123_799 },
    { label: 'May 2015', value: 18_334, partial: true },
  ],
};

export const categories = {
  page: 4,
  rows: [
    { label: 'Beverages', value: 267_868 },
    { label: 'Dairy Products', value: 234_507 },
    { label: 'Confections', value: 167_357 },
    { label: 'Meat & Poultry', value: 163_022 },
    { label: 'Seafood', value: 131_262 },
    { label: 'Condiments', value: 106_047 },
    { label: 'Produce', value: 99_985 },
    { label: 'Grains & Cereals', value: 95_745 },
  ],
};

// Share of revenue from the dashboard's Discontinued vs Active donut (report page 2 screenshot).
export const productShare = { active: 89.61, discontinued: 10.39 };

export const topProducts = {
  pages: '4–5',
  rows: [
    { label: 'Côte de Blaye', category: 'Beverages', value: 141_397, discontinued: false },
    { label: 'Thüringer Rostbratwurst', category: 'Meat & Poultry', value: 80_369, discontinued: true },
    { label: 'Raclette Courdavault', category: 'Dairy Products', value: 71_156, discontinued: false },
    { label: 'Tarte au sucre', category: 'Confections', value: 47_235, discontinued: false },
    { label: 'Camembert Pierrot', category: 'Dairy Products', value: 46_825, discontinued: false },
    { label: 'Gnocchi di nonna Alice', category: 'Grains & Cereals', value: 42_593, discontinued: false },
    { label: 'Manjimup Dried Apples', category: 'Produce', value: 41_820, discontinued: false },
    { label: 'Alice Mutton', category: 'Meat & Poultry', value: 32_698, discontinued: true },
    { label: 'Carnarvon Tigers', category: 'Seafood', value: 29_172, discontinued: false },
    { label: 'Rössle Sauerkraut', category: 'Meat & Poultry', value: 25_697, discontinued: true },
  ],
};

export const countries = {
  page: 6,
  rows: [
    { label: 'USA', value: 245_585 },
    { label: 'Germany', value: 230_285 },
    { label: 'Austria', value: 128_004 },
    { label: 'Brazil', value: 106_926 },
    { label: 'France', value: 81_358 },
    { label: 'UK', value: 58_971 },
    { label: 'Venezuela', value: 56_811 },
    { label: 'Sweden', value: 54_495 },
    { label: 'Canada', value: 50_196 },
    { label: 'Ireland', value: 49_980 },
    { label: 'Belgium', value: 33_825 },
    { label: 'Denmark', value: 32_661 },
    { label: 'Switzerland', value: 31_693 },
    { label: 'Mexico', value: 23_582 },
    { label: 'Finland', value: 18_810 },
    { label: 'Spain', value: 17_983 },
    { label: 'Italy', value: 15_770 },
    { label: 'Portugal', value: 11_472 },
    { label: 'Argentina', value: 8_119 },
    { label: 'Norway', value: 5_735 },
    { label: 'Poland', value: 3_532 },
  ],
};

export const shippers = {
  page: 7,
  rows: [
    { label: 'United Package', orders: 326, freight: 91_570 },
    { label: 'Federal Shipping', orders: 255, freight: 63_445 },
    { label: 'Speedy Express', orders: 249, freight: 52_291 },
  ],
};

export const employees = {
  pages: '7–8',
  rows: [
    { label: 'Margaret Peacock', value: 232_891, orders: 156 },
    { label: 'Janet Leverling', value: 202_813, orders: 127 },
    { label: 'Nancy Davolio', value: 192_108, orders: 123 },
    { label: 'Andrew Fuller', value: 166_538, orders: 96 },
    { label: 'Laura Callahan', value: 126_862, orders: 104 },
    { label: 'Robert King', value: 124_568, orders: 72 },
    { label: 'Anne Dodsworth', value: 77_308, orders: 43 },
    { label: 'Michael Suyama', value: 73_913, orders: 67 },
    { label: 'Steven Buchanan', value: 68_792, orders: 42 },
  ],
};

export const sum = (rows: { value: number }[]) => rows.reduce((a, r) => a + r.value, 0);
export const pct = (part: number, whole: number, digits = 1) => ((part / whole) * 100).toFixed(digits);
