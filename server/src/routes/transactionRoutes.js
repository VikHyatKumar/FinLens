const express = require('express');
const {
  createTransaction,
  getTransactions,
  getSummary,
  getInsights,
} = require('../controllers/transactionController');

const router = express.Router();

router.post('/transactions', createTransaction);
router.get('/transactions', getTransactions);
router.get('/summary', getSummary);
router.get('/insights', getInsights);

module.exports = router;
