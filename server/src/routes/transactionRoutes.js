const express = require('express');
const {
  createTransaction,
  getTransactions,
  updateTransaction,
  deleteTransaction,
  getSummary,
  getInsights,
} = require('../controllers/transactionController');

const router = express.Router();

router.post('/transactions', createTransaction);
router.get('/transactions', getTransactions);
router.put('/transactions/:id', updateTransaction);
router.delete('/transactions/:id', deleteTransaction);
router.get('/summary', getSummary);
router.get('/insights', getInsights);

module.exports = router;
