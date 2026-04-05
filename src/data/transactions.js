const SEED_DATA = [
  { id: 1, date: '2025-01-03', desc: 'Monthly Salary', cat: 'Salary', type: 'income', amount: 4500 },
  { id: 2, date: '2025-01-05', desc: 'Apartment Rent', cat: 'Housing', type: 'expense', amount: 1200 },
  { id: 3, date: '2025-01-07', desc: 'Grocery Run', cat: 'Food', type: 'expense', amount: 87.50 },
  { id: 4, date: '2025-01-10', desc: 'Netflix Subscription', cat: 'Entertainment', type: 'expense', amount: 15.99 },
  { id: 5, date: '2025-01-12', desc: 'Uber to Airport', cat: 'Transport', type: 'expense', amount: 34.50 },
  { id: 6, date: '2025-01-15', desc: 'Freelance Project A', cat: 'Freelance', type: 'income', amount: 900 },
  { id: 7, date: '2025-01-18', desc: 'Doctor Visit', cat: 'Healthcare', type: 'expense', amount: 120 },
  { id: 8, date: '2025-01-20', desc: 'Amazon Shopping', cat: 'Shopping', type: 'expense', amount: 210 },
  { id: 9, date: '2025-01-22', desc: 'Electric Bill', cat: 'Utilities', type: 'expense', amount: 65 },
  { id: 10, date: '2025-01-25', desc: 'Online Course', cat: 'Education', type: 'expense', amount: 49 },
  { id: 11, date: '2025-02-03', desc: 'Monthly Salary', cat: 'Salary', type: 'income', amount: 4500 },
  { id: 12, date: '2025-02-05', desc: 'Apartment Rent', cat: 'Housing', type: 'expense', amount: 1200 },
  { id: 13, date: '2025-02-08', desc: 'Dinner Out', cat: 'Food', type: 'expense', amount: 62 },
  { id: 14, date: '2025-02-10', desc: 'Stock Dividend', cat: 'Investment', type: 'income', amount: 320 },
  { id: 15, date: '2025-02-12', desc: 'Gym Membership', cat: 'Healthcare', type: 'expense', amount: 40 },
  { id: 16, date: '2025-02-15', desc: 'Freelance Project B', cat: 'Freelance', type: 'income', amount: 1200 },
  { id: 17, date: '2025-02-18', desc: 'New Laptop', cat: 'Shopping', type: 'expense', amount: 850 },
  { id: 18, date: '2025-02-20', desc: 'Metro Card', cat: 'Transport', type: 'expense', amount: 30 },
  { id: 19, date: '2025-02-22', desc: 'Water Bill', cat: 'Utilities', type: 'expense', amount: 28 },
  { id: 20, date: '2025-02-25', desc: 'Coffee & Snacks', cat: 'Food', type: 'expense', amount: 45 },
  { id: 21, date: '2025-03-03', desc: 'Monthly Salary', cat: 'Salary', type: 'income', amount: 4800 },
  { id: 22, date: '2025-03-05', desc: 'Apartment Rent', cat: 'Housing', type: 'expense', amount: 1200 },
  { id: 23, date: '2025-03-07', desc: 'Groceries', cat: 'Food', type: 'expense', amount: 95 },
  { id: 24, date: '2025-03-10', desc: 'Spotify', cat: 'Entertainment', type: 'expense', amount: 9.99 },
  { id: 25, date: '2025-03-12', desc: 'Bus Pass', cat: 'Transport', type: 'expense', amount: 35 },
  { id: 26, date: '2025-03-15', desc: 'Freelance Project C', cat: 'Freelance', type: 'income', amount: 750 },
  { id: 27, date: '2025-03-18', desc: 'Pharmacy', cat: 'Healthcare', type: 'expense', amount: 22 },
  { id: 28, date: '2025-03-20', desc: 'Clothes', cat: 'Shopping', type: 'expense', amount: 180 },
  { id: 29, date: '2025-03-22', desc: 'Internet Bill', cat: 'Utilities', type: 'expense', amount: 50 },
  { id: 30, date: '2025-03-25', desc: 'Online Course', cat: 'Education', type: 'expense', amount: 29 },
  { id: 31, date: '2025-03-28', desc: 'Side Project Revenue', cat: 'Freelance', type: 'income', amount: 500 },
  { id: 32, date: '2025-04-01', desc: 'Monthly Salary', cat: 'Salary', type: 'income', amount: 4800 },
];

export default SEED_DATA;

export const CAT_COLORS = [
  '#4ade80', '#22d3ee', '#f59e0b', '#818cf8', '#f87171',
  '#fb923c', '#a78bfa', '#34d399', '#60a5fa', '#e879f9',
  '#fbbf24', '#94a3b8',
];

export const CATEGORIES = [
  'Salary', 'Food', 'Transport', 'Housing', 'Entertainment',
  'Healthcare', 'Shopping', 'Education', 'Utilities', 'Freelance',
  'Investment', 'Other',
];
