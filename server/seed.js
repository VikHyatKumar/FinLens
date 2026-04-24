require('dotenv').config();
const mongoose = require('mongoose');
const Transaction = require('./src/models/Transaction');

const sampleData = [
  // Income
  { amount: 5000, type: 'income', category: 'Salary', date: '2024-01-05', description: 'Monthly salary' },
  { amount: 800,  type: 'income', category: 'Freelance', date: '2024-01-18', description: 'Web design project' },
  { amount: 5000, type: 'income', category: 'Salary', date: '2024-02-05', description: 'Monthly salary' },
  { amount: 300,  type: 'income', category: 'Investments', date: '2024-02-20', description: 'Dividend payout' },
  { amount: 5000, type: 'income', category: 'Salary', date: '2024-03-05', description: 'Monthly salary' },
  { amount: 1200, type: 'income', category: 'Freelance', date: '2024-03-15', description: 'Mobile app project' },
  { amount: 5000, type: 'income', category: 'Salary', date: '2024-04-05', description: 'Monthly salary' },

  // Expenses
  { amount: 1200, type: 'expense', category: 'Rent', date: '2024-01-01', description: 'Monthly rent' },
  { amount: 250,  type: 'expense', category: 'Groceries', date: '2024-01-10', description: 'Weekly grocery run' },
  { amount: 80,   type: 'expense', category: 'Utilities', date: '2024-01-15', description: 'Electricity bill' },
  { amount: 60,   type: 'expense', category: 'Entertainment', date: '2024-01-22', description: 'Streaming subscriptions' },
  { amount: 1200, type: 'expense', category: 'Rent', date: '2024-02-01', description: 'Monthly rent' },
  { amount: 220,  type: 'expense', category: 'Groceries', date: '2024-02-09', description: 'Weekly grocery run' },
  { amount: 350,  type: 'expense', category: 'Travel', date: '2024-02-14', description: 'Weekend trip' },
  { amount: 95,   type: 'expense', category: 'Utilities', date: '2024-02-16', description: 'Internet + electricity' },
  { amount: 1200, type: 'expense', category: 'Rent', date: '2024-03-01', description: 'Monthly rent' },
  { amount: 270,  type: 'expense', category: 'Groceries', date: '2024-03-08', description: 'Weekly grocery run' },
  { amount: 150,  type: 'expense', category: 'Healthcare', date: '2024-03-20', description: 'Doctor visit' },
  { amount: 200,  type: 'expense', category: 'Entertainment', date: '2024-03-25', description: 'Concerts & dining' },
  { amount: 1200, type: 'expense', category: 'Rent', date: '2024-04-01', description: 'Monthly rent' },
  { amount: 300,  type: 'expense', category: 'Groceries', date: '2024-04-07', description: 'Weekly grocery run' },
  { amount: 500,  type: 'expense', category: 'Travel', date: '2024-04-12', description: 'Flight tickets' },
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
