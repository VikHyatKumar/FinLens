require('dotenv').config();
const mongoose = require('mongoose');
const Transaction = require('./src/models/Transaction');

const sampleData = [
  { date: '2025-01-03', description: 'Monthly Salary',      category: 'Salary',        type: 'income',  amount: 4500 },
  { date: '2025-01-05', description: 'Apartment Rent',      category: 'Housing',       type: 'expense', amount: 1200 },
  { date: '2025-01-07', description: 'Grocery Run',         category: 'Food',          type: 'expense', amount: 87.50 },
  { date: '2025-01-10', description: 'Netflix Subscription',category: 'Entertainment', type: 'expense', amount: 15.99 },
  { date: '2025-01-12', description: 'Uber to Airport',     category: 'Transport',     type: 'expense', amount: 34.50 },
  { date: '2025-01-15', description: 'Freelance Project A', category: 'Freelance',     type: 'income',  amount: 900 },
  { date: '2025-01-18', description: 'Doctor Visit',        category: 'Healthcare',    type: 'expense', amount: 120 },
  { date: '2025-01-20', description: 'Amazon Shopping',     category: 'Shopping',      type: 'expense', amount: 210 },
  { date: '2025-01-22', description: 'Electric Bill',       category: 'Utilities',     type: 'expense', amount: 65 },
  { date: '2025-01-25', description: 'Online Course',       category: 'Education',     type: 'expense', amount: 49 },
  { date: '2025-02-03', description: 'Monthly Salary',      category: 'Salary',        type: 'income',  amount: 4500 },
  { date: '2025-02-05', description: 'Apartment Rent',      category: 'Housing',       type: 'expense', amount: 1200 },
  { date: '2025-02-08', description: 'Dinner Out',          category: 'Food',          type: 'expense', amount: 62 },
  { date: '2025-02-10', description: 'Stock Dividend',      category: 'Investment',    type: 'income',  amount: 320 },
  { date: '2025-02-12', description: 'Gym Membership',      category: 'Healthcare',    type: 'expense', amount: 40 },
  { date: '2025-02-15', description: 'Freelance Project B', category: 'Freelance',     type: 'income',  amount: 1200 },
  { date: '2025-02-18', description: 'New Laptop',          category: 'Shopping',      type: 'expense', amount: 850 },
  { date: '2025-02-20', description: 'Metro Card',          category: 'Transport',     type: 'expense', amount: 30 },
  { date: '2025-02-22', description: 'Water Bill',          category: 'Utilities',     type: 'expense', amount: 28 },
  { date: '2025-02-25', description: 'Coffee & Snacks',     category: 'Food',          type: 'expense', amount: 45 },
  { date: '2025-03-03', description: 'Monthly Salary',      category: 'Salary',        type: 'income',  amount: 4800 },
  { date: '2025-03-05', description: 'Apartment Rent',      category: 'Housing',       type: 'expense', amount: 1200 },
  { date: '2025-03-07', description: 'Groceries',           category: 'Food',          type: 'expense', amount: 95 },
  { date: '2025-03-10', description: 'Spotify',             category: 'Entertainment', type: 'expense', amount: 9.99 },
  { date: '2025-03-12', description: 'Bus Pass',            category: 'Transport',     type: 'expense', amount: 35 },
  { date: '2025-03-15', description: 'Freelance Project C', category: 'Freelance',     type: 'income',  amount: 750 },
  { date: '2025-03-18', description: 'Pharmacy',            category: 'Healthcare',    type: 'expense', amount: 22 },
  { date: '2025-03-20', description: 'Clothes',             category: 'Shopping',      type: 'expense', amount: 180 },
  { date: '2025-03-22', description: 'Internet Bill',       category: 'Utilities',     type: 'expense', amount: 50 },
  { date: '2025-03-25', description: 'Online Course',       category: 'Education',     type: 'expense', amount: 29 },
  { date: '2025-03-28', description: 'Side Project Revenue',category: 'Freelance',     type: 'income',  amount: 500 },
  { date: '2025-04-01', description: 'Monthly Salary',      category: 'Salary',        type: 'income',  amount: 4800 },
];

const seed = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  await Transaction.deleteMany({});
  await Transaction.insertMany(sampleData);
  console.log(`Seeded ${sampleData.length} transactions`);
  await mongoose.disconnect();
};

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
