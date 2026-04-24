const Transaction = require('../models/Transaction');

// POST /transactions
const createTransaction = async (req, res, next) => {
  try {
    const transaction = await Transaction.create(req.body);
    res.status(201).json({ success: true, data: transaction });
  } catch (err) {
    next(err);
  }
};

// GET /transactions
const getTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.find().sort({ date: -1 });
    res.json({ success: true, count: transactions.length, data: transactions });
  } catch (err) {
    next(err);
  }
};

// PUT /transactions/:id
const updateTransaction = async (req, res, next) => {
  try {
    const transaction = await Transaction.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!transaction) return res.status(404).json({ success: false, error: 'Transaction not found' });
    res.json({ success: true, data: transaction });
  } catch (err) {
    next(err);
  }
};

// DELETE /transactions/:id
const deleteTransaction = async (req, res, next) => {
  try {
    const transaction = await Transaction.findByIdAndDelete(req.params.id);
    if (!transaction) return res.status(404).json({ success: false, error: 'Transaction not found' });
    res.json({ success: true, data: {} });
  } catch (err) {
    next(err);
  }
};

// GET /summary
const getSummary = async (req, res, next) => {
  try {
    const result = await Transaction.aggregate([
      { $group: { _id: '$type', total: { $sum: '$amount' } } },
    ]);

    const totals = { income: 0, expense: 0 };
    result.forEach(({ _id, total }) => { totals[_id] = total; });

    res.json({
      success: true,
      data: {
        totalIncome: totals.income,
        totalExpenses: totals.expense,
        netBalance: totals.income - totals.expense,
      },
    });
  } catch (err) {
    next(err);
  }
};

// GET /insights
const getInsights = async (req, res, next) => {
  try {
    const [categoryBreakdown, monthlyTrend] = await Promise.all([
      Transaction.aggregate([
        { $match: { type: 'expense' } },
        { $group: { _id: '$category', total: { $sum: '$amount' }, count: { $sum: 1 } } },
        { $sort: { total: -1 } },
        { $project: { _id: 0, category: '$_id', total: 1, count: 1 } },
      ]),
      Transaction.aggregate([
        {
          $group: {
            _id: { year: { $year: '$date' }, month: { $month: '$date' }, type: '$type' },
            total: { $sum: '$amount' },
          },
        },
        { $sort: { '_id.year': 1, '_id.month': 1 } },
        {
          $group: {
            _id: { year: '$_id.year', month: '$_id.month' },
            breakdown: { $push: { type: '$_id.type', total: '$total' } },
          },
        },
        { $sort: { '_id.year': 1, '_id.month': 1 } },
        { $project: { _id: 0, year: '$_id.year', month: '$_id.month', breakdown: 1 } },
      ]),
    ]);

    const trend = monthlyTrend.map(({ year, month, breakdown }) => {
      const entry = { year, month, income: 0, expense: 0 };
      breakdown.forEach(({ type, total }) => { entry[type] = total; });
      return entry;
    });

    res.json({ success: true, data: { categoryBreakdown, monthlyTrend: trend } });
  } catch (err) {
    next(err);
  }
};

module.exports = { createTransaction, getTransactions, updateTransaction, deleteTransaction, getSummary, getInsights };
